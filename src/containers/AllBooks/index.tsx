import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  Box,
  Typography,
  SelectChangeEvent,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useQuery } from "react-query";
import { SideBar, BookList, Pagination } from "../../components";
import {
  fetchBooks,
  BooksResponse,
  QueryKey,
  fetchCategories,
  fetchAgeGroups,
} from "../../api/book/bookAPI";
import { BookAttributes, ICategory, IAgeGroup } from "../../types";
import styles from "./AllBooks.module.scss";

const AllBooks: React.FC<{
  searchQuery: string | null;
  onLoaded: () => void;
}> = ({ searchQuery, onLoaded }) => {
  const [sort, setSort] = useState<string>("2");
  const [limit, setLimit] = useState<string>("5");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [ageGroups, setAgeGroups] = useState<IAgeGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);

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

  const effectiveSearchQuery = searchQuery || "";

  const fetchData = useCallback(
    async (page: number, limit: string) => {
      return fetchBooks({
        pageParam: page,
        limit: limit,
        queryKey: [
          "books",
          sort,
          selectedCategory,
          selectedAgeGroup,
          effectiveSearchQuery,
        ],
      });
    },
    [sort, selectedCategory, selectedAgeGroup, effectiveSearchQuery]
  );

  const {
    data,
    isLoading: isFetchingInitialData,
    refetch: refetchData,
  } = useQuery<BooksResponse, Error, BooksResponse, QueryKey>(
    ["books", sort, selectedCategory, selectedAgeGroup, effectiveSearchQuery],
    () => fetchData(page, limit),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (page > 0) {
      refetchData();
    }
    if (Number(limit) >= (data?.totalBook ?? 0)) {
      setPage(1);
    }
  }, [page, sort, limit, refetchData, data?.totalBook]);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSort(event.target.value);
  };

  const handleShowPerItem = (event: SelectChangeEvent<string>) => {
    setLimit(event.target.value);
    setPage(1)
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const hasBooks = data && data.data.length > 0;

  const shouldRenderNoBooksMessage = !isFetchingInitialData && !hasBooks;

  const renderNoBooksMessage = () => (
    <Box className={styles.noBooksContainer}>
      <Typography variant="h5" className={styles.noBooksText}>
        No Books Found.
      </Typography>
      <Typography variant="body1" sx={{ color: "white" }}>
        We couldn't find any books matching your criteria. <br /> Try adjusting
        your filters, or browse our broader collection to discover more.
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
        <Box className={styles.sortingContainer}>
          <Select
            value={sort}
            onChange={handleSortChange}
            displayEmpty
            className={styles.sortSelect}
            sx={{ borderRadius: "50px", bgcolor: "#F5F5F5" }}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="1">Oldest</MenuItem>
            <MenuItem value="2">Latest</MenuItem>
          </Select>
        </Box>
        {isLoading || isFetchingInitialData ? (
          <Box className={styles.noBooksContainer}>
            <Typography variant="h5" className={styles.noBooksText}>
              Please wait
            </Typography>
            <Typography variant="body1" sx={{ color: "white" }}>
              We are casting spell to find your books...
            </Typography>
          </Box>
        ) : hasBooks ? (
          <>
            <Box className={styles.bookPageContainer}>
              <BookList
                books={data.data as BookAttributes[]}
                sort={sort}
                handleSortChange={handleSortChange} />    
            </Box>                    
          </>
        ) : (
          shouldRenderNoBooksMessage && renderNoBooksMessage()
        )}
        {/* <Box sx={{display: "flex", width: "70vw", justifyContent: "center"}}> */}
        <Box className={styles.paginationWrapper}>
          <Box className={styles.paginationContainer}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Typography sx={{ color: "white" }}>Show</Typography>
              <FormControl sx={{ m: 1 }} size="small">
                <Select
                  value={limit}
                  onChange={handleShowPerItem}
                  className={styles.limitSelect}
                  sx={{ borderRadius: "5px" }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                </Select>
              </FormControl>
            </Box>
          <Box sx={{ width: "200px", alignSelf: "center"}}>
            <Pagination
              pageCount={
                Math.max(Math.ceil((data?.totalBook ?? 0) / Number(limit)), 1)
              }
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </Box>            
        </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AllBooks;
