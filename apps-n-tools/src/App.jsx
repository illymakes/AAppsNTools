import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TileCard from './TileCard';
import TopAppBar from './TopAppBar';
import './index.css';

function App() {

  // Create a dark theme
  const [darkMode, setDarkMode] = useState(true);
  const [cardData, setCardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        item.content.toLowerCase().includes(lowerCaseQuery)) &&
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
        item.content.toLowerCase().includes(searchQuery))
    );
    setFilteredData(filtered);
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
      // Apply Roboto Mono to titles across the app
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      h1: { fontFamily: 'Roboto Mono, monospace' },
      h2: { fontFamily: 'Roboto Mono, monospace' },
      h6: { fontFamily: 'Roboto Mono, monospace' },
      // Add other variants as needed
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
      />
      <div>
        {isMenuOpen && (
          <div className="menuOverlay" onClick={() => setIsMenuOpen(false)}>
            <div className={`slideMenu ${isMenuOpen ? 'open' : ''}`} style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
              <button className="menuCloseButton" onClick={() => setIsMenuOpen(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
        )}
        <div className="tile-grid-container">
          <Container>
            <Grid container spacing={4}>
              {filteredData.map((data, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}
                  style={{ display: "flex", justifyContent: "center" }}>
                  <TileCard
                    darkMode={darkMode}
                    title={data.title}
                    image={data.image}
                    year={data.year}
                    category={data.category}
                    content={data.content}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
