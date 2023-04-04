import React,{useEffect, useState} from 'react'
import { useQuery } from 'react-query'
import { getAllTrendingMovies } from '../../ApiIntegration/TheMoviesDbAPi'
import moment from 'moment';
import Paginate from '../../utility/Paginate';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoviesApiResponse } from '../../utility/ApiResponseInterface';
import 'react-loading-skeleton/dist/skeleton.css'
import Loader from '../../utility/Loader';
import placeholderImage from "../../images/placeholderMovie.png";

   type MovieItem ={
	id:number,
	release_date:string,
	original_title:string
	original_name:string
	name:string
	title:string
	poster_path:string
  }
export const Home = () => {
	const location = useLocation();
	const [page, setpage] = useState(location?.state?.page || 1);

	const navigate = useNavigate();
	const posterImageBaseUrl = "https://image.tmdb.org/t/p/w1280";
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

data?.results.map((item:MovieItem)=>(

<div style={{width:'220px', maxHeight:'290px',opacity:'.9', cursor:'pointer'}} key={item.id} className="hoverMovieCard bg-common-background w-full m-2 rounded-lg shadow-md dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700" >
	<div onClick={()=>navigate(
	{pathname:'/movies/details', 
	search:`?page=${page}&id=${item?.id}`}
	)}>
      <div style={{display:"flex",justifyContent:"center"}} >

	    <img className="m-2 movieCard"  src={posterImageBaseUrl+item?.poster_path || placeholderImage } alt={item?.original_title || item?.title || item?.name || item?.original_name} />
		</div>

         <div className="px-5 pb-1">
            <p className="font-semibold tracking-tight text-gray-900  readMore" style={{wordBreak:'break-word',color:'rgb(22 83 175)'}}>{item?.original_title || item?.title || item?.name || item?.original_name  || "-"}</p>
            <span className="font-semibold text-gray-900 " style={{color:'dimgray'}}>{moment(item.release_date).format('DD-MM-YYYY')}</span>
	</div>

	</div>

	
</div>

))
}





</div>	
</>
  )
}
