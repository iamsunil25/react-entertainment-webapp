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
			state.movies = uniqueMovies.filter(obj => !uniqueMovies[obj.imdbID] && (uniqueMovies[obj.imdbID] = true))
		}
	},
	dislike:(state:{movies:Array<{}>,tvSeries:Array<{}>},action)=>{
		// console.log("dislike action",action);
		if(action.payload.isMovie){
			state.movies = state.movies.filter((item:any)=>item.imdbID!==action.payload?.imdbID)
		}
	},
  },
})

export const { like, dislike } = favouriteMovies.actions


export default favouriteMovies.reducer
