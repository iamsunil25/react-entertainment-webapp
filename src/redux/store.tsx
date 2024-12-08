import { configureStore } from '@reduxjs/toolkit';
import favouriteMovies from './favouriteMovies';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use local storage for persistence
import { combineReducers } from 'redux';

// Combine all reducers
const rootReducer = combineReducers({
  favouriteMovies,
});

// Persist configuration
const persistConfig = {
  key: 'root', // Key for localStorage
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Export the store and persistor
export const persistor = persistStore(store);
export default store;
