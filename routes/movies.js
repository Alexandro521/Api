import {Router} from 'express'
import { readJSON } from '../utils/utils.js';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { validateMovie , validatePartialMovie } from '../schemas/movies.js';


 
const movies = readJSON("../movies.json")


export const movieRouter = Router()

movieRouter.get("/",(req, res) => {

    const {buscar} = req.query;

    if(buscar){
    const movie = movies.filter(movie => movie.title.includes(buscar))
    if(movie.length < 1){
      return res.json({message:"no  han abido coincidencias"})
    }
     return  res.json(movie)
    }

  res.json(movies);
})

movieRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);
    if (movie) return res.json(movie);
    res
      .status(404)
      .json({ message: 'Movie not found, try an ID that already exists.' });
  });

  
movieRouter.post('/', (req, res) => {
    const result = validateMovie(req.body);
  
    if (result.error) {
      res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newMovie = {
      id: randomUUID(),
      ...result.data,
    };
    movies.push(newMovie);
    res.json(newMovie);
  });

  movieRouter.patch('/:id',(req,res)=>{

    const result = validatePartialMovie(req.body)
    if(result.error){
        return res.status(400).json({message: JSON.parse(result.error.message)})
    }
    const {id}= req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex < 0){
        return  res.status(404).json({ message: 'Movie not found, try an ID that already exists.'})
    }
    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    movies[movieIndex] = updateMovie;
    return res.json([updateMovie])
})

movieRouter.delete('/:id',(req,res)=>{


    const {id}= req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if(movieIndex < 0){
        return  res.status(404).json({ message: 'Movie not found, try an ID that already exists.'})
    }
    movies.splice(movieIndex,1)
    return res.json({message: 'movie eliminated'})
})


movieRouter.options('/movies',(req,res)=>{
    const origin = req.header('origin')
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods', 'GET','POST','PATCH','DELETE')
    res.send()
})