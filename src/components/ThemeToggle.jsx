import React from "react";
import styled from "styled-components";

const ToggleButton = styled.button`
  background-color: ${(props) => (props.theme.darkMode ? "#444" : "#e0e0e0")};
  color: ${(props) => (props.theme.darkMode ? "#ffffff" : "#000000")};
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
`;

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <ToggleButton onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </ToggleButton>
  );
}

export default ThemeToggle;