import './App.css';
import React, { useState, useEffect } from 'react';
import Tile from './components/Tile';
import Filter from './components/Filter';

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({ 'All': true });
  const categories = ['Books', 'Movies', 'Video Games'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = categories.map(category =>
          fetch(`./data/${category.toLowerCase()}.json`).then(response => response.json())
        );

        const data = await Promise.all(dataPromises);
        //flatten the array of arrays and set the tiles states
        setTiles(data.flat());
      } catch (error) {
        console.error('Failed to fetch data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedFilters(filters);
  };

  const filteredTiles =
    tiles.filter(tile => selectedFilters[tile.category] || Object.values(selectedFilters).every(v => !v))
      .map(tile => (
        <Tile
          key={`${tile.category}-${tile.id}`}
          {...tile}
        />
      ));

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} categories={categories} />
      <div>
        {filteredTiles} {/* Just render filteredTiles here */}
      </div>
    </div>
  );
};

export default App;
