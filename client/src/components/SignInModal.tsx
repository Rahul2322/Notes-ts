import { Alert, Button, Form, Modal } from "react-bootstrap"
import { User } from "../interfeces/User";
import { useForm } from "react-hook-form";
import { LoginCredentials, login } from "../network/notesApi";
import TextInputField from "./Form/TextInputField";
import styleUtils from '../assets/styles/utils.module.css'
import {useState} from 'react'
import { UnauthorizedError } from "../errors/http_errors";

interface SignInProps {
    onDismiss: () => void;
    onSignInSuccessfull: (user: User) => void;
}

const SignInModal = ({ onDismiss, onSignInSuccessfull }: SignInProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

    const onSubmit = async (credential: LoginCredentials) => {
        try {
            const user = await login(credential);
            onSignInSuccessfull(user);
        } catch (error) {
            if(error instanceof UnauthorizedError){
                setErrorText(error.message)
            }else{

                alert(error);
            }
        }
    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign In
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    errorText && 
                    <Alert variant="danger">
                        {errorText}
                    </Alert>
                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="email"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.email}

                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="password"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.password}

                    />

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={styleUtils.width100}
                    >
                        Sign In
                    </Button>
                </Form>

            </Modal.Body>

        </Modal>
    )
}

export default SignInModal