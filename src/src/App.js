import React, { useEffect, useState } from 'react';

// App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch country data from the provided JSON URL when the component loads
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

  // Handle input change and filter countries based on name or capital
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter the countries by matching either name or capital with the search term
    const filtered = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(value) ||
        country.capital.toLowerCase().includes(value)
    );

    setFilteredCountries(filtered);
  };

  return (
    <div style={styles.container}>
      <h1>Country Search</h1>
      <input
        type="text"
        placeholder="Search by country or capital"
        value={searchTerm}
        onChange={handleSearchChange}
        style={styles.searchBar}
      />
      <ul style={styles.suggestionList}>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <li key={index} style={styles.suggestionItem}>
              {country.name} - {country.capital}
            </li>
          ))
        ) : (
          <li style={styles.noResults}>No results found</li>
        )}
      </ul>
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
  searchBar: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    marginBottom: '20px',
  },
  suggestionList: {
    listStyleType: 'none',
    padding: '0',
  },
  suggestionItem: {
    padding: '10px',
    margin: '5px 0',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
  noResults: {
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
};

export default App;
