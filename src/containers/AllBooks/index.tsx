import React, { useState, useEffect } from "react";
import { Grid, Box, SelectChangeEvent } from "@mui/material";
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
  }, []);

  const effectiveSearchQuery = searchQuery || '';

  const { data, isLoading, isError, error, fetchNextPage } = useInfiniteQuery<
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
        {isLoading ? (
          <Box>
            {Array.from(new Array(3)).map((_, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                {/* <Skeleton
                  variant="rectangular"
                  height={118}
                  animation="wave"
                  sx={{ backgroundColor: '#f1f1f13d' }}
                />
                <Skeleton
                  variant="text"
                  sx={{ backgroundColor: '#f1f1f13d' }}
                />
                <Skeleton
                  variant="text"
                  sx={{ backgroundColor: '#f1f1f13d' }}
                /> */}
              </Box>
            ))}
          </Box>
        ) : isError ? (
          <Box>
            Error: {error instanceof Error ? error.message : "Unknown error occurred"}
          </Box>
        ) : (
          <>
            <BookList
              books={data?.pages.flatMap(page => page.data as BookAttributes[]) ?? []}
              sort={sort}
              handleSortChange={handleSortChange}
              isLoading={isLoading}
            />
            <Box textAlign="left" my={2} padding={"6vh"}>
              <SecondaryButton
                text="Load More"
                onClick={() => fetchNextPage()}
              />
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default AllBooks;
