import moment from 'moment';
import React from 'react'
import { useLocation,  } from 'react-router-dom';
import BackTo from '../../utility/BackTo';
import { convertMinutesToHoursAndMinutes } from '../../utility/RunTimeToMinutes';
  
const FavouriteMoviesSeriesDetails = () => {
const {state}= useLocation()
const {movieDetails} = state || {};
const data = movieDetails;
// console.log("data",data);
	
	return (
<>
 <BackTo  page={null} component ={"/favourites"} />
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

 </div>



</>


  )
}

export default FavouriteMoviesSeriesDetails


