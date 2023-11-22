import { Button, Navbar } from "react-bootstrap";
import { User } from "../interfeces/User"
import { logout } from "../network/notesApi"

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessfull : ()=>void,
}

const NavBarLoggedInView = ({user,onLogoutSuccessfull}:NavBarLoggedInViewProps) => {

    const logoutUser = async()=>{
       try {
        await logout();
        onLogoutSuccessfull();
       } catch (error) {
        alert(error)
       }
    }
  return (
    <>
        <Navbar.Text className="ms-2">
            Signed as :{user.username}
        </Navbar.Text>
        <Button onClick={logoutUser}>Log out</Button>
    </>
  )
}

export default NavBarLoggedInView