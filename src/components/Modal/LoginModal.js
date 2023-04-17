import React, { useState } from "react";
import { Modal, Button, Form, Container } from "react-bootstrap";

const LoginModal = ({ show, onHide }) => {
  return (
   
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button block variant="info" type="button" className="my-3">
                Login
            </Button>
            {/* <HorizontalLine text={"OR"} />
            <GoogleLogin
              render={(renderProps) => {
                return (
                  <Button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    block
                    style={{
                      backgroundColor: "#176BEF",
                      borderColor: "#176BEF",
                    }}
                  >
                    <i className="fab fa-google"></i>&nbsp; Sign Up with Google
                  </Button>
                );
              }}
            /> */}
          </Form>
        </Modal.Body>
      </Container>
    </Modal>
  );
};


export default LoginModal;