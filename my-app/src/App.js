import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Tile from './components/Tile';
import Filter from './components/Filter';

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [filter, setFilter] = useState('All');
  const categories = ['Books', 'Movies', 'Video Games'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = categories.map(category =>
          fetch('./components/data/${category.toLowerCase()}.json').then(response => response.json())
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
    setFilter(category);
  };

  return (
    <div>
      <Filter onFilterChange={handleFilterChange} categories={categories} />
      <div>
        {tiles.filter(tile => filter === 'All' || tile.category === filter)
          .map(tile => <Tile key={tile.id} {...tile} />)
        }
      </div >
    </div >
  )
}

export default App;
