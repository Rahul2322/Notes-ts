import { Container, Nav, Navbar } from "react-bootstrap"
import { User } from "../interfeces/User"
import NavBarLoggedInView from "./NavBarLoggedInView"
import NavBarLoggedOutView from "./NavBarLoggedOutView"

interface NavBarProps {
    loggedInUser : User | null,
    onSignUpClicked:()=>void,
    onSignInClicked:()=>void,
    onLogoutSuccessfull:()=>void,

}

const NavBar = ({loggedInUser,onSignInClicked,onSignUpClicked,onLogoutSuccessfull}:NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="sm" sticky="top">
          <Container>
            <Navbar.Brand>
                Cool Notes App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar"/>
            <Navbar.Collapse id="main-navbar">
                <Nav className="ms-auto">
                    {loggedInUser ?
                    <NavBarLoggedInView user={loggedInUser} onLogoutSuccessfull={onLogoutSuccessfull}/>:
                    <NavBarLoggedOutView onLogInClicked={onSignInClicked} onSignUpClicked={onSignUpClicked}/>}
                </Nav>
            </Navbar.Collapse>
          </Container>
    </Navbar>
  )
}

export default NavBar