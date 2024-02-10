import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';;
import stateData from '../stateData.json';

const WeatherDetail = () => {
  const [states, setStates] = useState([]);
  const [tooltipState, setTooltipState] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedStates = await Promise.all(stateData.map(async (state) => {
          try {
            const coordinatesResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${state.stateName}&limit=1&appid=5662d3349444797225ffc23c3868e1e5`);
            const coordinates = coordinatesResponse.data[0];
            const weatherDataResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=5662d3349444797225ffc23c3868e1e5&units=metric`);
            const weatherData = weatherDataResponse.data;
            return { ...state, weather: weatherData };
          } catch (error) {
            console.error('Error fetching weather data:', error);
            return { ...state, weather: null };
          }
        }));
        setStates(updatedStates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMouseOver = (state) => {
    setTooltipState(state);
  };

  const handleMouseOut = () => {
    setTooltipState(null);
  };

  const handleFrameClick = () => {
    navigate('/charts');
  };

  return (
    <div className="h-12 grid grid-cols-3 gap-x-60 gap-y-2 justify-evenly">
      {states.map((state, index) => (
        <div
          key={index}
          className={`relative p-4 border border-gray-400 ${getColorClass(state?.weather?.main?.temp)}`}
          style={{
            width: `${calculateFrameSize(state.population)}px`,
            height: `${calculateFrameSize(state.population)}px`,
            marginBottom: '10px',
            marginRight: index % 4 !== 3 ? '10px' : '0px', 
          }}
          onMouseOver={() => handleMouseOver(state)}
          onMouseOut={handleMouseOut}
          onClick={handleFrameClick}
        >
          <h2 className="text-lg font-semibold">{state.stateName}</h2>
          {tooltipState === state && (
            <div className=" text-black absolute bottom-full left-0 bg-white p-2 shadow-md">
              <p>Population: {state.population}</p>
              {state.weather ? <p>Temperature: {state.weather.main.temp}°C</p> : <p>Temperature: N/A</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const calculateFrameSize = (population) => {
  const scaleFactor = 0.1;
  return Math.sqrt(population) * scaleFactor;
};

const getColorClass = (temperature) => {
  if (temperature >= 30) {
    return 'bg-red-500 text-white';
  } else if (temperature <= 10) {
    return 'bg-blue-500 text-white';
  } else {
    return 'bg-gray-300';
  }
};

export default WeatherDetail;
