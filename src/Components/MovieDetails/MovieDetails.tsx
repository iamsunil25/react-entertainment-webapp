import moment from 'moment';
import React from 'react'
import { useQuery } from 'react-query';
import {  useSearchParams } from 'react-router-dom';
import { getMovieDetailsById } from '../../ApiIntegration/TheMoviesDbAPi';
// import  {MoviesApiResponse}  from '../../utility/ApiResponseInterface';
// import NoDataFoundImg from '../../images/noDataFound.png'
import { convertMinutesToHoursAndMinutes, secondsToHms } from '../../utility/RunTimeToMinutes';
import Loader from '../../utility/Loader';
import BackTo from '../../utility/BackTo';
import Heartfill from "../../images/heart-fill.svg";
import Heartempty from "../../images/heart-empty.svg"
import { dislike, like } from '../../redux/favouriteMovies';
import { useDispatch, useSelector } from 'react-redux';

type MovieItem ={
	imdbID:string,
	Awards:string,
	imdbRating:string,
	Released:string,
	Title:string
	Poster:string
	BoxOffice:string
	Runtime:string
	Language:string
	Genre:string,
	Plot:string,
	Country:string,
	Actors:string,
	Director:string,
	Writer:string,
  }

  
const MovieDetails = () => {

const [searchParams,setSearchParams ] = useSearchParams();
const movieId= searchParams.get("id");
const moviesData = useSelector((state:any)=>state?.favouriteMovies?.movies);
// console.log("moviesData",moviesData);
const isMovieAlreadyPresent = moviesData.find((item:any)=>item.imdbID===movieId);
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
	const  {data,isLoading,error , isError}  = useQuery<MovieItem,Error>({ queryKey: ['getMovieDetails', movieId], queryFn: ()=>getMovieDetailsById(movieId)});
  
	if(isLoading){
		return (
			<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} >
<Loader/>
</div>
		)
	}
// 	if(false==false){
// return (
// 	<>
// 	<BackTo page={page} component ={"/movies"} />
// 	<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} >
// <img  style={{width:'30%'}} src={NoDataFoundImg} alt="no data found image" className='m-2'/>
	

// </div>
	
// <h1 className='text-center' style={{fontSize:'larger'}}>niubiub
// </h1>
// </>
// )
// 	}
	
	return (
<>
		<BackTo page={page} component ={"/movies"} />

<img className='detailsImg' src={data?.Poster}  alt={data?.Title ?? "movie"}   />

<div className='marginTop' >
<span className='text-teal-600 font-bold'>Title:<span className='font-semibold text-gray-900'> { data?.Title ?? "N/A"}</span></span><br/>
<span className='text-teal-600 font-bold'>Actors: <span className='font-semibold text-gray-900'>{data?.Actors ?? "N/A" } </span></span> <br/>
<span className='text-teal-600 font-bold'>Run Time: <span className='font-semibold text-gray-900'>{data?.Runtime!=="N/A" ?  convertMinutesToHoursAndMinutes(data?.Runtime?.split(" ")[0]) : "N/A"}</span></span><br/>
<span className='text-teal-600 font-bold'>Language: <span className='font-semibold text-gray-900'>{data?.Language?.toUpperCase()  || "N/A"}</span> </span> <br/>
<span className='text-teal-600 font-bold'>Release Date: <span className='font-semibold text-gray-900'>{moment(data?.Released).format('DD-MM-YYYY')  || "N/A"}</span> </span> <br/>
<span className='text-teal-600 font-bold'>IMDB Rating: <span className='font-semibold text-gray-900'>{data?.imdbRating || "N/A"}</span> </span> <br/>
<span className='text-teal-600 font-bold'>Genres: <span className='font-semibold text-gray-900'><span >{data?.Genre ?? "N/A"}</span></span>
 </span> <br/>
 <span className='text-teal-600 font-bold'>Director: <span className='font-semibold text-gray-900'>{data?.Director || "N/A"}</span> </span> <br/>

<span className='text-teal-600 font-bold'>Writer: <span className='font-semibold text-gray-900'><span >{data?.Writer ?? "N/A"}</span></span>
</span> <br/>
 <span className='text-teal-600 font-bold'>Plot: <span className='font-semibold text-gray-900'> {data?.Plot ?? "N/A"}</span> </span> <br/>


  <span className='text-teal-600 font-bold'>Awards: <span className='font-semibold text-gray-900'>{data?.Awards  || "N/A"}</span> </span> <br/> 
 <span className='text-teal-600 font-bold'>BoxOffice Collection: <span className='font-semibold text-gray-900'> {data?.BoxOffice  ?? "N/A"} </span></span> <br/>
 <span className='text-teal-600 font-bold'>Country: <span className='font-semibold text-gray-900'> {data?.Country ?? "N/A"} </span></span> <br/>
  	<img style={{cursor:'pointer'}} width={30} height={30} src={isMovieAlreadyPresent  ? Heartempty:Heartfill} alt={!isMovieAlreadyPresent? "Heart empty icon": "Heart filled icon"} onClick={()=>likeAndDislike(data)}/>

 </div>


</>


  )
}

export default MovieDetails


