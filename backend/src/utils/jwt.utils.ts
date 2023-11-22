import jwt from 'jsonwebtoken';


export interface JwtPayload {
    id: string;
    name:string;
    iat: number;
    exp:number;
    
  }

export const signJwt = async(payload:Object,options?:jwt.SignOptions | undefined)=>{
    console.log(payload)
   return jwt.sign(payload,process.env.JWT_PASSWORD as string,{
    ...(options && options),
    algorithm:"HS256"
   })
}

export const verifyJwt = async(token:string):Promise<{valid:boolean,expired:boolean,decoded:JwtPayload | null}>=>{
   try {
    const decoded = jwt.verify(token,process.env.JWT_PASSWORD!) as JwtPayload;
     let expired = false;
     console.log(decoded,'decoded',Date.now())
    if(decoded?.exp * 1000 < Date.now()){
      expired = true
    }

    return {
        valid:true,
        expired,
        decoded 
    }
   } catch (error:any) {
    return {
        valid:false,
        expired:error.message === 'jwt expired',
        decoded:null 
    }
   }
}