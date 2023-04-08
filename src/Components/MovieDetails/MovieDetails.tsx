import moment from 'moment';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { getMovieDetailsById } from '../../ApiIntegration/TheMoviesDbAPi';
import  {MoviesApiResponse}  from '../../utility/ApiResponseInterface';
import NoDataFoundImg from '../../images/noDataFound.png'
import { secondsToHms } from '../../utility/RunTimeToMinutes';
import Loader from '../../utility/Loader';
import BackTo from '../../utility/BackTo';
import Heartfill from "../../images/heart-fill.svg";
import Heartempty from "../../images/heart-empty.svg"
import { dislike, like } from '../../redux/favouriteMovies';
import { useDispatch, useSelector } from 'react-redux';

type MovieItem ={
	id:number,
	release_date:string,
	original_title:string
	original_name:string
	name:string
	title:string
	poster_path:string
	revenue:string
	budget:string
	tagline:string
	runtime:string
	adult:boolean
	original_language:string
	genres:[]
	homepage:string
	overview:string
	success:boolean,
	status_message:string
	production_countries:[{name:string}]
  }

  
const MovieDetails = () => {

const [searchParams, setSearchParams] = useSearchParams();
const movieId= searchParams.get("id");
const moviesData = useSelector((state:any)=>state?.favouriteMovies?.movies);
// console.log("moviesData",moviesData);
const isMovieAlreadyPresent = moviesData.find((item:any)=>item.id==movieId);

// const [isLiked, setIsLiked] = useState(false);
// console.log("🚀 ~ file: MovieDetails.tsx:45 ~ MovieDetails ~ isMovieAlreadyPresent:", isMovieAlreadyPresent)
const likeAndDislike = (item:any)=>{
	item = {...item,isMovie:true}
	if(!isMovieAlreadyPresent){
		dispatch(like(item))
	}
	else{
		dispatch(dislike(item))
	}
	// setIsLiked((prev)=>!prev);
}
const dispatch = useDispatch()
const page= searchParams.get('page');
const posterImageBaseUrl = "https://image.tmdb.org/t/p/w1280";
	const  {data,isLoading,error , isError}  = useQuery<MovieItem,Error>({ queryKey: ['getMovieDetails', movieId], queryFn: ()=>getMovieDetailsById(movieId)});
  
	if(isLoading){
		return (
			<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} >
<Loader/>
</div>
		)
	}
	if(data?.success===false){
return (
	<>
	<BackTo page={page} component ={"/movies"} />
	<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} >
<img  style={{width:'30%'}} src={NoDataFoundImg} alt="no data found image" className='m-2'/>
	

</div>
	
<h1 className='text-center' style={{fontSize:'larger'}}>{data?.status_message}
</h1>
</>
)
	}
	
	return (
<>
		<BackTo page={page} component ={"/movies"} />

<img className='detailsImg' src={posterImageBaseUrl + data?.poster_path}  alt={data?.original_title || data?.title || data?.name || data?.original_name  || "movie"}   />

<div className='marginTop' >
<span className='text-teal-600 font-bold'>Title :<span className='font-semibold text-gray-900'> {data?.original_title || data?.title || data?.name || data?.original_name  || "-"}</span></span><br/>
<span className='text-teal-600 font-bold'>Tagline : <span className='font-semibold text-gray-900'>{data?.tagline  || "-"}</span> </span> <br/>
<span className='text-teal-600 font-bold'>Run time : <span className='font-semibold text-gray-900'>{secondsToHms(data?.runtime)|| "-"}</span></span><br/>
<span className='text-teal-600 font-bold'>Adult : <span className='font-semibold text-gray-900'>{data?.adult ? 'Yes':'No'} </span></span> <br/>
<span className='text-teal-600 font-bold'>Original Language : <span className='font-semibold text-gray-900'>{data?.original_language?.toUpperCase()  || "-"}</span> </span> <br/>
<span className='text-teal-600 font-bold'>Release Date : <span className='font-semibold text-gray-900'>{moment(data?.release_date).format('DD-MM-YYYY')  || "-"}</span> </span> <br/>
<span className='text-teal-600 font-bold'>Genres : <span className='font-semibold text-gray-900'>	{data?.genres.map((item:any,index:number)=><span key={item?.id}>{item?.name}{index!==data.genres.length-1 ? ", ":null}</span>)}</span>
 </span> <br/>
 <span className='text-teal-600 font-bold'>Movie budget : <span className='font-semibold text-gray-900'> {data?.budget  ? "$" + data.budget: "-"}</span> </span> <br/>
 {data?.homepage && 
 <>
 <span className='text-teal-600 font-bold'>Home Page :<span className='font-semibold text-gray-900'> <a className='hyperlink' href={data?.homepage } target="_blank">{data?.original_title || data?.title || data?.name || data?.original_name}</a></span> </span> <br/>
 </>}
 <span className='text-teal-600 font-bold'>Overview : <span className='font-semibold text-gray-900'>{data?.overview  || "-"}</span> </span> <br/>
 <span className='text-teal-600 font-bold'>Production Country : <span className='font-semibold text-gray-900'> {data?.production_countries[0]?.name  || "-"} </span></span> <br/>
 <span className='text-teal-600 font-bold'>Revenue : <span className='font-semibold text-gray-900'> {data?.revenue ? "$"+ data.revenue: "-"} </span></span> <br/>
  	<img style={{cursor:'pointer'}} width={30} height={30} src={isMovieAlreadyPresent  ? Heartempty:Heartfill} alt={!isMovieAlreadyPresent? "Heart empty icon": "Heart filled icon"} onClick={()=>likeAndDislike(data)}/>

 </div>


  
{/* </div> */}
</>


  )
}

export default MovieDetails


