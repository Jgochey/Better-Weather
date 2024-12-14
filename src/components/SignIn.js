import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <Image style={{ width: '100%' }} src="/images/logo.ico" />
      <Button type="button" size="lg" style={{ width: '400px', height: '100px', alignSelf: 'center', background: '#bc6c25', borderColor: '#bc6c25', fontSize: '35px' }} className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
