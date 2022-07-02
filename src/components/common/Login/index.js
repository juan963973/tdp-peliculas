import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert'

import {UserContext} from '../../../contexts/UserContext'

const Login = ({loginShow, setLoginShow}) => {
    
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    const {setUserName} = useContext(UserContext)

    useEffect(() => {
        setShow(loginShow);
    },[loginShow])

    const handleClose = () => {
        setShow(false);
        setLoginShow(false);
        setError('')
        setTextButton('Iniciar Sesión');
        setBtnDisabled(false);
        setBody({ username: '', password: '' })
    }

    const [body, setBody] = useState({ username: '', password: '' })
    const [textButton, setTextButton] = useState('Iniciar Sesión')
    const [btnDisabled, setBtnDisabled] = useState(false)

    const inputChange = ({ target }) => {
        const { name, value } = target
        setBody({
            ...body,
            [name]: value
        })
    }
    
    const localStorageSetItem = async (data) => {
        await localStorage.setItem('auth', JSON.stringify(data))
    }
  
    function handleSubmit(event) {
        event.preventDefault();
        setTextButton('Iniciando ');
        setBtnDisabled(true);
        if(body.username.length == 0 || body.password.length == 0) {
            setError("Los campos son obligatorios!")
            setTextButton('Iniciar Sesión');
            setBtnDisabled(false);
            return
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}/token/`, body)
            .then(({ data }) => {
                setUserName(body.username)
                let dataNew = {...data, username: body.username}
                localStorageSetItem(dataNew).then(() => handleClose())
            }).catch(({ response }) => {
                setError(response.data.detail)
                setTextButton('Iniciar Sesión');
                setBtnDisabled(false);
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error != '' && 
                        <Alert key="danger" variant="danger">
                            {error}
                        </Alert>
                    }
                
                    <div className="form-outline mb-4">
                        <Form.Control
                            autoFocus
                            type='text'
                            name='username'
                            placeholder='Ingrese su username'
                            value={body.username}
                            onChange={inputChange}
                        />
                    </div>

                    <div className="form-outline mb-3">
                        <Form.Control
                            type='password'
                            name='password'
                            placeholder='Ingrese su contraseña'
                            value={body.password}
                            onChange={inputChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit" disabled={btnDisabled} >
                        {textButton}
                        {btnDisabled && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default Login;