const BASEURL = process.env.REACT_APP_API_BASEURL;
const APIKEY=process.env.REACT_APP_API_KEY
const YPUTUBEVIDEOAPIKEY= process.env.REACT_APP_YOUTUBE_API_KEY
const TRENDINGAPIURL= BASEURL +`/trending/all/day?api_key=${APIKEY}`;
const TVSERIESAPIURL= BASEURL + `/discover/tv?api_key=${APIKEY}&language=en-us&sort_by=popularity.desc`
const YOUTUBEVIDEOSBASEURL= "https://www.googleapis.com/youtube/v3/videos"
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


// get all youtube videos
export const getAllYoutubeVideos= async(pageToken:string)=>{
let apiURL=YOUTUBEVIDEOSBASEURL + `?chart=mostPopular&key=${YPUTUBEVIDEOAPIKEY}&part=snippet&maxResults=20&regionCode=In`
if(pageToken){
	apiURL=apiURL+ `&pageToken=${pageToken}`
}
	const res= await fetch(apiURL);
	const data = await res.json();
	return data
}
