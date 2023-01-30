import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignIn = () => {
  const { setIsLoggedIn } = props;
  const [errrorMessage, setErrorMessage] = React.useState('');
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const form = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const { data } = await axios.post(
      'http://localhost:8000/api/user/signin',
      form,
    );
    if (data.status === parseInt('401')) {
      setErrorMessage(data.response);
    } else {
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      navigate('/');
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Đăng nhập</h1>
        <Form.Group className="mb-3" id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="email@gmail.com"
            required
          />
          <Form.Text className="text-muted">
            Chúng tôi sẽ không công khai email của bạn
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" id="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type={passwordShow ? 'text' : 'password'}
            name="password"
            placeholder="12345678"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" id="Checkbox">
          <Form.Check
            type="checkbox"
            onClick={togglePassword}
            label="Hiển thị"
          />
        </Form.Group>
        <Button className="btnSubmit" variant="primary" type="submit">
          Đăng nhập
        </Button>
      </Form>
    </>
  );
};

export default SignIn;
