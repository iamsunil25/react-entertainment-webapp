import React from "react"
const BASEURL = process.env.REACT_APP_API_BASEURL;
const APIKEY=process.env.REACT_APP_API_KEY
const TRENDINGAPIURL= `/trending/all/day?api_key=${APIKEY}`;
 


export const getAllTrendingMovies =async (page:number)=>{
	const res = await fetch(BASEURL + TRENDINGAPIURL + `&page=` + page);
	const data  = await res.json();
	return  data;
} 
// movie by details const 
  

export const getMovieDetailsById =async (id:any)=>{
	const res = await fetch(BASEURL + `/movie/${id}?api_key=${APIKEY}` + `&language=en-US`);
	const data  = await res.json();
	return  data;
}