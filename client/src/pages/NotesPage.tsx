
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLogedOut from '../components/NotesPageLogedOut';
import { Container } from "react-bootstrap";
import { UserContext } from '../context/userContext';
import { User } from '../interfeces/User';

interface NotesPageProps {
    loggedInUser: User | null,
}

const NotesPage = ({ loggedInUser }:NotesPageProps) => {

    return (
        <UserContext.Provider value={loggedInUser}>
            <Container className='notePage'>
                <>
                    {
                        loggedInUser ?
                        < NotesPageLoggedInView /> :
                    <NotesPageLogedOut />
        }
                </>
            </Container>
        </UserContext.Provider>
    )
}

export default NotesPage