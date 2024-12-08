import React, { useEffect, useState } from 'react'
import moment from 'moment';

import {  useNavigate } from 'react-router-dom';

import 'react-loading-skeleton/dist/skeleton.css'
import crossImage from "../../images/multiply.png";

import placeholderImage from "../../images/placeholderMovie.png";
import { useSelector, useDispatch } from 'react-redux';
import { dislike } from '../../redux/favouriteMovies';
const Index = () => {
	const dispatch = useDispatch();
	const [selectedValue, setSelectedValue] = useState("all");
	const [mutation, setMutation] = useState({})
	const moviesData = useSelector((state:any)=>state?.favouriteMovies?.movies)
	// console.log("🚀 ~ file: index.tsx:37 ~ Favourites ~ moviesData:", moviesData)
	const tvseriesData = useSelector((state:any)=>state.favouriteMovies.tvSeries) 
	// console.log("🚀 ~ file: index.tsx:35 ~ Favourites ~ tvseriesData:", tvseriesData)
	const [filteredData, setfilteredData] = useState([...moviesData,...tvseriesData])
	// console.log("filteredData",filteredData);
const allData = [...moviesData,...tvseriesData]

useEffect(() => {
	if(selectedValue==="all"){
		setfilteredData([...moviesData,...tvseriesData])
	}
	else if(selectedValue==="movies"){
		setfilteredData(moviesData)
	}
	else if(selectedValue==="tv_series"){
		setfilteredData(tvseriesData)
	}

  return () => {}
}, [selectedValue,mutation])


	const dislikeMovie = (item:any)=>{
			dispatch(dislike(item));
			setMutation({})
	}

 
	// const handleSelect = (e:any)=>{
	// 	setSelectedValue(e.target.value)	
	// }
		const navigate = useNavigate();	
		useEffect(() => {
	  window.history.replaceState({}, document.title);
	  return () => {}
	}, [])
	



	if(allData.length===0){
		return(
			<div className='mt-5'>
	 	<h1 style={{fontWeight:'500',fontSize:'20px',textAlign:'center' }}>No data found.</h1>
				 	</div>	) 
	}


	return (
<>


{/* <select  id="moviesAndTvSeries" onChange={handleSelect} className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full-select p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option key={"all"} value="all" >All</option>
  <option key={"movies"} value="movies">Movies</option>
  <option key={"tv_series"} value="tv_series">Tv series</option>
</select> */}

{
<div className='mt-2'>
{ moviesData.length===0 && selectedValue=="movies"? 	<h1 className='text-For-No-Favourite-Data'>Your favourite list has no <span className='no-Movie-Or-TvSeries-Data'>movies</span>.</h1>:null}
			 
	</div>
}

		<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}} className='mt-5 pt-5' >
		{
		filteredData?.map((item:any)=>(
		item.isMovie ?
			<div style={{width:'220px', maxHeight:'290px',opacity:'.9', cursor:'pointer'}} key={item.imdbRating} className=" w-full m-2 bg-common-background rounded-lg shadow-md dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700" >
			<div onClick={()=>navigate(
			'/favourites/movies-details',
			{state:{
				movieDetails:item}}
			)}>
			  <div style={{display:"flex",justifyContent:"center"}} >

				<img className="m-2 movieCard"  src={item?.Poster || placeholderImage } alt={ item?.Title ?? "N/A"} />
				</div>
		
				 <div className="px-5 pb-1">
					<p className="font-semibold tracking-tight text-gray-900  readMore" style={{wordBreak:'break-word',color:'rgb(22 83 175)'}}>{ item?.Title || "N/A"}</p>
					<span className="font-semibold text-gray-900 " style={{color:'dimgray'}}>{moment(item.Released).format('DD-MM-YYYY')}</span>
			</div>
			

		
			</div>
			
			  <img width={26} height={26}  style={{position: 'relative',bottom: '6px',  left: '182px' }} src={crossImage} alt="x icon" onClick={()=>dislikeMovie(item)} />
			
		</div> :

null
		
		))}
		
		

		
		
		</div>	
		</>
		  )
}

export default Index



