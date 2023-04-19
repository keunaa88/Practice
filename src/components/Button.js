import styled from "styled-components";

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #e1e3e8;
  color: gray;
  background: white;
  color: ${(props) => props.color || "gray"};
  :hover {
    background-color: #e8f4f8;
    transition: 0.7s;
}
`;

function Button({onClick, type, text, color, disabled}) {

    return (
        <>
            <StyledButton type={type} color={color} disabled={disabled} onClick={onClick}>{text}</StyledButton>
        </>
    );
}

export default Button;