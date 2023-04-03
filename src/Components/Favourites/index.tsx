import React, { useEffect } from 'react'
import moment from 'moment';

import {  useNavigate } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css'
import crossImage from "../../images/multiply.png";

import placeholderImage from "../../images/placeholderMovie.png";
import { useSelector, useDispatch } from 'react-redux';
import { dislike } from '../../redux/favouriteMovies';
const Index = () => {

	const dispatch = useDispatch()
	const moviesData = useSelector((state:any)=>state?.favouriteMovies?.movies)
	// console.log("🚀 ~ file: index.tsx:37 ~ Favourites ~ moviesData:", moviesData)
	const tvseriesData = useSelector((state:any)=>state.favouriteMovies.tvSeries) 
	// console.log("🚀 ~ file: index.tsx:35 ~ Favourites ~ tvseriesData:", tvseriesData)
	let allData = [...moviesData,...tvseriesData];
	const dislikeTvSeries = (item:any)=>{
			dispatch(dislike(item));
	}
	const dislikeMovie = (item:any)=>{
			dispatch(dislike(item));
	}
		const navigate = useNavigate();
		const posterImageBaseUrl = "https://image.tmdb.org/t/p/w1280";
	// console.log("allData",allData);
	
	
	
		useEffect(() => {
	  window.history.replaceState({}, document.title);
	//   console.log(" movies useeffect history", window.history);
	  
	  return () => {}
	}, [])
	
	if(allData.length===0){

		return(
			<div className='mt-5'>
				<h1 style={{fontWeight:'500',fontSize:'20px' }}>Currently there is no data in your favourite list.</h1>
			</div>
		) 
	}

	return (



		<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} className='mt-2' >
		
		
		{
		allData?.map((item:any)=>(
		item.isMovie ?
			<div style={{width:'220px', maxHeight:'290px',opacity:'.9', cursor:'pointer'}} key={item.id} className=" w-full m-2 rounded-lg shadow-md dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700" >
			<div onClick={()=>navigate(
			'/favourites/movies-details',
			{state:{
				movieDetails:item}}
			)}>
			  <div style={{display:"flex",justifyContent:"center"}} >
		
				<img className="m-2 movieCard"  src={posterImageBaseUrl+item?.poster_path || placeholderImage } alt={item?.original_title || item?.title || item?.name || item?.original_name} />
				</div>
		
				 <div className="px-5 pb-1">
					<p className="font-semibold tracking-tight text-gray-900  readMore" style={{wordBreak:'break-word',color:'rgb(22 83 175)'}}>{item?.original_title || item?.title || item?.name || item?.original_name  || "-"}</p>
					<span className="font-semibold text-gray-900 " style={{color:'dimgray'}}>{moment(item.release_date).format('DD-MM-YYYY')}</span>
			</div>
			

		
			</div>
			<div>
<img width={26} height={26}  style={{position: 'relative',bottom: '6px',  left: '182px' }} src={crossImage} alt="x icon" onClick={()=>dislikeMovie(item)} />
</div>
			
		</div> :
		<div style={{width:'220px', maxHeight:'290px',opacity:'.9', cursor:'pointer'}} key={item.id} className=" w-full m-2 rounded-lg shadow-md dark:bg-gray-800 md:dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700"  >
		<div onClick={()=>navigate(
			'/favourites/tvseries-details',
			{state:{
				tvSeriesDetails:item}}
			)} >
			  <div style={{display:"flex",justifyContent:"center"}} >
		
				<img className="m-1 movieCard"  src={item?.poster_path ? posterImageBaseUrl+item?.poster_path :placeholderImage } alt={item?.original_title || item?.title || item?.name || item?.original_name } />
				</div>
		
				<div className="px-5 pb-1">
					<p className="font-semibold tracking-tight text-gray-900 dark:text-white readMore" style={{wordBreak:'break-word',color:'rgb(22 83 175)'}}>{item?.original_title || item?.title || item?.name || item?.original_name  || "-"}</p>
					<span className="font-semibold text-gray-900 dark:text-white" style={{color:'dimgray'}}>{moment(item.first_air_date).format('DD-MM-YYYY')}</span>
			</div>

			</div>
			<div>
<img width={26} height={26}  style={{position: 'relative',bottom: '6px',  left: '182px' }} src={crossImage} alt="x icon" onClick={()=>dislikeTvSeries(item)} />
</div>
		</div>
		
		))}
		
		

		
		
		</div>	
		
		  )
}

export default Index



