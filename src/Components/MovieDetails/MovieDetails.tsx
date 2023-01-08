import moment from 'moment';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getMovieDetailsById } from '../../ApiIntegration/TheMoviesDbAPi';
import  {MoviesApiResponse}  from '../../utility/ApiResponseInterface';
import NoDataFoundImg from '../../images/noDataFound.png'
import { secondsToHms } from '../../utility/RunTimeToMinutes';

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
const {movieId} = useParams();
const posterImageBaseUrl = "https://image.tmdb.org/t/p/w1280";
	const  {data,isLoading,error , isError}  = useQuery<MovieItem,Error>({ queryKey: ['getMovieDetails', movieId], queryFn: ()=>getMovieDetailsById(movieId)});
  
	console.log("data details",data);
	if(isLoading){
		return <h1 className='text-center'>...loading</h1>
	}
	if(data?.success===false){
return (
	<>
	<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} >
<img  style={{width:'30%'}} src={NoDataFoundImg} alt="no data found image" className='m-2'/>
	

</div>
	
<h1 className='text-center' style={{fontSize:'larger'}}>{data?.status_message}
</h1>
</>
)
	}
	
	return (
	<div>
		<div className="grid  grid-flow-col gap-4">
  <div className="row-span-6">

<img src={posterImageBaseUrl + data?.poster_path}  alt="movie" style={{aspectRatio:'6/5'}} />


  </div>
  <div className="row-span-6 m-1">
<span>Title : {data?.original_title || data?.title || data?.name || data?.original_name  || "-"}</span><br/>
<span>Tagline : {data?.tagline  || "-"} </span> <br/>
<span>Run time : {secondsToHms(data?.runtime)|| "-"}</span><br/>
<span>Adult : {data?.adult ? 'Yes':'No'} </span> <br/>
<span>Original Language : {data?.original_language?.toUpperCase()  || "-"} </span> <br/>
<span>Release Date : {moment(data?.release_date).format('DD-MM-YYYY')  || "-"} </span> <br/>
<span>Genres :	{data?.genres.map((item:any,index:number)=><span key={item?.id}>{item?.name}{index!==data.genres.length-1 ? ", ":null}</span>)}
 </span> <br/>
 <span>Movie budget : {data?.budget  || "-"} </span> <br/>
 {data?.homepage && 
 <>
 <span>Home Page : <a href={data?.homepage } target="_blank">{data?.original_title || data?.title || data?.name || data?.original_name}</a> </span> <br/>
 </>}
 <span>Overview : {data?.overview  || "-"} </span> <br/>
 <span>Production Country : {data?.production_countries[0]?.name  || "-"} </span> <br/>
 <span>Revenue : {data?.revenue  || "-"} </span> <br/>
  </div>
</div>


	</div>
  )
}

export default MovieDetails


