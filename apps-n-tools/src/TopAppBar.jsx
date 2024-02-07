import { AppBar, Toolbar, Typography, Switch, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass, faFilter, faBars } from '@fortawesome/free-solid-svg-icons';

function TopAppBar({ darkMode, setDarkMode }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                <FontAwesomeIcon icon={faBars} className="icon" /> {/* Menu Icon */}
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {/* logo here too */}
                    AAppsNTools
                </Typography>
                <IconButton color="inherit">
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" /> {/* Faves Icon */}
                </IconButton>
                <IconButton color="inherit">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" /> {/* Search Icon */}
                </IconButton>
                <IconButton color="inherit">
                    <FontAwesomeIcon icon={faFilter} className="icon" /> {/* Filter Icon */}
                </IconButton>
                <Switch
                    checked={darkMode}
                    onChange={(event) => setDarkMode(event.target.checked)}
                    name="darkModeToggle"
                    color="default"
                />
            </Toolbar>
        </AppBar>
    );
}

TopAppBar.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
};

export default TopAppBar;
