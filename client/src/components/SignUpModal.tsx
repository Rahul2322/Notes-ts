import { Modal, Form, Button ,Alert} from "react-bootstrap"
import { useForm } from "react-hook-form"
import { SignUpCredentials, signUp } from "../network/notesApi";
import { User } from "../interfeces/User";
import TextInputField from "./Form/TextInputField";
import styleUtils from '../assets/styles/utils.module.css';
import {useState} from 'react'
import { ConflictError } from "../errors/http_errors";

interface SignUpProps {
    onDismiss: () => void;
    onSignUpSuccessfull: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessfull }: SignUpProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

    const onSubmit = async (credential: SignUpCredentials) => {
        try {
            const newUser = await signUp(credential);
            onSignUpSuccessfull(newUser);
        } catch (error) {
            if(error instanceof ConflictError){
                setErrorText(error.message)
            }else{

                alert(error)
            }
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {
                    errorText && 
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <TextInputField
                        name="username"
                        label="Username"
                        placeholder="username"
                        type="text"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        placeholder="email"
                        type="email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        placeholder="password"
                        type="password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}
                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Sign Up
                    </Button>
                </Form>

            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal