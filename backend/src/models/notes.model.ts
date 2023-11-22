import { InferSchemaType, Schema, model } from "mongoose";

export interface NotesInput{
    title:string;
    text?:string;
 }

const notesSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    text:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

type Note = InferSchemaType<typeof notesSchema>

export default model<Note>("Note",notesSchema)