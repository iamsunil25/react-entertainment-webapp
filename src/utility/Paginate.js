import React, { useCallback } from 'react';




function PaginatedItems({page,setPage}) {

	const previousPage =  useCallback(()=>{
		if(page!==1){
setPage((prev)=>prev-1)
		}
	},[page])
	const nextPage = useCallback( ()=>{
		if(page!==30){
			setPage((prev)=>prev+1)
		}
	}, [page])



	
return(
	<div className=' mb-2' style={{display:'flex',justifyContent:'center'}}>
<nav aria-label="Page navigation example">
  <ul className="inline-flex flex-wrap -space-x-px">

    <li   style={{pointerEvents:page=='1' ? 'none':'', cursor:page=='1' ? 'default':'pointer'}}  onClick={previousPage}  className="px-3 py-2 ml-0 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</li>
	{
		 Array.from({length:30},()=>'filled').map((item,index)=><li key={index+1} onClick={()=>setPage(index+1)} style={{cursor:'pointer'}}  className={`px-3 py-2 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page==index+1 ? 'activePage':''}`}>{index+1}</li>)
	}

    <li  style={{pointerEvents:page=='30' ? 'none':'', cursor:page=='30' ? 'default':'pointer'}}  onClick={nextPage}
 className="px-3 py-2 leading-tight text-gray-500  border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
    </li>
  </ul>
</nav>
</div>
)

}
export default PaginatedItems