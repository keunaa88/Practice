import { Col } from 'react-bootstrap';
import React from 'react';

function Card(props) {


    return (
        <Col>
            <img src={'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} width="80%"/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
            <p>{props.shoes.price}</p>
        </Col>
    );

}

export default Card;
