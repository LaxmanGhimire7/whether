import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import clear from "../images/clear.png"; // Make sure this matches your sun icon path
import cloud from '../images/cloud.png'
import drizzle from '../images/drizzle.png'
import humidity from '../images/humidity.png'
import rain from '../images/rain.png'
import search from '../images/search.png'
import snow from '../images/snow.png'
import wind from '../images/wind.png'



function WeatherCard() {

    const [whether, setWhether] = useState(null);
    const [city, setCity] = useState("")

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow
    }

    const api = import.meta.env.VITE_APP_ID;

    const search = async (city) => {
        
        
        if (city === "") {
            alert("Enter city name");
            return;
        }
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`);
            response = await response.json();
            if (response.cod !== 200) {
                alert("City not found!");
                return;
            }
            const icon = allIcons[response.weather[0].icon] || clear;
            setWhether({
                humidity: response.main.humidity,
                windSpeed: response.wind.speed,
                temperature: Math.floor(response.main.temp),
                location: response.name,
                icon: icon
            })
            console.log(response)

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    useEffect(() => {
        search("Kathmandu")
    }, [])


    return (
        <div className="w-full h-screen bg-purple-200 flex items-center justify-center">
            <div className="bg-gradient-to-br from-indigo-700 to-purple-600 rounded-3xl p-6 w-80 text-white shadow-xl">

                {/* Search Bar */}
                <div className="flex items-center bg-white rounded-full px-4 py-2 mb-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 bg-transparent text-black focus:outline-none"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                        }}
                    />
                    <CiSearch onClick={() => {
                        search(city)
                    }} className="text-gray-700" size={20} />
                </div>

                {whether ? (
                    <>
                        {/* Whether */}
                        <div className="flex justify-center mb-4">
                        <img src={whether.icon} alt="Weather Icon" className="w-20 h-20" />
                        </div>

                        {/* temperature */}
                        <div className="text-center text-5xl font-semibold mb-2">{whether.temperature}°C</div>
                        <div className="text-center text-xl font-light mb-6">{whether.location}</div>

                        {/* Humidity */}
                        <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <img src={humidity} alt="humidity" />
                                <div>
                                    <p>{whether.humidity}%</p>
                                    <span className="text-xs">Humidity</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src={wind} alt="wind" />
                                <div>
                                    <p>{whether.windSpeed} Km/h</p>
                                    <span className="text-xs">Wind Speed</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (<>
                    <div>Loading............</div>
                </>)}

            </div>
        </div>
    );
}

export default WeatherCard;
