
import Modal from 'react-bootstrap/Modal';
import { Form, Button } from 'react-bootstrap';
import { createNote, updateNote } from '../network/notesApi';
import { NotesInput } from '../network/notesApi';
import { useForm } from 'react-hook-form';
import { Note } from '../interfeces/Notes';
import TextInputField from './Form/TextInputField';
import { useUserContext } from '../context/userContext';



interface AddEditNoteDialogProps {
  onDismiss: () => void,
  onNoteSaved: (note: Note) => void,
  noteToEdit?: Note
}

const AddEditNoteModal = ({ onDismiss, onNoteSaved, noteToEdit }: AddEditNoteDialogProps) => {
  const user = useUserContext();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NotesInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || ""
    }
  });

  async function onSubmit(input: NotesInput) {
    try {
      let notesResponse: Note;
      if (noteToEdit) {
        notesResponse = await updateNote(noteToEdit._id, input, user.token,user.refreshToken);
      } else {
        notesResponse = await createNote(input, user.token,user.refreshToken);
      }
      onNoteSaved(notesResponse)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>
          {noteToEdit ? "Edit Note" : "Add Note"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='addEditNoteForm' onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='title'
            label='Title'
            type="text"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.title}
          />
          <TextInputField
            name="text"
            label="Text"
            as="textarea"
            rows={5}
            placeholder="Text"
            register={register}
          />
          {/* <Form.Group className='mb-3'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              {...register("text")}
            />

          </Form.Group> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="submit"
          form="addEditNoteForm"
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddEditNoteModal