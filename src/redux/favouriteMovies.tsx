import { createSlice } from '@reduxjs/toolkit'

export const favouriteMovies = createSlice({
  name: 'favouriteMovies',

  initialState: {
    movies:[],
	tvSeries:[]
  },
  reducers: {
	like:(state:{movies:Array<{}>,tvSeries:Array<{}>},action)=>{
		// console.log("like action",action);
		if(action.payload.isMovie){
			let uniqueMovies=[...state.movies,action.payload]
			state.movies = uniqueMovies.filter(obj => !uniqueMovies[obj.id] && (uniqueMovies[obj.id] = true))
		}else if(action.payload.isTvseries){
			let uniqueTvSeries=[...state.tvSeries,action.payload]
			state.tvSeries = uniqueTvSeries.filter(obj => !uniqueTvSeries[obj.id] && (uniqueTvSeries[obj.id] = true))
		}
		// console.log("state",state);
		
	},
	dislike:(state:{movies:Array<{}>,tvSeries:Array<{}>},action)=>{
		// console.log("dislike action",action);
		if(action.payload.isMovie){
			state.movies = state.movies.filter((item:any)=>item.id!==action.payload?.id)
		}else if(action.payload.isTvseries){
			state.tvSeries = state.tvSeries.filter((item:any)=>item.id!==action.payload?.id)
		}
	},
  },
})

export const { like, dislike } = favouriteMovies.actions


export default favouriteMovies.reducer
