import React, { useState } from "react";
import Loader from "./Loader";
import moment from 'moment';
 function ModalComponent({...props}) {

const {showModal,setShowModal,loader,setLoader,videoData} = props;
  return (
    <>
      {showModal ? (
        <>
          <div
	onClick={() => setShowModal(false)}
            className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div      tabIndex={-1} className="relative w-auto my-6 mx-auto max-w-3xl">

              <div style={{background:'beige'}} className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <div className="font-semibold text-gray-900">
                 {videoData?.videoData?.title}
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() =>{
						 setShowModal(false)
						
						}}
                  >
                    <span className=" text-black h-8 w-8 text-3xl block outline-none focus:outline-none text-teal-600 font-bold">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-2" style={{display:'grid',placeContent:'center'}} >
                  {/* <p className="my-1 text-slate-500 text-lg leading-relaxed"> */}
					<div className="iframeLoader" >
					{
						loader ?
				
					<Loader/> :null
				}
				</div>
				<iframe allowFullScreen width="300px" height="230px" onLoad={()=>{
						setLoader(false);
					}} src={"https://www.youtube.com/embed/" + videoData?.videoData?.videoId}>
	</iframe>   
       
                  {/* </p> */}
				  <span className='text-teal-600 font-bold'>Published Date :<span className='font-semibold text-gray-900'> {moment(videoData?.videoData?.publishedAt).format('DD-MM-YYYY')}</span></span>

                </div>

                {/*footer*/}
                <div className="flex justify-center p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase py-1 px-6 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>

                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
export default ModalComponent