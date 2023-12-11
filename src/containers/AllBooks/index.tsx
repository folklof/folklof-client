import React from 'react';
import { Grid } from '@mui/material';
import {SideBar, BookList} from '../../components';
import styles from './AllBooks.module.scss';

const AllBooks: React.FC = () => {
  // If there's any shared state or functions between Sidebar and BookList, they should be declared here

  return (
    <Grid container spacing={2} className={styles.booksContainer}>
      <Grid item xs={12} md={4} lg={3}>
        <SideBar />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <BookList />
      </Grid>
    </Grid>
  );
};

export default AllBooks;
