import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Menu from '../Menu/index';
import './style.css';
import { ValidUserContext } from '../contexts/ValidUserContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { apiAuthCheck } = useContext(ValidUserContext);

  const onFormSubmit = async e => {
    e.preventDefault();
    await apiAuthCheck(email, password);
  };

  return (
    <div>
      <Menu />

      <div className='Signin'>
        <div className='form-container'>
          <h1>Login</h1>
          <p>Please enter your Login and your Password</p>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className='form-group'>
              <Form.Label className='form-label'>
                <i className="bi bi-person"></i> {/* Assuming you're using Bootstrap Icons */}
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
                className='form-control'
              />
            </Form.Group>
            <Form.Group className='form-group'>
              <Form.Label className='form-label'>
                <i className="bi bi-key"></i> {/* Assuming you're using Bootstrap Icons */}
                Password
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                className='form-control'
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="w-100 btn-primary mt-3"
            >
              Logar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
