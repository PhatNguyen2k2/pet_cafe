import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import styles from './signUp.scss';

const SignUp = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  let navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const form = {
      fullname: data.get('fname') + ' ' + data.get('lname'),
      email: data.get('email'),
      address: data.get('address'),
      password: data.get('password'),
    };
    const res = await axios.post('http://localhost:8000/api/user/signup', form);
    if (res.status === 201) {
      <Alert key={primary} variant={primary}>
        Tạo tài khoản thành công
      </Alert>;
    } else {
      <Alert key={warning} variant={warning}>
        Tài khoản đã tồn tại, hãy đăng nhập
      </Alert>;
    }
    navigate('/');
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Đăng kí tài khoản</h1>
        <Form.Group className="mb-3" id="fname">
          <Form.Label>Họ</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            placeholder="Nguyễn Văn"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" id="lname">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" name="lname" placeholder="A" required />
        </Form.Group>
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
        <Form.Group className="mb-3" id="address">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            placeholder="Thành phố Thủ Đức"
            required
          />
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
          Đăng kí
        </Button>
      </Form>
    </>
  );
};

export default SignUp;
