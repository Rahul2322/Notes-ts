import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

app.listen(port,()=>{
 console.log('Server Listening on port',port)
 mongoose.connect(process.env.MONGO_URL as string)
 .then(()=>{
    console.log('connected db')
 }).catch((error)=>{
    console.log('connection failed')
 })
})