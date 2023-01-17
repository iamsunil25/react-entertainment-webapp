import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getAllYoutubeVideos } from '../../ApiIntegration/TheMoviesDbAPi';
import { YoutubeVideApiResponse } from '../../utility/ApiResponseInterface';
import YouTube, { YouTubeProps } from 'react-youtube';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../../utility/Loader';

type YoutubeVideoItem ={
	kind:string,
	id:string,
	etag:string,
	snippet:{}
  }
const YTVideosList = () => {
const [pageToken, setPageToken] = useState<string>("");
const [oldData,setOldData] = useState<[]>([])

const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
const opts: YouTubeProps['opts'] = {
    // height: '250',
    // width: '250',
    playerVars: {

		host: 'http://www.youtube.com',
		widget_referrer :window.location.href,
		origin:window.location.href,
		 enablejsapi:1,
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
	style:{margin:'15px'}
  };

const {data, isLoading, isError} = useQuery<YoutubeVideApiResponse, Error>({queryKey:['YoutubeVideos', pageToken], queryFn:()=>getAllYoutubeVideos(pageToken)})
useEffect(() => {
	if(data){
		setOldData((prev:[])=>[...prev, ...data?.items])
	}

  return () => {
	
  }
}, [data])

console.log("youtube videos api response",data);
const fetchMoreData = ()=>{
	if(data){
		setPageToken(data.nextPageToken)
	}
	return;
	}

  return (
	<InfiniteScroll  dataLength={oldData.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<Loader/>}
		  style={{width:'100%',height:'90vh',overflow:'hidden'}}
		  >
	<div style={{display:"flex",justifyContent:"center",flexWrap:'wrap'}}>


{oldData.map((videoItem:YoutubeVideoItem, index)=>(
<div className='m-4' key={index}  >


<iframe width="380px" height="260px" src={"https://www.youtube.com/embed/"+ videoItem.id}>
</iframe> 

	</div>

))}

</div>
</InfiniteScroll>
  )
  }

export default YTVideosList

{/* <YouTube   loading="lazy" videoId={} opts={opts} onReady={(e)=>onPlayerReady(e)} /> */}