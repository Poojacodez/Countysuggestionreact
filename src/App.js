import React, { useEffect, useState } from 'react';
import './App.css'; // Ensure you have some basic styling

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://dpaste.com/79QXDY8TD/raw');
        const data = await response.json();
        setCountries(data); // Store the country data from the fetched JSON
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(value) ||
        country.capital.toLowerCase().includes(value)
    );

    setFilteredCountries(filtered);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (country) => {
    setSearchTerm(country.name);
    setFilteredCountries([country]);
    setShowSuggestions(false);
  };

  return (
    <div style={styles.container}>
      <h1>Country Search</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by country or capital"
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchBar}
        />
        {showSuggestions && filteredCountries.length > 0 && (
          <ul style={styles.suggestionList}>
            {filteredCountries.map((country, index) => (
              <li
                key={index}
                style={styles.suggestionItem}
                onClick={() => handleSuggestionClick(country)}
              >
                {country.name} - {country.capital}
              </li>
            ))}
          </ul>
        )}
        {showSuggestions && filteredCountries.length === 0 && (
          <ul style={styles.suggestionList}>
            <li style={styles.noResults}>No results found</li>
          </ul>
        )}
      </div>
    </div>
  );
};

// Basic styles for UI components
const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  searchContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  searchBar: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  suggestionList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    zIndex: 1,
  },
  suggestionItem: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  },
  suggestionItemHover: {
    backgroundColor: '#f0f0f0',
  },
  noResults: {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    textAlign: 'center',
  },
};

export default App;
