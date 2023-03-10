import React from 'react';
import './App.css';
import NavbarComponent from './Components/Navbar/NavbarComponent';
import {Routes, Route } from "react-router-dom";
import NotFound from './Components/NotFound/NotFound';
import { Home } from './Components/Home/Home';
import { QueryClient,QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import MovieDetails from './Components/MovieDetails/MovieDetails';
import {TVSeries} from './Components/TvSeries/TvSeries';
import TvSeriesDetails from './Components/TvSeriesDetails/TvSeriesDetails';
import YTVideosList from './Components/Youtube-Videos/YTVideosList';
const queryClient = new QueryClient(
	{  defaultOptions: {
	    queries: {
	      refetchOnWindowFocus: false,
	    //   refetchOnmount: false,
	    //   refetchOnReconnect: false,
	    //   retry: 1,
	    //   staleTime: 5 * 1000,
	    }
	  }}
	  )

function App() {
	


  return (
	<QueryClientProvider client={queryClient}>
		<NavbarComponent/>
	<Routes>
	
	<Route path="/" element={<Home/>}/>
	  <Route path="/movies/details" element={<MovieDetails/>}/>
	  <Route path="/movies" element={<Home/>}/>
	  <Route path="/tvseries/details" element={<TvSeriesDetails/>}/>
	  <Route path="/tvseries" element={<TVSeries/>}/>
	  <Route path='/youtube' element={<YTVideosList/>}/>
		{/* <Route index element={<Home />} /> */}
		{/* <Route path="blogs" element={<Blogs />} />
		<Route path="contact" element={<Contact />} />
		<Route path="*" element={<NoPage />} /> */}
		<Route path='*' element={<NotFound/>}/>
	</Routes>
	<ReactQueryDevtools initialIsOpen ={false} position="bottom-right" />
	</QueryClientProvider>
  );
}

export default App;
