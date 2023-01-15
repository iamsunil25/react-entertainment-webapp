export interface MoviesApiResponse {
	page: number;
    results:[],
   total_pages:number,
   total_results:number
  }

  type PageInfo={
	totalResults:number,
	resultsPerPage:number
  }
  export interface YoutubeVideApiResponse {
	"kind": string,
  "etag": string,
  "nextPageToken": string,
  "items": [],
  "pageInfo": PageInfo,
  
  }