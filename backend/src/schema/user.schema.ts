import {object,string,TypeOf} from 'zod';


export const createUserSchema = object({
    body:object({
        username:string({
            required_error:"username is required"
        }),
        email:string({
            required_error:"Email is required"
        }).email('Not a valid email'),
        password:string({
            required_error:"Password is required"
        }).min(6,"Password too short must be minimun of 6 chars")
    })
})


// export const readUserSchema = object({
//     params:object({
//         userId:string({
//             required_error:"User Id is required"
//         })
//     })
// })


export const loginUserSchema = object({
    body:object({
        email:string({
            required_error:"Email is required"
        }).email('Not a valid email'),
        password:string({
            required_error:"Password is required"
        }).min(6,"Password too short must be minimun of 6 chars")
    })
})
export type CreateUserInput = TypeOf<typeof createUserSchema>
// export type ReadUserInput = TypeOf<typeof readUserSchema>
export type LoginUserInput = TypeOf<typeof loginUserSchema>