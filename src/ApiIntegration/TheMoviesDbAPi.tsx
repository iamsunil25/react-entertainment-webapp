import React from "react"
const BASEURL = process.env.REACT_APP_API_BASEURL;
const APIKEY=process.env.REACT_APP_API_KEY
const TRENDINGAPIURL= BASEURL +`/trending/all/day?api_key=${APIKEY}`;
const TVSERIESAPIURL= BASEURL + `/discover/tv?api_key=${APIKEY}&language=en-us&sort_by=popularity.desc`
//get all trending movies
export const getAllTrendingMovies =async (page:number)=>{
	const res = await fetch(TRENDINGAPIURL + `&page=` + page);
	const data  = await res.json();
	return  data;
} 

  
//get movie details by id
export const getMovieDetailsById =async (id:any)=>{
	const res = await fetch(BASEURL + `/movie/${id}?api_key=${APIKEY}` + `&language=en-US`);
	const data  = await res.json();
	return  data;
}


//get all tv series 
export const getAlltvSeries =async (page:number)=>{
	const res = await fetch(TVSERIESAPIURL + `&page=` + page);
	const data  = await res.json();
	return  data;
} 


//get tv series details by id
export const getTvSeriesDetailsById =async (id:any)=>{
	const res = await fetch(BASEURL + `/tv/${id}?api_key=${APIKEY}` + `&language=en-US`);
	const data  = await res.json();
	return  data;
}