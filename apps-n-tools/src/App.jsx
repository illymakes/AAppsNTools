import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Grid, Typography, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import TileCard from './TileCard';
import TopAppBar from './TopAppBar';
import Overlay from './Overlay';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Assuming you fetch your data here
      const responses = await Promise.all([
        fetch('data/books.json').then(res => res.json()),
        fetch('data/movies.json').then(res => res.json()),
        fetch('data/videogames.json').then(res => res.json()),
      ]);

      const flattenedData = responses.flat();
      setCardData(flattenedData);
      setFilteredData(flattenedData);

      const categorySet = new Set(flattenedData.map(item => item.category));
      setCategories([...categorySet]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedFilters.length) {
      const filtered = cardData.filter(card => selectedFilters.includes(card.category));
      setFilteredData(filtered);
    } else {
      setFilteredData(cardData);
    }
  }, [selectedFilters, cardData]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = cardData.filter(item =>
      (item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.year.toString().includes(lowerCaseQuery) ||
        item.category.toLowerCase().includes(lowerCaseQuery) ||
        item.shortSummary.toLowerCase().includes(lowerCaseQuery)) &&
      (selectedFilters.length === 0 | selectedFilters.includes(item.category))
    );
    setFilteredData(filtered);
  }, [selectedFilters, cardData, searchQuery]);

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update searchQuery state
  };

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);

    const filtered = cardData.filter(item =>
      (newFilters.length === 0 || newFilters.includes(item.category)) &&
      (item.title.toLowerCase().includes(searchQuery) ||
        item.year.toString().includes(searchQuery) ||
        item.category.toLowerCase().includes(searchQuery) ||
        item.shortSummary.toLowerCase().includes(searchQuery))
    );
    setFilteredData(filtered);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    const sortedData = [...filteredData].sort((a, b) => {
      const stripTitle = (title) => title.replace(/^(the |a )/i, '');
      const titleA = stripTitle(a.title).toUpperCase();
      const titleB = stripTitle(b.title).toUpperCase();
      if (order === 'asc') {
        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
      } else {
        return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
      }
    });
    setFilteredData(sortedData);
  };

  const handleTileClick = (data) => {
    setSelectedData(data);
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
    setSelectedData(null);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode ? {
        // dark mode colors
        primary: { main: '#e0e0e0' },
        background: { default: '#121212', paper: '#101010' },
        text: { primary: '#e0e0e0', secondary: '#bdbdbd' },
      } : {
        // light mode colors
        primary: { main: '#212121' },
        background: { default: '#cfcfcf', paper: '#f2f2f2' },
        text: { primary: '#212121', secondary: '#757575' },
      })
    },
    typography: {
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      h1: { fontFamily: 'RobotoMono Regular, monospace' },
      h2: { fontFamily: 'RobotoMono Regular, monospace' },
      h3: { fontFamily: 'RobotoMono Regular, monospace' },
      h4: { fontFamily: 'RobotoMono Regular, monospace' },
      h5: { fontFamily: 'RobotoMono Regular, monospace' },
      h6: { fontFamily: 'RobotoMono Regular, monospace' },
      // Add other variants as needed
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          maxWidthLg: {
            maxWidth: 'none',
            maxHeight: '80%',
          },
          maxWidthMd: {
            maxWidth: 'none',
            maxHeight: '80%',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255,255,255,0.7)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              borderWidth: '2px',
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#E0E0E0',
            borderColor: 'white',
            '&.Mui-focused': {
              color: 'rgba(255,255,255,0.7)',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: '#E0E0E0',
            borderColor: 'white',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopAppBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        categories={categories}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
        isMenuOpen={isMenuOpen}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
      <div>
        {isMenuOpen && (
          <div className="menuOverlay" onClick={() => setIsMenuOpen(false)}>
            <div className={`slideMenu ${isMenuOpen ? 'open' : ''}`} style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
              <button className="menuCloseButton" onClick={() => setIsMenuOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <Typography variant="h6" style={{ flexGrow: 1, display: "flex", alignItems: "center", marginBottom: "10px", marginTop: "10px" }}>
                <img src="src/assets/rocket-ship-svg.svg" className="logo-menu"></img>AAppsNTools
              </Typography>
              <div className="top-menu-link">
                <a href="#">Link 1</a>
              </div>
              <div className="lower-menu-links">
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
              <div className="bottom-menu-text">
                Made with <FontAwesomeIcon icon={faHeart} /> by illymakes.
              </div>
            </div>
          </div>
        )}
        <Box sx={{ pt: '32px', pb: '32px' }}>
          <Container maxWidth="xl">
            <Grid container spacing={2} justifyContent="center">
              {filteredData.map((data, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2.4} sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexBasis: 'calc(20% - 16px)',
                }}>
                  <TileCard
                    darkMode={darkMode}
                    title={data.title}
                    image={data.image}
                    year={data.year}
                    category={data.category}
                    shortSummary={data.shortSummary}
                    key={data.id}
                    onClick={() => handleTileClick(data)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </div>
      <Overlay open={overlayOpen} onClose={closeOverlay} data={selectedData || {}} />
    </ThemeProvider>
  );
}

export default App;
