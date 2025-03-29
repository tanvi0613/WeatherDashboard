# Weather Dashboard Web App

## Overview
The Weather Dashboard is a React-based web application that allows users to search for weather details of any city. It provides real-time weather information using the OpenWeather API and includes a 5-day forecast. The app also features a dark mode toggle for better user experience.

## Tech Stack
- **Frontend**: React.js, Styled Components, Bootstrap
- **API**: OpenWeather API
- **State Management**: React useState & useEffect
- **Styling**: Styled Components, Bootstrap

## Setup Instructions
### Prerequisites
- Node.js (>= 14.0)
- npm or yarn

### Installation Steps
1. Clone this repository:
   ```sh
   git clone https://github.com/your-username/weather-dashboard.git
   cd weather-dashboard
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenWeather API key:
   ```sh
   VITE_API_KEY=36d22c703fc712eea077949b9d21fdbb
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Integration Details
### OpenWeather API
- Base URL: `https://api.openweathermap.org/data/2.5/`
- Endpoints used:
  - Current Weather: `/weather?q={city}&appid={API_KEY}&units=metric`
  - 5-day Forecast: `/forecast?q={city}&appid={API_KEY}&units=metric`
- **API Key Required**: Yes (Free tier available)
- **Rate Limits**:
  - Free Tier: **60 requests per minute**
  - Paid plans available for higher limits ([Check Pricing](https://openweathermap.org/price))

## Features
- Search weather by city name
- Display current temperature, humidity, and wind speed
- Show a 5-day weather forecast
- Recent search history
- Dark mode toggle
- Responsive design


