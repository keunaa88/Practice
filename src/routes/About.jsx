import React from 'react';
import { Outlet } from 'react-router-dom';

function About() {

    return (
        <div>
            <h4>about 페이지</h4>
            <Outlet></Outlet> 
        </div> 
    );
}

export default About;