import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllYoutubeVideos } from '../../ApiIntegration/TheMoviesDbAPi';
import { YoutubeVideApiResponse } from '../../utility/ApiResponseInterface';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../../utility/Loader';
import ModalComponent from '../../utility/Modal';


const YTVideosList = () => {
const [pageToken, setPageToken] = useState<string>("");
const [showModal, setShowModal] = useState(false);
const [oldData,setOldData] = useState<[]>([])
const [loader, setLoader]=useState(false);
const [title,setTitle]= useState({});

const {data, isLoading, isError, error} = useQuery<YoutubeVideApiResponse, Error>({queryKey:['YoutubeVideos', pageToken], queryFn:()=>getAllYoutubeVideos(pageToken)})


useEffect(() => {
	if(data){
		setOldData((prev:[])=>[...prev, ...data?.items])
	}
  return () => { }
}, [data])
useEffect(() => {
	if(showModal){
		document.body.style.overflowY="hidden"
	}
	else if(!showModal) {
		document.body.style.overflowY="auto"
	}
    return () => {};
  }, [showModal]);

if(isError){
	// console.log("error",error);
	
	return(
		<div style={{display:'grid',placeContent:'center'}}>
			there is error
		</div>
	)
}
const showModalFunc=(videoData:any)=>{
	setLoader(true);
	setShowModal(true);
	setTitle({videoData})
}; 
// console.log("youtube videos api response",data);
const fetchMoreData = ()=>{
	if(data){
		setPageToken(data.nextPageToken)
	}
	return;
	}
	// console.log("showmodel",showModal);
	
// if(isLoading){
// 	return <Loader/>
// }
  return (
	
	<InfiniteScroll  dataLength={oldData.length}
          next={fetchMoreData}
          hasMore={true}
          loader={isLoading && <Loader/>}
		  style={{overflow:'hidden'}}
		  >

	<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}}>
<ModalComponent showModal={showModal} setShowModal={setShowModal} loader={loader} setLoader={setLoader} videoData={title} />
{oldData.map((videoItem:any, index)=>(
<div className='m-1 cursor-pointer' key={index} onClick={()=>showModalFunc({videoId:videoItem?.id, ...videoItem.snippet})}>

<img  src ={videoItem.snippet.thumbnails.high?.url} width="320px" height="220px" />
	</div>

))}

</div>
</InfiniteScroll>
  )
  }

export default YTVideosList

{/* <YouTube   loading="lazy" videoId={} opts={opts} onReady={(e)=>onPlayerReady(e)} /> */}