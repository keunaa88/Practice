import React, { useState } from 'react';
import axios from 'axios';
import Dropbox from '../components/Dropbox';
import styled from "styled-components";
import { Form, Button} from 'react-bootstrap';
import './Form.css';
// const Container = styled.div`
//   //width: 100%;
//   overflow: hidden; 
//   display: table;
// `;

function Admin() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
       
        const data = { title, price, category };
      
        axios.post('http://localhost:8080/create', data)
          .then(() => {
            console.log('Data successfully saved');
          })
          .catch((err) => {
            console.error(err);
          });
      };

    return (
        <div className="content">
            {/* <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" min="0"/>
            </Form.Group>
            <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
            <Button variant="primary" type="submit">
                Submit
            </Button>

            </Form>
             */}
            <form className="adminForm" onSubmit={handleSubmit}>
                <div class="field">
                    <label for="title">Title</label>
                    <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div class="field">
                    <label for="price">Price</label>
                    <input
                        type="number"
                        value={price}
                        min="0"
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </div>
                <div class="field">
                    <label for="category">Category</label>
                    <Dropbox select={category} onSelect={setCategory}></Dropbox>
                </div>
                <button type="submit">Save</button>
            </form> 
        </div>
    );
}

export default Admin;