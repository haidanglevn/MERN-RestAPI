import express, {Request, Response, NextFunction, urlencoded} from 'express';
import todoRoutes from './routes/todo';
import { json } from 'body-parser';
import db from 'mongoose';

const app = express();
app.use(json());
app.use(urlencoded({extended: true}));

app.listen(3005);
app.use('/todo', todoRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(500).json({message: err.message})
})

db.connect("mongodb://localhost:27017/todos")