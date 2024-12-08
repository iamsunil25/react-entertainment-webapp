export interface MoviesApiResponse {
    Search:[],
   totalResults:number
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