import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteInterface } from '../interfeces/Notes';
import { fetchNote, deleteNote as noteDelete } from '../network/notesApi';
import Note from './Note';
import styleUtils from '../assets/styles/utils.module.css'
import AddEditNoteModal from './AddEditNoteModal';
import { useUserContext } from '../context/userContext';

const NotesPageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteInterface[]>([]);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteInterface | null>(null);
    const [notesLoading, setNotesLoading] = useState(true)
    const [showNotesErrorLoading, setShowNotesErrorLoading] = useState(false)
    console.log("notes",notes.length,notes);
    const user = useUserContext();
    // console.log('user',user)
    useEffect(() => {
        const loadNotes = async () => {
            try {
                setShowNotesErrorLoading(false);
                setNotesLoading(true);
                const result = await fetchNote(user.token,user.refreshToken);
                setNotes(result)
            } catch (error: any) {
                setShowNotesErrorLoading(true)
            } finally {
                setNotesLoading(false)
            }
        }
        loadNotes()
    }, [])

    const deleteNote = async (note: NoteInterface) => {
        try {
            await noteDelete(note._id, user.token,user.refreshToken);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
            alert(error)
        }
    }

    const notesGrid = <Row xs={1} md={2} xl={3} className={`g-4 noteGrid`}>
        {
        notes.map((note) => (
            <Col>
                <Note
                    key={note._id}
                    note={note}
                    onDeleteNote={() => deleteNote(note)}
                    onNoteClicked={setNoteToEdit}
                />
            </Col>
        ))}
    </Row>
    return (
        <>
            <Button
                onClick={() => setShowAddNoteDialog(true)}
                className={`mb-4 mt-2 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}>
                <FaPlus />
                Add Notes
            </Button>
            {notesLoading && <Spinner animation='border' variant='primary' />}
            {showNotesErrorLoading && <p>Someting Went Wrong!</p>}
            {!notesLoading && !showNotesErrorLoading &&
                <>
                    {
                    
                        notes.length > 0 ?
                            notesGrid
                            : <p>You don't have any notes yet</p>
                    }
                </>
            }

            {showAddNoteDialog &&
                <AddEditNoteModal
                    onDismiss={() => setShowAddNoteDialog(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false);
                    }}
                />
            }

            {
                noteToEdit && <AddEditNoteModal
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(updatedNote) => {
                        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote))
                        setNoteToEdit(null)
                    }}
                />
            }
        </>
    )
}

export default NotesPageLoggedInView