import styled from "styled-components";

const accentColor = "rgb(29, 161, 242)";
const closedColor = "darkred";

const Button = styled.button`
  cursor: pointer;
  background-color: ${props =>
    props.variant === "primary" ? accentColor : "white"};
  background-color: ${props =>
    props.variant === "primary2" ? closedColor : "#13c1ac"};
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  border-color: ${closedColor};
  color: ${props => (props.variant === "primary" ? "#4b4b4b" : "white")};
  display: inline-flex;
  align-items: center;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  justify-content: center;
  width: ${props => (props.width === "button-form" ? "30%" : "auto")};
  min-width: 72px;
  outline-style: none;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  padding: 8px 30px;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  text-decoration: none;
  transition: background-color 0.5s;

  &:hover {
    background-color: ${props =>
      props.variant === "primary"
        ? "rgb(26, 145, 218)"
        : "rgba(29, 161, 242, 0.1)"};
    color: ${props => (props.variant === "primary" ? "white" : accentColor)};
  }
`;

export default Button;
