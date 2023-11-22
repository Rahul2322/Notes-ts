import { InferSchemaType, Schema, model,Document } from "mongoose";
import bcrypt from 'bcrypt'

export interface UserInput {
    username:string;
    password:string;
    email:string;
}


export interface UserDocument extends UserInput,Document{
    comparePassword(candidatePassword:string):Promise<Boolean>;
    createdAt:Date;
    updatedAt:Date;
}

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        select:false
    },
    password:{
        type:String,
        required:true,
        select:false 
    }
},{
    timestamps:true
})

// type User = InferSchemaType<typeof userSchema>

userSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(this.password,salt);
    this.password = hash;
    next();
})

userSchema.methods.comparePassword = async function(password:string):Promise<boolean>{
   return bcrypt.compare(password,this.password)
}

export default model<UserDocument>("User",userSchema)

