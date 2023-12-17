import React, { useState, useEffect } from "react";
import { Grid, Box, SelectChangeEvent } from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { SideBar, BookList } from "../../components";
import {
  fetchBooks,
  BooksResponse,
  QueryKey,
  fetchCategories,
  fetchAgeGroups,
} from "../../api/book/bookAPI";
import { BookAttributes, ICategory, IAgeGroup } from "../../types";
import styles from "./SearchList.module.scss";

const SearchLists: React.FC<{ searchQuery: string | null }> = ({ searchQuery }) => {
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
    };

    initializeData();
  }, []);

//   useEffect(() => {
//     console.log("Current search query:", searchQuery);
//   }, [searchQuery]);

  const effectiveSearchQuery = searchQuery || '';

  const { data, isLoading, isError, error } = useInfiniteQuery<
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
      <Grid item xs={12} md={8} lg={9} marginBottom={15}>
        {isLoading ? (
          <Box>
            {Array.from(new Array(3)).map((_, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                {/* <Skeleton
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
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default SearchLists;
