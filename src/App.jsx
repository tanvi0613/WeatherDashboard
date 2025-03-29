import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";

const API_KEY = import.meta.env.VITE_API_KEY;

// Global Styling
const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.theme.darkMode ? "#121212" : "#ffffff")};
    color: ${(props) => (props.theme.darkMode ? "#ffffff" : "#000000")};
    transition: background-color 0.3s ease;
    font-family: Arial, sans-serif;
  }
`;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 10px;
  position: relative;
`;

const Title = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: ${(props) => (props.theme.darkMode ? "#ffffff" : "#333")};
`;

const ThemeWrapper = styled.div`
  margin-left: auto;
`;

const HistoryContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const HistoryLabel = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const HistoryItem = styled.button`
  background: ${(props) => (props.theme.darkMode ? "#444" : "#ffffff")};
  border: 1px solid ${(props) => (props.theme.darkMode ? "#666" : "#ccc")};
  color: ${(props) => (props.theme.darkMode ? "#ffffff" : "#333")};
  cursor: pointer;
  margin: 5px;
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) => (props.theme.darkMode ? "2px 2px 8px rgba(255, 255, 255, 0.1)" : "2px 2px 8px rgba(0, 0, 0, 0.1)")};

  &:hover {
    background: ${(props) => (props.theme.darkMode ? "#555" : "#f8f8f8")};
    color: ${(props) => (props.theme.darkMode ? "#fff" : "#111")};
    transform: scale(1.05);
    box-shadow: ${(props) => (props.theme.darkMode ? "2px 2px 12px rgba(255, 255, 255, 0.2)" : "2px 2px 12px rgba(0, 0, 0, 0.2)")};
  }
`;

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode")) || false);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found!");
      }
      const data = await response.json();
      setWeather(data);
      await fetchForecast(city);

      setHistory((prev) => {
        const updatedHistory = [city, ...prev.filter((c) => c !== city)];
        return updatedHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch forecast");
      }
      const data = await response.json();
      setForecast(data.list.filter((_, index) => index % 8 === 0));
    } catch (err) {
      console.error("Forecast error:", err.message);
    }
  };

  return (
    <ThemeProvider theme={{ darkMode: !!darkMode }}>
      <GlobalStyle />
      <Container>
        {/* Header */}
        <Header>
          <Title>Weather Dashboard</Title>
          <ThemeWrapper>
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </ThemeWrapper>
        </Header>

        {/* Search Bar */}
        <SearchBar onSearch={fetchWeather} />

        {/* Recent Searches */}
        {history.length > 0 && (
          <HistoryContainer>
            <HistoryLabel>Recent Searches:</HistoryLabel>
            {history.map((city, index) => (
              <HistoryItem key={index} onClick={() => fetchWeather(city)}>
                {city}
              </HistoryItem>
            ))}
          </HistoryContainer>
        )}

        {/* Weather Details */}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weather && <WeatherCard weather={weather} refresh={() => fetchWeather(weather.name)} />}
        {forecast.length > 0 && <Forecast forecast={forecast} />}
      </Container>
    </ThemeProvider>
  );
};

export default WeatherApp;
