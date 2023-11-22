import { Button } from "react-bootstrap"

interface NavBarLoggedOutViewProps {
    onSignUpClicked:()=>void,
    onLogInClicked:()=>void,
}

const NavBarLoggedOutView = ({onLogInClicked,onSignUpClicked}:NavBarLoggedOutViewProps) => {
  return (
    <>
    <Button onClick={onSignUpClicked}>Sign Up</Button>
    <Button onClick={onLogInClicked}>Log In</Button>
    </>
  )
}

export default NavBarLoggedOutView