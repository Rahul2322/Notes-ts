import express, { NextFunction, Request, Response }  from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import createHttpError,{isHttpError} from "http-errors";
import router  from "./routes/index.routes";
import  cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'))
app.use(cors());
app.use(helmet());
app.use(cookieParser());


app.use('/api',router)

app.use((req:Request,res:Response,next:NextFunction)=>{
    next(createHttpError(404,'Not Found'))
})


app.use((error:unknown,req:Request,res:Response,next:NextFunction)=>{
   let errorMessage = 'Someting Went Wrong';
   let statusCode = 505;

   if(isHttpError(error)){
     statusCode = error.status;
     errorMessage = error.length ? error[0].message :  error.message;
   }
   return res.status(statusCode).json({
    error:errorMessage
   })
})


export default app;