import React from 'react';
import Form from 'react-bootstrap/Form';

const Profile = () => {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control
          type="file"
          inputProps={{
            accept: 'image/*',
          }}
          size="sm"
        />
      </Form.Group>
    </>
  );
};
export default Profile;
