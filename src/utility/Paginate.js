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
  <ul class="inline-flex -space-x-px" style={{cursor:'pointer'}}>
    <li onClick={previousPage}  class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</li>
	{
		 Array.from({length:30},()=>'filled').map((item,index)=><li key={index+1} onClick={()=>setPage(index+1)} class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{index+1}</li>)
	}

    <li onClick={nextPage}
 class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next
    </li>
  </ul>
</nav>
</div>
)

}
export default PaginatedItems