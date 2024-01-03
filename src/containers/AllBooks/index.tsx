import React, { useState, useEffect } from "react";
import { Grid, Box, SelectChangeEvent, Typography } from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { SideBar, BookList, SecondaryButton } from "../../components";
import {
  fetchBooks,
  BooksResponse,
  QueryKey,
  fetchCategories,
  fetchAgeGroups,
} from "../../api/book/bookAPI";
import { BookAttributes, ICategory, IAgeGroup } from "../../types";
import styles from "./AllBooks.module.scss";

const AllBooks: React.FC<{ searchQuery: string | null, onLoaded: () => void }> = ({ searchQuery, onLoaded }) => {
  const [sort, setSort] = useState<string>("2");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [ageGroups, setAgeGroups] = useState<IAgeGroup[]>([]);


  useEffect(() => {
    const initializeData = async () => {
      try {
        setCategories(await fetchCategories());
        setAgeGroups(await fetchAgeGroups());
      } catch (error) {
        console.error("Failed to initialize data:", error);
      }
      onLoaded();
    };

    initializeData();
  }, [onLoaded]);

  const effectiveSearchQuery = searchQuery || '';

  const { data, isError, error, fetchNextPage } = useInfiniteQuery<
    BooksResponse,
    Error,
    BooksResponse,
    QueryKey
  >(
    ["books", sort, selectedCategory, selectedAgeGroup, effectiveSearchQuery],
    ({ pageParam = 1 }) => {
      // console.log("Fetching books with query:", effectiveSearchQuery);
      return fetchBooks({
        pageParam,
        queryKey: ["books", sort, selectedCategory, selectedAgeGroup, effectiveSearchQuery],
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.error) return undefined;
        return allPages.length + 1;
      },
    }
  );

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };

  return (
    <Grid container spacing={2} className={styles.booksContainer}>
    <Grid item xs={12} md={4} lg={3}>
      <SideBar
        onCategoryChange={setSelectedCategory}
        onAgeGroupChange={setSelectedAgeGroup}
        categories={categories}
        ageGroups={ageGroups}
        selectedCategory={selectedCategory}
        selectedAgeGroup={selectedAgeGroup}
      />
    </Grid>
    <Grid item xs={12} md={8} lg={9}>
      {isError ? (
        <Box className={styles.booksContainer}>
          <Typography variant="h6">
            Error: {error instanceof Error ? error.message : "Unknown error occurred"}
          </Typography>
        </Box>
      ) : (
        <>
          {categories.length <= 1 ? (
            <Box sx={{textAlign: "center", paddingTop:"10vh", paddingRight: "15vw"}}>
              <Typography sx={{color: "white", fontSize: 16, textAlign: "center"}}>No data available for book list.</Typography>
            </Box>
          ) : (
            <>
              <BookList
                books={data?.pages.flatMap((page) => page.data as BookAttributes[]) ?? []}
                sort={sort}
                handleSortChange={handleSortChange}
              />
              <Box textAlign="left" my={2} padding={"6vh"}>
                <SecondaryButton text="Load More" onClick={() => fetchNextPage()} />
              </Box>
            </>
          )}
        </>
      )}
    </Grid>
  </Grid>
  );
};

export default AllBooks;
