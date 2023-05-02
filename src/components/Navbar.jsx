import { useState } from 'react';
import { Nav, Navbar, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import JoinModal from './Modal/JoinModal';
import LoginModal from './Modal/LoginModal';

function NavComp() {
  
  let navigate = useNavigate(); //페이지 이동을 도와주는 함수 
  const [loginModalOn, setLoginModalOn] = useState(false);
  const [joinModalOn, setJoinModalOn] = useState(false);

  return (
    <>
      <LoginModal show={loginModalOn} onHide={() => setLoginModalOn(false)}></LoginModal>
      <JoinModal show={joinModalOn} onHide={() => setJoinModalOn(false)}></JoinModal>
      <Navbar bg="light" variant="light" style={{'fontSize' : '11.5px'}}> 
        <Container>
          <Navbar.Brand onClick={() => { navigate('/')}} style={{"fontWeight": "700", "cursor" : "pointer"}}>906 Studio</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/best')}}>BEST30</Nav.Link>
              <Nav.Link onClick={() => { navigate('/top')}}>TOP</Nav.Link>
              <Nav.Link onClick={() => { navigate('/pants')}}>PANTS</Nav.Link>
              <Nav.Link onClick={() => { navigate('/dress')}}>DRESS</Nav.Link>
              <Nav.Link onClick={() => { navigate('/bag')}}>BAG</Nav.Link>
              <Nav.Link onClick={() => { navigate('/shoes')}}>SHOES</Nav.Link>
            </Nav>
            <Nav className="ms-auto" style={{color : 'white'}}> 
            {/* <Nav.Link onClick={() => { f.toggleModal }}> Login</Nav.Link> */}
              {/* <Nav.Link onClick={() => { navigate('/join')}}> Join</Nav.Link> */}
              <Nav.Link onClick={() => setLoginModalOn(true) }> Login</Nav.Link>
              <Nav.Link onClick={() => setJoinModalOn(true) }> Join</Nav.Link>
              <Nav.Link onClick={() => { navigate('/mypage')}}> My page</Nav.Link>
              <Nav.Link onClick={() => { navigate('/community')}}> Community</Nav.Link>
              <Nav.Link onClick={() => { navigate('/admin')}}> Admin</Nav.Link>
              <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            <Button text={"Search"}></Button>
          </Form>
            </Nav>
        </Container>
        
      </Navbar>
      </>
    );

}


export default NavComp;