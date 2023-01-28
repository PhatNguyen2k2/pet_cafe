import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function BasicExample() {
  const [passwordShow, setPasswordShow] = useState(false);
  let navigate = useNavigate();
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const form = {
      fullname: data.get('fname') + ' ' + data.get('lname'),
      email: data.get('email'),
      address: data.get('address'),
      password: data.get('password'),
    };
    await axios.post('http://localhost:8000/api/user/signup', form);
    navigate('/');
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" id="fname">
        <Form.Label>Họ</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" />
      </Form.Group>
      <Form.Group className="mb-3" id="lname">
        <Form.Label>Tên</Form.Label>
        <Form.Control type="text" placeholder="Enter last name" />
      </Form.Group>
      <Form.Group className="mb-3" id="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          Chúng tôi sẽ không công khai email của bạn
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" id="address">
        <Form.Label>Địa chỉ</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" id="password">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          type={passwordShow ? 'text' : 'password'}
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group className="mb-3" id="Checkbox">
        <Form.Check type="checkbox" checked={togglePassword} label="Hiển thị" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default BasicExample;
