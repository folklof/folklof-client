import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, SelectChangeEvent } from "@mui/material";
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setCategories(await fetchCategories());
        setAgeGroups(await fetchAgeGroups());
      } catch (error) {
        console.error("Failed to initialize data:", error);
      } finally {
        setIsLoading(false);
        if (onLoaded) {
          onLoaded();
        }
      }
    };

    initializeData();
  }, [onLoaded]);

  const effectiveSearchQuery = searchQuery || '';

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isFetchingInitialData,
    hasNextPage
  } = useInfiniteQuery<BooksResponse, Error, BooksResponse, QueryKey>(
    ["books", sort, selectedCategory, selectedAgeGroup, effectiveSearchQuery],
    async ({ pageParam = 1 }) => {
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

  const hasBooks = data && data.pages.length > 0 && data.pages.some(page => page.data.length > 0);

  const shouldRenderNoBooksMessage = !isFetchingInitialData && !isFetchingNextPage && !hasBooks;

  const renderNoBooksMessage = () => (
    <Box className={styles.noBooksContainer}>
      <Typography variant="h5" className={styles.noBooksText}>
        No Books Found.
      </Typography>
      <Typography variant="body1" sx={{color: "white"}}>
        We couldn't find any books matching your criteria. <br/> Try adjusting your filters, or browse our broader collection to discover more.
      </Typography>
    </Box>
  );

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
        {isLoading || isFetchingInitialData ? (
          <Typography variant="body1">Loading books...</Typography>
        ) : hasBooks ? (
          <>
            <BookList
              books={data.pages.flatMap(page => page.data as BookAttributes[])}
              sort={sort}
              handleSortChange={handleSortChange}
            />
            {hasNextPage && (
              <Box textAlign="left" my={2} padding={"6vh"}>
                <SecondaryButton
                  text="Load More"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                />
              </Box>
            )}
          </>
        ) : shouldRenderNoBooksMessage && renderNoBooksMessage()}
      </Grid>
    </Grid>
  );
};

export default AllBooks;
