import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  width: 700px;
  border: 1px solid ${(props) => (props.theme.darkMode ? "#555" : "#ccc")};
  border-radius: 5px;
  background-color: ${(props) => (props.theme.darkMode ? "#333" : "#fff")};
  color: ${(props) => (props.theme.darkMode ? "#fff" : "#000")};
`;

const Button = styled.button`
  padding: 12px 20px;
  margin-left: 12px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: ${(props) => (props.theme.darkMode ? "#444" : "#007bff")};
  color: ${(props) => (props.theme.darkMode ? "#f1f1f1" : "#fff")};
  box-shadow: ${(props) =>
    props.theme.darkMode
      ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
      : "0px 4px 10px rgba(0, 123, 255, 0.3)"};

  &:hover {
    background: ${(props) => (props.theme.darkMode ? "#555" : "#0056b3")};
    box-shadow: ${(props) =>
      props.theme.darkMode
        ? "0px 6px 12px rgba(255, 255, 255, 0.3)"
        : "0px 6px 12px rgba(0, 123, 255, 0.5)"};
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;


const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <SearchContainer>
      <Input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
  );
};

export default SearchBar;
