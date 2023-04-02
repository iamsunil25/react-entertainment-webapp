import { configureStore } from '@reduxjs/toolkit';
import favouriteMovies from './favouriteMovies';

export default configureStore({
  reducer: {
    favouriteMovies: favouriteMovies,
  },
});
