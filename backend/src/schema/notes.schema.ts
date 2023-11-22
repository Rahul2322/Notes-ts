import { object,string,TypeOf } from "zod";

export const createNoteShchema = object({
    body:object({
        title:string({
            required_error:"title is required"
        }),
        text:string()
    })
})

export const getNotesSchema = object({
    params:object({
        notesId:string({
            required_error:"Id is required"
        })
    })
})

export type CreateNotesInput = TypeOf<typeof createNoteShchema>

export type ReadNotesInput = TypeOf<typeof getNotesSchema>