import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://location-selector.labs.crio.do";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  async function fetchCountries() {
    try {
      const response = await fetch(`${BASE_URL}/countries`);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  }

  async function fetchStates(countryName) {
    try {
      const response = await fetch(`${BASE_URL}/country=${countryName}/states`);
      const data = await response.json();
      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  }

  async function fetchCities(countryName, stateName) {
    try {
      const response = await fetch(
        `${BASE_URL}/country=${countryName}/state=${stateName}/cities`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }

  function handleCountryChange(event) {
    const countryName = event.target.value;

    setSelectedCountry(countryName);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);

    if (countryName) {
      fetchStates(countryName);
    }
  }

  function handleStateChange(event) {
    const stateName = event.target.value;

    setSelectedState(stateName);
    setSelectedCity("");
    setCities([]);

    if (stateName) {
      fetchCities(selectedCountry, stateName);
    }
  }

  function handleCityChange(event) {
    setSelectedCity(event.target.value);
  }

  return (
    <div className="app">
      <h1>Select Location</h1>

      <div className="dropdown-container">
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option key="select-country" value="">
            Select Country
          </option>

          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option key="select-state" value="">
            Select State
          </option>

          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option key="select-city" value="">
            Select City
          </option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && selectedState && selectedCity && (
        <h2>
          You selected{" "}
          <strong>
            {selectedCity}, {selectedState}, {selectedCountry}
          </strong>
        </h2>
      )}
    </div>
  );
}

export default App;