import express from 'express';
import 'dotenv/config';
import cors from 'cors'
const app = express();
import rootRoute from './routes/index.js';

app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRoute);


app.listen(process.env.PORT); 