import React from 'react';
import Button from '@mui/material/Button';

const Filter = ({ onFilterChange }) => (
  <div>
    <Button onClick={() => onFilterChange('Books')}>Books</Button>
    <Button onClick={() => onFilterChange('Movies')}>Movies</Button>
    <Button onClick={() => onFilterChange('Video Games')}>Video Games</Button>
    {/* Add more buttons for other categories as needed */}
  </div>
);

export default Filter;