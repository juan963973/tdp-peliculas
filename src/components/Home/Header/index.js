import React, { useState, useEffect, useContext} from 'react';
import './styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Login from '../../common/Login';

import { UserContext } from '../../../contexts/UserContext';



const Header = () => {
    const [loginShow, setLoginShow] = useState(false);
    const {userName, setUserName} = useContext(UserContext)

    const loginModalShow = () => {
      setLoginShow(true)
    }

    // useEffect(() => {
    //   let auth = localStorage?.getItem('auth')
    //   if(auth){
    //     auth = JSON.parse(auth);
    //     setUserName(auth.username)
    //   }
    // }, [])

    const handleLogout = () => {
      localStorage.removeItem('auth');
      setUserName(null)
    }

    return (
      <>
        <Login loginShow={loginShow} setLoginShow={setLoginShow} />
        <Navbar bg="dark" variant="dark" fixed="top" style={{padding:'10px'}}>
          <Navbar.Brand href="/">TDP-Vídeos</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {userName != null ? 
                <>
                  Bienvenido: <a href="javascript:void(0);" onClick={handleLogout}>{userName}</a> 
                </>
                : 
                <a href="javascript:void(0);" onClick={loginModalShow}>Iniciar sesión</a>
              }
              
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
}

export default Header;
