import React from "react";
import styled from "styled-components";

const ForecastContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ForecastTitle = styled.h5`
  color: ${(props) => (props.theme.darkMode ? "#ffffff" : "#000000")};
`;

const ForecastList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
`;

const ForecastCard = styled.div`
  background-color: ${(props) => (props.theme.darkMode ? "#333" : "#f9f9f9")};
  color: ${(props) => (props.theme.darkMode ? "#ffffff" : "#000000")};
  padding: 10px;
  border-radius: 10px;
  width: 100px;
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Forecast = ({ forecast }) => {
  return (
    <ForecastContainer>
      <ForecastTitle>5-Day Forecast</ForecastTitle>
      <ForecastList>
        {forecast.map((day, index) => (
          <ForecastCard key={index}>
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <img
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
              alt="forecast"
            />
            <p>{day.main.temp}°C</p>
          </ForecastCard>
        ))}
      </ForecastList>
    </ForecastContainer>
  );
};

export default Forecast;
