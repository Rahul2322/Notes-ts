import 'bootstrap/dist/css/bootstrap.min.css';
import {  useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styleUtils from './assets/styles/utils.module.css';
import NavBar from './components/NavBar';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import { User } from './interfeces/User';
// import { getLoggedInUSer } from './network/notesApi';
import NotFoundPage from './pages/NotFoundPage';
import NotesPage from './pages/NotesPage';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  // useEffect(() => {
  //   const fetchLoggedInUser = async () => {
  //     try {
  //       const user = await getLoggedInUSer();
  //       setLoggedInUser(user);
  //     } catch (error) {
  //       alert(error)
  //     }
  //   }
  //   fetchLoggedInUser();

  // }, [])


  return (
    <BrowserRouter>
      <>
        <NavBar
          loggedInUser={loggedInUser}
          onSignInClicked={() => setShowSignInModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessfull={() => setLoggedInUser(null)}
        />
     
          <Container className={styleUtils.pageContainer} >
            <Routes>
              <Route
              path='/'
               element={<NotesPage loggedInUser={loggedInUser} />} />
              <Route
                path='/*'
                element={<NotFoundPage />}
              />
            </Routes>
          </Container>
        {showSignUpModal &&
          <SignUpModal
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessfull={(user) => {
              setLoggedInUser(user)
              setShowSignUpModal(false)
            }}

          />}
        {showSignInModal &&
          <SignInModal
            onDismiss={() => setShowSignInModal(false)}
            onSignInSuccessfull={(user) => {
              setLoggedInUser(user)
              setShowSignInModal(false)
            }}

          />}
      </>

    </BrowserRouter>
  )
}

export default App
