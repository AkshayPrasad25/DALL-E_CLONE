import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config(); //pull env variables from dotenv file
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); //accepts objects where we set limit to 50mb

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async(req,res)=> {
    res.send('Hello from DALL-E!');
}) //Ensure app is running once we visit the url of server

const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log('Server started on http://localhost:8080'));
    } catch (error) {
      console.log(error);
    }
};  

startServer();
