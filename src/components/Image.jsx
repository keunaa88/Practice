
import img from '../assets/img/noImage.jpg';



const Image = ({src, style}) => {

    const handleError = (e) => {
        e.target.onerror = null; 
        e.target.src = img 
    }
    return (
        <img 
            src={src} 
            onError={handleError}
            style={style}
        >
        </img>
    );

};

export default Image;
