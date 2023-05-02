import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import Carousel from '../../components/Carousel'
import Card from '../../components/Card';
import data from '../../data.js';


function Home() {
  // let [shoes, setShoes] = useState(data);

    return (
        <>
            <Carousel />
            <div className="content">
                <div>dddd</div>
                <div>dddd</div>
                <div>dddd</div>
            </div>
        </>
    )
}

export default Home;
