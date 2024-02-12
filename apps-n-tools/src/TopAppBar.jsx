import { useState } from 'react';
import { AppBar, Toolbar, Typography, Switch, IconButton, Menu, MenuItem, Checkbox, FormControlLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass, faFilter, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.css';

function TopAppBar({ darkMode, setDarkMode, categories, onFilterChange, onSearchChange }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleFilterMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterMenuClose = () => {
        setAnchorEl(null);
    };

    const handleFilterChange = (event) => {
        const category = event.target.name;
        const isChecked = event.target.checked;
        setSelectedFilters(prev => {
            const newFilters = isChecked ? [...prev, category] : prev.filter(c => c !== category);
            onFilterChange(newFilters);
            return newFilters;
        });
    };

    const toggleSearchBar = () => {
        setShowSearch(prevShowSearch => !prevShowSearch);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearchChange(query);
    };

    const closeSearchBar = () => {
        setShowSearch(false);
        setSearchQuery('');
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <AppBar position="static" className="topAppBar">
            <Toolbar className="topAppBar">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} className="icon" />
                </IconButton>
                <div className={`slide-out-menu ${isMenuOpen ? 'open' : ''}`}>
                    <IconButton onClick={toggleMenu} className="close-btn">
                        <FontAwesomeIcon icon={faTimes} />
                    </IconButton>
                    {/* Menu links */}
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                </div>
                <Typography variant="h6" style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                    <img src="src/assets/rocket-ship-svg.svg" className="logo"></img>AAppsNTools
                </Typography>
                {showSearch ? (
                    <TextField
                        variant="outlined"
                        size="small"
                        autoFocus
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ flexGrow: 1, marginRight: 8, transition: "width 0.5s ease" }}
                    />
                ) : null}
                <IconButton color="inherit" onClick={showSearch ? closeSearchBar : toggleSearchBar}>
                    {showSearch ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />}
                </IconButton>
                <IconButton color="inherit" onClick={handleFilterMenuClick}>
                    <FontAwesomeIcon icon={faFilter} className="icon" />
                </IconButton>
                <Menu
                    id="filter-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleFilterMenuClose}
                >
                    {categories.map(category => (
                        <MenuItem key={category} onClick={(event) => event.stopPropagation()}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedFilters.includes(category)}
                                        onChange={handleFilterChange}
                                        name={category}
                                    />
                                }
                                label={category}
                            />
                        </MenuItem>
                    ))}
                </Menu>
                <IconButton color="inherit">
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                </IconButton>
                <Switch
                    checked={darkMode}
                    onChange={(event) => setDarkMode(event.target.checked)}
                    name="darkModeToggle"
                    color="default"
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: darkMode ? '#fff' : '#000',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: darkMode ? '#bbb' : '#888',
                        },
                        '& .MuiSwitch-thumb': {
                            color: darkMode ? '#fff' : '#c4c4c4',
                        },
                        '& .MuiSwitch-track': {
                            backgroundColor: darkMode ? '#777' : '#bbb',
                        },
                    }}
                />
            </Toolbar>
        </AppBar>
    );
}

TopAppBar.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default TopAppBar;
