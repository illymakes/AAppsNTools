import { useState } from 'react';
import { AppBar, Toolbar, Typography, Switch, IconButton, Menu, MenuItem, Checkbox, FormControlLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass, faFilter, faBars, faTimes, faSortAlphaDown, faSortAlphaUp } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { getFavorites } from './db';

function TopAppBar({ darkMode, setDarkMode, categories, onFilterChange, onSearchChange, toggleMenu, onSortChange, sortOrder }) {
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [favoritesAnchorEl, setFavoritesAnchorEl] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [favorites, setFavorites] = useState([]);

    const handleFilterMenuClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterMenuClose = () => {
        setFilterAnchorEl(null);
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
        onSearchChange('');
    };

    const handleFavoritesClick = async (event) => {
        setFavoritesAnchorEl(event.currentTarget);
        const favs = await getFavorites();
        setFavorites(favs);
    };

    const handleFavoritesClose = () => {
        setFavoritesAnchorEl(null);
    };

    return (
        <AppBar position="static" className="topAppBar">
            <Toolbar className="topAppBar">
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faBars} className="icon" />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                    <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                        <img src="src/assets/rocket-ship-svg.svg" className="logo" alt="Logo"></img>
                        AAppsNTools
                    </a>
                </Typography>
                {showSearch ? (
                    <TextField
                        variant="outlined"
                        size="small"
                        autoFocus
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{
                            flexGrow: 1,
                            marginRight: 8,
                            transition: "width 0.5s ease",
                        }}
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
                    anchorEl={filterAnchorEl}
                    keepMounted
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterMenuClose}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
                            <div
                                onClick={() => onSortChange('asc')}
                                style={{
                                    marginRight: 10, // Add some space between the icons
                                    padding: '2px',
                                    background: sortOrder === 'asc' ? 'rgba(0, 0, 0, 0.3)' : 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faSortAlphaDown}
                                    style={{ color: sortOrder === 'asc' ? '#BB86FC' : undefined, fontSize: '1.1em' }}
                                />
                            </div>
                            <div
                                onClick={() => onSortChange('desc')}
                                style={{
                                    padding: '2px',
                                    background: sortOrder === 'desc' ? 'rgba(0, 0, 0, 0.3)' : 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faSortAlphaUp}
                                    style={{ color: sortOrder === 'desc' ? '#BB86FC' : undefined, fontSize: '1.1em' }}
                                />
                            </div>
                        </div>
                    </div>
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
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" onClick={handleFavoritesClick} />
                </IconButton>
                <Menu
                    id="favorites-menu"
                    anchorEl={favoritesAnchorEl}
                    keepMounted
                    open={Boolean(favoritesAnchorEl)}
                    onClose={handleFavoritesClose}
                >
                    {favorites.length > 0 ? (
                        favorites.map((fav, index) => (
                            <MenuItem key={index} onClick={handleFavoritesClose}>
                                {fav.id} - {fav.category}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem onClick={handleFavoritesClose}>No Favorites</MenuItem>
                    )}
                </Menu>
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
    onSortChange: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
    showSearch: PropTypes.bool.isRequired,
    setShowSearch: PropTypes.func.isRequired,
};

export default TopAppBar;
