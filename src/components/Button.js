import styled from "styled-components";

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid #c1e1ec;
  color: gray;
  background: white;
  color: ${(props) => props.color || "gray"};
  :hover {
    background-color: #e8f4f8;
    transition: 0.7s;
}
`;

function Button({text, color, disabled}) {

    return (
        <>
            <StyledButton color={color} disabled={disabled}>{text}</StyledButton>;
        </>
    );
}

export default Button;