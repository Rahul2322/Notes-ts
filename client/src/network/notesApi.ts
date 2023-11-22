import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../interfeces/Notes";
import {User} from '../interfeces/User';

async function fetchData(input:RequestInfo,init?:RequestInit){
    const response = await fetch(input,init);
    if(response.ok){
        return response
    }else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        if(response.status === 401){
            throw new UnauthorizedError(errorMessage)
        }else if(response.status === 409){
            throw new ConflictError(errorMessage)
        }else{
            throw new Error(`${errorMessage}`)
        }
        
    }
}


export const fetchNote = async(token:string | undefined,refreshToken:string | undefined):Promise<Note[]>=>{
    const response = await fetchData('http://localhost:5000/api/notes',
     { 
        method: "GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "x-refresh-token": `${refreshToken}`,
        }
    });
    return response.json();
}

export interface NotesInput {
    title:string;
    text?:string
}

export const getLoggedInUSer = async():Promise<User>=>{
    const response = await fetchData('http://localhost:5000/api/user');
    return response.json();
}

export interface LoginCredentials {
    email:string;
    password:string;
}


export const login = async(credentials:LoginCredentials):Promise<User>=>{
    const response = await fetchData('http://localhost:5000/api/user/signin',
    {
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    }
    
    );
    return response.json();
}

export interface SignUpCredentials {
    username:string;
    email:string;
    password:string;
}

export const signUp = async(credentials:SignUpCredentials):Promise<User>=>{
    const response = await fetchData('http://localhost:5000/api/user/signup',
    {
        method:"POST",
        headers:{
        "Content-Type":"application/json"
        },
        body:JSON.stringify(credentials)
    }
    
    );

    return response.json();
}

export const logout = async ()=>{
    const response = await fetchData('http://localhost:5000/api/user/logout',{method:"POST"});
    return response.json();
}

export const createNote = async(note:NotesInput,token:string | undefined,refreshToken:string | undefined):Promise<Note>=>{
    const response = await fetchData('http://localhost:5000/api/notes',
    {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`,
            "x-refresh-token": `${refreshToken}`,
        },
        body:JSON.stringify(note)
})
return response.json();
}

export const updateNote = async(noteId:string,note:NotesInput,token:string | undefined,refreshToken:string | undefined)=>{
    const response = await fetchData('http://localhost:5000/api/notes/'+ noteId,
    {
        method:"PUT",
        headers:{
            'Content-Type':"application/json",
            "Authorization" : `Bearer ${token}`,
            "x-refresh-token": `${refreshToken}`,
            
        },
        body:JSON.stringify(note)
    }
    
    )
    return response.json();
}

export const deleteNote = async(noteId:string,token:string | undefined,refreshToken:string | undefined)=>{
    const response = await fetchData('http://localhost:5000/api/notes/'+ noteId,
    {
        method:'DELETE',
        headers:{
            'Content-Type':"application/json",
            "Authorization" : `Bearer ${token}`,
            "x-refresh-token": `${refreshToken}`,
            
        },
        
    }
    )
    return response.json();
}