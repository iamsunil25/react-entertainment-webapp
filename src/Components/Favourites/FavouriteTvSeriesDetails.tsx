import moment from 'moment';
import React from 'react'
import { useLocation } from 'react-router-dom';
import placeholderImage from "../../images/placeholderMovie.png";
import BackTo from '../../utility/BackTo';

const FavouriteTvSeriesDetails = () => {
	const {state}= useLocation()
	const {tvSeriesDetails} = state || {};
	const data = tvSeriesDetails;
	const posterImageBaseUrl = "https://image.tmdb.org/t/p/w1280";

	// console.log("data",data);
		
		return (
			<>
 <BackTo  page={null} component ={"/favourites"} />

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
	 <span className='text-teal-600 font-bold'>Home Page :<span className='font-semibold text-gray-900'> <a className='hyperlink' href={data?.homepage } target="_blank">{data?.original_title || data?.title || data?.name || data?.original_name}</a></span> </span> <br/>
	 </>}
	 <span className='text-teal-600 font-bold'>Overview : <span className='font-semibold text-gray-900'>{data?.overview  || "-"}</span> </span> <br/>
	 <span className='text-teal-600 font-bold'>Production Country : <span className='font-semibold text-gray-900'> {data?.production_countries[0]?.name  || "-"} </span></span> <br/>
	 	  </div>
	
	</>

	
	  )
	}

export default FavouriteTvSeriesDetails