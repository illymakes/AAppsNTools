import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popover from '@mui/material/Popover';

const Filter = ({ categories, onFilterChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState(categories.reduce((acc, category) => {
        acc[category] = false;
        return acc;
    }, {}));

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleClickAway = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        const newSelectedFilters = { ...selectedFilters, [name]: checked };
        setSelectedFilters(newSelectedFilters);
        // Ensure onFilterChange is called with the updated state
        onFilterChange(newSelectedFilters);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div>
                <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                    Filter
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClickAway}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    {categories.map((category) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedFilters[category]}
                                    onChange={handleFilterChange}
                                    name={category}
                                />
                            }
                            label={category}
                            key={category}
                        />
                    ))}
                </Popover>
            </div>
        </ClickAwayListener>
    );
};

export default Filter;
