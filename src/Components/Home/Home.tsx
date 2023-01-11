import React,{useState} from 'react'
import { useQuery } from 'react-query'
import { getAllTrendingMovies } from '../../ApiIntegration/TheMoviesDbAPi'
import NavbarComponent from '../Navbar/NavbarComponent';
import PlaceholderImage from '../../images/placeholderimgae.jpg';
import moment from 'moment';
import Paginate from '../../utility/Paginate';
import { useNavigate } from 'react-router-dom';
import { MoviesApiResponse } from '../../utility/ApiResponseInterface';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
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
	const [page, setpage] = useState(1)
	const navigate = useNavigate()
	const posterImageBaseUrl = "https://image.tmdb.org/t/p/w1280";
	const  {data, isError,isLoading}  = useQuery<MoviesApiResponse, Error>({ queryKey: ['trendingMoviesList',page], queryFn:()=> getAllTrendingMovies(page) });
	console.log("data",data);

  return (
<>

<Paginate page={page} setPage={setpage}  />

<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} >
{
 isLoading ? <div style={{display:"flex",justifyContent:"center"}}>
 ...loading
</div>:

data?.results.map((item:MovieItem)=>(

<div style={{width:'220px', height:'265px',opacity:'.9', cursor:'pointer'}} key={item.id} className="hoverMovieCard w-full m-2 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" onClick={()=>navigate('/movies/'+ item?.id)}>
	
      <div style={{display:"flex",justifyContent:"center"}} >

	    <img className="m-1 movieCard"  src={posterImageBaseUrl+item?.poster_path } alt={item?.original_title || item?.title || "movie"} />
		</div>

         <div className="px-5 pb-5">
            <p className="font-semibold tracking-tight text-gray-900 dark:text-white" style={{color:'rgb(22 83 175)'}}>{item?.original_title || item?.title || item?.name || item?.original_name  || "-"}</p>
            <span className="font-semibold text-gray-900 dark:text-white" style={{color:'dimgray'}}>{moment(item.release_date).format('DD-MM-YYYY')}</span>
	</div>
</div>

))
}





</div>	
</>
  )
}
