import React, { useState, useEffect } from "react";
import { Grid, Box, SelectChangeEvent, Skeleton } from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { SideBar, BookList, SecondaryButton } from "../../components";
import {
  fetchBooks,
  QueryKey,
  BooksResponse,
  fetchCategories,
  fetchAgeGroups,
} from "../../api/bookAPI";
import { BookAttributes, ICategory, IAgeGroup } from "../../types";
import styles from "./AllBooks.module.scss";

const AllBooks: React.FC = () => {
  const [sort, setSort] = useState<string>("2"); // '2' for 'latest'
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [ageGroups, setAgeGroups] = useState<IAgeGroup[]>([]);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        const fetchedAgeGroups = await fetchAgeGroups();
        setAgeGroups(fetchedAgeGroups);
      } catch (error) {
        console.error("Failed to initialize data:", error);
      }
    };

    initializeData();
  }, []);

  const { data, isLoading, isError, error, fetchNextPage } = useInfiniteQuery<
    BooksResponse,
    Error,
    BooksResponse,
    QueryKey
  >(
    ["books", sort, selectedCategory, selectedAgeGroup],
    ({ pageParam = 1 }) =>
      fetchBooks({
        pageParam,
        queryKey: ["books", sort, selectedCategory, selectedAgeGroup],
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.error) return undefined;
        return allPages.length + 1;
      },
    }
  );

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value as string);
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
              <Skeleton
                variant="rectangular"
                height={118}
                animation="wave"
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Skeleton
                variant="text"
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
              <Skeleton
                variant="text"
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              />
            </Box>
          ))}
        </Box>
        
        ) : isError ? (
          <Box>
            Error:{" "}
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </Box>
        ) : (
          <>
            <BookList
              books={
                data?.pages.flatMap((page) => page.data as BookAttributes[]) ??
                []
              }
              sort={sort}
              handleSortChange={handleSortChange}
              isLoading={isLoading}
            />
            <Box textAlign="center" my={2}>
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
