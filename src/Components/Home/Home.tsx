import React,{useEffect, useState} from 'react'
import { useQuery } from 'react-query'
import { getAllTrendingMovies } from '../../ApiIntegration/TheMoviesDbAPi'
import moment from 'moment';
import Paginate from '../../utility/Paginate';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoviesApiResponse } from '../../utility/ApiResponseInterface';
import 'react-loading-skeleton/dist/skeleton.css'
import Loader from '../../utility/Loader';
import placeholderImage from "../../images/movie_placeholder.png";

   type MovieItem ={
	imdbID:string,
	Year:string,
	Title:string
	Poster:string
  }
export const Home = () => {
	const location = useLocation();
	const [page, setpage] = useState(location?.state?.page || 1);

	const navigate = useNavigate();
	const  {data,isLoading}  = useQuery<MoviesApiResponse, Error>({ queryKey: ['trendingMoviesList',page], queryFn:()=> getAllTrendingMovies(page) });;


	useEffect(() => {
  window.history.replaceState({}, document.title);
//   console.log(" movies useeffect history", window.history);
  
  return () => {}
}, [])


  return (
<>

<Paginate page={page} setPage={setpage}  />

<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} >
{
 isLoading ? 
<Loader/>
:

data?.Search.map((item:MovieItem)=>(

<div style={{width:'220px', maxHeight:'290px',opacity:'.9', cursor:'pointer'}} key={item.imdbID} className="hoverMovieCard bg-common-background w-full m-2 rounded-lg shadow-md dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700" >
	<div onClick={
		()=>navigate(
	{pathname:'/movies/details', 
	search:`?page=${page}&id=${item?.imdbID}`}
	)
	}>
      <div style={{display:"flex",justifyContent:"center"}} >

	    <img className="m-2 movieCard"  src={item?.Poster!=="N/A" ? item?.Poster:placeholderImage  } alt={item?.Title ?? "N/A"} />
		</div>

         <div className="px-5 pb-1">
            <p className="font-semibold tracking-tight text-gray-900  readMore" style={{wordBreak:'break-word',color:'rgb(22 83 175)'}}>{item?.Title ?? "N/A"}</p>
            <span className="font-semibold text-gray-900 " style={{color:'dimgray'}}>{item.Year}</span>
	</div>

	</div>

	
</div>

))
}





</div>	
</>
  )
}
