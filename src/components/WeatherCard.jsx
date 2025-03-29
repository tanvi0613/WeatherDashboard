import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${(props) => (props.theme.darkMode ? "#222" : "#f9f9f9")};
  padding: 20px;
  border-radius: 10px;
  width: 560px;
  display: flex;
  align-items: center;
  gap: 15px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const CityName = styled.h2`
  margin: 0;
`;

const WeatherIcon = styled.img`
  width: 50px;
  height: 50px;
`;

const Temperature = styled.p`
  font-size: 20px;
  margin: 5px 0;
`;

const Details = styled.p`
  font-size: 14px;
  margin: 3px 0;
`;

const RefreshButton = styled.button`
  background-color: ${(props) => (props.theme.darkMode ? "#444" : "#007bff")};
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 8px;
`;

const WeatherCard = ({ weather, refresh}) => {
  return (
    <Card>
      <Image src='/weather.jpg' alt={`${weather.name}`} />
      <Info>
        <CityName>{weather.name}</CityName>
        <WeatherIcon
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <Temperature>{weather.main.temp}°C</Temperature>
        <Details>{weather.weather[0].description}</Details>
        <Details>Humidity: {weather.main.humidity}%</Details>
        <Details>Wind Speed: {weather.wind.speed} km/h</Details>
        <RefreshButton onClick={refresh}>Refresh</RefreshButton>
      </Info>
    </Card>
  );
};

export default WeatherCard;
