import { Router } from "express";
import { createNotes, deleteNotes, getNotes, getNotesById,updateNotes } from "../controllers/notes.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { createNoteShchema, getNotesSchema } from "../schema/notes.schema";
import { checkAuth } from "../middlewares/checkUser";

const router = Router();

router.get('/',
checkAuth,
getNotes);

router.get('/:notesId',checkAuth,validateRequest(getNotesSchema),getNotesById);

router.post('/',
checkAuth,
validateRequest(createNoteShchema),
createNotes);

router.put('/:notesId',
checkAuth,
validateRequest(createNoteShchema),
updateNotes);


router.delete('/:notesId',deleteNotes);

export default router;