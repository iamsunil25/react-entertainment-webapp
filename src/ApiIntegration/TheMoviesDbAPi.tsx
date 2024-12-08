const MOVIEAPIBASEURL = process.env.REACT_APP_API_MOVIE_BASEURL;
const YOUTUBEVIDEOSBASEURL=process.env.REACT_APP_API_YOUTUBE_BASEURL
const YPUTUBEVIDEOAPIKEY= process.env.REACT_APP_YOUTUBE_API_KEY
const MOVIEAPIKEY=process.env.REACT_APP_MOVIE_API_KEY
//get all  movies
export const getAllTrendingMovies =async (page:number)=>{
	try {
	const response = await fetch(`${MOVIEAPIBASEURL}/?apikey=${MOVIEAPIKEY}&s=sex&page=${page}`)
	const result = await response.json();
	console.log("result_getAllTrendingMovies",result);
	return result
	} catch (error) {
		console.error(error);
	}
}


//get movie details by id
export const getMovieDetailsById =async (id:any)=>{
	const res = await fetch(`${MOVIEAPIBASEURL}/?apikey=${MOVIEAPIKEY}&i=${id}`)
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


//get all tv series 
// export const getAlltvSeries =async (page:number)=>{
// 	const res = await fetch("" + `&page=` + page);
// 	const data  = await res.json();
// 	return  data;
// } 


//get tv series details by id
// export const getTvSeriesDetailsById =async (id:any)=>{
// 	const res = await fetch("" + `/tv/${id}?api_key="` + `&language=en-US`);
// 	const data  = await res.json();
// 	return  data;
// }



