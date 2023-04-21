import styled from "styled-components";

const ConfirmButton = styled.button`
    font-weight: bold;
    outline: none;
    border: none;
    background-color: black;
    color: white;
    border-radius: 8px;
    padding: 0px 1.25rem;
    height: 2.5rem;
    font-size: 1rem;
    font-weight: 600;
}
`

const CancelButton = styled.button`
    outline: none;
    border: none;
    background: rgb(233, 236, 239);
    color: rgb(73, 80, 87);
    border-radius: 8px;
    padding: 0px 1.25rem;
    height: 2.5rem;
    font-size: 1rem;
    font-weight: 600;
    margin-right: 1rem;
`;

function Button({onClick, styleType, type, text, color, bgColor, disabled}) {

    return (
        <> 
            { styleType == "confirm" ?
                <ConfirmButton type={type} disabled={disabled} onClick={onClick}>{text}</ConfirmButton>
                :
                <CancelButton type={type} disabled={disabled} onClick={onClick}>{text}</CancelButton>
            }
        </>
    );
}

export default Button;