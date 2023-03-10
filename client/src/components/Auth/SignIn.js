import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import './sign.scss';

const SignIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };
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
      <Alert key={'warning'} variant={'warning'}>
        wrong password or email
      </Alert>;
    } else {
      localStorage.setItem('token', data.token);
      dispatch(userActions.setUser(data));
      navigate('/');
    }
  };
  return (
    <Container id="body">
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
      <Link to="/signup">
        <p className="text-center pt-[20px] text-gray">Chưa có tài khoản ?</p>
      </Link>
    </Container>
  );
};

export default SignIn;
