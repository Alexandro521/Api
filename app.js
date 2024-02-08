import express, { json } from 'express';
import cors from 'cors';
import { movieRouter } from './routes/movies.js';

const app = express();
//necesario para obtener el cuerpo del la solicitud
app.use(cors())
app.disable('x-powered-by'); //quitar la cabezera de powered-by-express
app.use(express.json()); //necesario para obtener el cuerpo del la solicitud

app.use("/movies",movieRouter)
 
app.get("/",(req,res)=>{
  res.json({message:"pagina principal"})
})

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log('servidor iniciado');
}) 