import '../assets/styles/notes.css'
import { Card } from "react-bootstrap"
import { Note as NoteInterface } from "../interfeces/Notes"
import { formatDate } from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'
import styleUtils from '../assets/styles/utils.module.css'

interface NoteProps {
   note: NoteInterface,
   onDeleteNote: (note: NoteInterface) => void,
   onNoteClicked: (note: NoteInterface) => void
}

const Note = ({ note, onDeleteNote, onNoteClicked }: NoteProps) => {
   const {
      title,
      text,
      createdAt,
      updatedAt
   } = note;
   let createdUpdatedText: string;
   if (updatedAt > createdAt) {
      createdUpdatedText = "UpdatedTime: " + formatDate(updatedAt)
   } else {
      createdUpdatedText = "CreatedTime: " + formatDate(updatedAt)
   }

   return (
      <Card className="card-container"
         onClick={() => onNoteClicked(note)}
      >
         <Card.Body className='note-body'>
            <Card.Title className={styleUtils.flexCenter}>
               {title}
               <MdDelete
                  className={`text-muted ms-auto`}
                  onClick={(e: Event) => {
                     onDeleteNote(note);
                     e.stopPropagation();

                  }}
               />
            </Card.Title>
            <Card.Text className='note-text'>
               {text}
            </Card.Text>
         </Card.Body>
         <Card.Footer className='text-muted'>
            {createdUpdatedText}
         </Card.Footer>
      </Card>
   )
}

export default Note