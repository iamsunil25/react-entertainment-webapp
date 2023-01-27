import moment from 'moment';
import React from 'react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetailsById, getTvSeriesDetailsById } from '../../ApiIntegration/TheMoviesDbAPi';
import  {MoviesApiResponse}  from '../../utility/ApiResponseInterface';
import NoDataFoundImg from '../../images/noDataFound.png'
import { secondsToHms } from '../../utility/RunTimeToMinutes';
import placeholderImage from "../../images/placeholderMovie.png";
import Loader from '../../utility/Loader';
import BackTo from '../../utility/BackTo';
import { useSearchParams } from 'react-router-dom';
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
	number_of_seasons:number
	number_of_episodes:number
	adult:boolean
	original_language:string
	genres:[]
	homepage:string
	overview:string
	success:boolean,
	status_message:string
	production_countries:[{name:string}]
  }
const TvSeriesDetails = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const tvSeriesId= searchParams.get("id");
  const page= searchParams.get('page');
	const posterImageBaseUrl = "https://image.tmdb.org/t/p/w1280";
		const  {data,isLoading}  = useQuery<MovieItem,Error>({ queryKey: ['getTvSeriesDetails', tvSeriesId], queryFn: ()=>getTvSeriesDetailsById(tvSeriesId)});
	  
		console.log("data details",data);
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
	<BackTo page={page} component ={"/tvseries"} />

	<img className='detailsImg' src={data?.poster_path ? posterImageBaseUrl+data?.poster_path :placeholderImage}  alt={data?.original_title || data?.title || data?.name || data?.original_name  || "movie"} />


	  <div className='marginTop'  >
	<span className='text-teal-600 font-bold'>Title :<span className='font-semibold text-gray-900'> {data?.original_title || data?.title || data?.name || data?.original_name  || "-"}</span></span><br/>
	<span className='text-teal-600 font-bold'>Tagline : <span className='font-semibold text-gray-900'>{data?.tagline  || "-"}</span> </span> <br/>
	<span className='text-teal-600 font-bold'>Total Seasons : <span className='font-semibold text-gray-900'>{data?.number_of_seasons|| "-"}</span></span><br/>
	<span className='text-teal-600 font-bold'>Total Episoded : <span className='font-semibold text-gray-900'>{data?.number_of_episodes|| "-"}</span></span><br/>
	<span className='text-teal-600 font-bold'>Adult : <span className='font-semibold text-gray-900'>{data?.adult ? 'Yes':'No'} </span></span> <br/>
	<span className='text-teal-600 font-bold'>Original Language : <span className='font-semibold text-gray-900'>{data?.original_language?.toUpperCase()  || "-"}</span> </span> <br/>
	<span className='text-teal-600 font-bold'>Release Date : <span className='font-semibold text-gray-900'>{moment(data?.release_date).format('DD-MM-YYYY')  || "-"}</span> </span> <br/>

	<span className='text-teal-600 font-bold'>
		Genres : <span className='font-semibold text-gray-900'>
				{data?.genres.map((item:any,index:number)=><span key={item?.id}>
					{item?.name}{index!==data.genres.length-1 ? ", ":null}</span>
					)}
					</span></span> <br/>
					<span className='text-teal-600 font-bold'>Movie budget : <span className='font-semibold text-gray-900'> {data?.budget  ? "$" + data.budget: "-"}</span> </span> <br/>
	 {data?.homepage && 
	 <>
	 <span className='text-teal-600 font-bold'>Home Page :<span className='font-semibold text-gray-900'> <a href={data?.homepage } target="_blank">{data?.original_title || data?.title || data?.name || data?.original_name}</a></span> </span> <br/>
	 </>}
	 <span className='text-teal-600 font-bold'>Overview : <span className='font-semibold text-gray-900'>{data?.overview  || "-"}</span> </span> <br/>
	 <span className='text-teal-600 font-bold'>Production Country : <span className='font-semibold text-gray-900'> {data?.production_countries[0]?.name  || "-"} </span></span> <br/>
	 	  </div>
	
	</>

	
	  )
	}

export default TvSeriesDetails