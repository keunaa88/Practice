import React from 'react';

import img1 from "./../assets/img/1.jpg"; 
import img2 from "./../assets/img/2.jpg";
import img3 from "./../assets/img/3.jpg";
import left from "./../assets/img/left.png";
import right from "./../assets/img/right.png";
import { useRef, useState, useEffect  } from 'react';

import styled from "styled-components";

const IMG = styled.img`
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden; 
  display: table;
`;
const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;


const SliderContainer = styled.div`
  width: 100%;
  display: flex; 
`;

const Slider = styled.div`
  position: absolute;
  width: 100%;
`;

const SliderImg = styled.img`
  position: relative;
  z-Index: 10;
`;



function Carousel()
{

    const TOTAL_SLIDES = 2; // length of Images - 1 (array)
    const slideRef = useRef();
    
// export default function Slider() {
   const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };


  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide]); // currentslide가 변경될때마다 실행


    return (
        <Container >
            <div style = {{'display' : 'table-cell', 'verticalAlign' : 'middle'}}>
                    <Slider style = {{'textAlign' :'left'}} onClick={prevSlide}> 
                        <SliderImg src={left} />
                    </Slider>
                    <Slider style = {{'textAlign' :'right'}} onClick={nextSlide}>
                        <SliderImg src={right}  />
                    </Slider>
            </div>
            <SliderContainer ref={slideRef}>
                <IMG src={img1} />
                <IMG src={img2} />
                <IMG src={img3} />
            </SliderContainer>
        </Container>
    );
}

 

export default Carousel;