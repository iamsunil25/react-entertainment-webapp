import React,{useEffect, useState} from 'react'
import moment from 'moment';

import {  useNavigate } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css'
// import crossImage from "../../images/cross.svg";

import placeholderImage from "../../images/placeholderMovie.png";
import { useSelector, useDispatch } from 'react-redux';
import { dislike } from '../../redux/favouriteMovies';
export const Favourites = () => {
const dispatch = useDispatch()
const moviesData = useSelector((state:any)=>state?.favouriteMovies?.movies)
// console.log("🚀 ~ file: index.tsx:37 ~ Favourites ~ moviesData:", moviesData)
const tvseriesData = useSelector((state:any)=>state.favouriteMovies.tvSeries) 
// console.log("🚀 ~ file: index.tsx:35 ~ Favourites ~ tvseriesData:", tvseriesData)
let allData = [...moviesData,...tvseriesData];
const dislikeTvSeries = (item:any)=>{
	item.isTvseries=true;
		dispatch(dislike(item));
}
const dislikeMovie = (item:any)=>{
	item.isMovie=true
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
	return <h1 style={{textAlign:'center',lineHeight:'100px' }}>Currently there is no entertainment data marked as favourite.</h1>
}
  return (



<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} className='mt-2' >


{
allData?.map((item:any)=>(
item.isMovie ?
	<div style={{width:'220px', maxHeight:'290px',opacity:'.9', cursor:'pointer'}} key={item.id} className="hoverMovieCard w-full m-2 rounded-lg shadow-md dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700" >
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
	{/* <img width={30} height={30}  src={crossImage} alt="X icon" /> */}

	</div>

	
</div> :
<div style={{width:'220px', maxHeight:'290px',opacity:'.9', cursor:'pointer'}} key={item.id} className="hoverMovieCard w-full m-2 rounded-lg shadow-md dark:bg-gray-800 md:dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700"  onClick={()=>navigate(
	'/favourites/tvseries-details',
	{state:{
		tvSeriesDetails:item}}
	)}>

      <div style={{display:"flex",justifyContent:"center"}} >

	    <img className="m-1 movieCard"  src={item?.poster_path ? posterImageBaseUrl+item?.poster_path :placeholderImage } alt={item?.original_title || item?.title || item?.name || item?.original_name } />
		</div>

		<div className="px-5 pb-1">
            <p className="font-semibold tracking-tight text-gray-900 dark:text-white readMore" style={{wordBreak:'break-word',color:'rgb(22 83 175)'}}>{item?.original_title || item?.title || item?.name || item?.original_name  || "-"}</p>
            <span className="font-semibold text-gray-900 dark:text-white" style={{color:'dimgray'}}>{moment(item.first_air_date).format('DD-MM-YYYY')}</span>
	</div>
</div>
))}





</div>	

  )
}
