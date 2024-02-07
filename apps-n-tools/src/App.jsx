import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Switch } from '@mui/material';
import { Container, Grid } from '@mui/material';
import TileCard from './TileCard';
import TopAppBar from './TopAppBar';

function App() {

  // Create a dark theme
  const [darkMode, setDarkMode] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleModeChange = (event) => {
    setDarkMode(event.target.checked);
  };

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming you fetch your data here
        const responses = await Promise.all([
          fetch('data/books.json').then(res => res.json()),
          fetch('data/movies.json').then(res => res.json()),
          fetch('data/videogames.json').then(res => res.json()),
        ]);
        // Flatten the array of arrays into a single array
        const flattenedData = responses.flat();

        setCardData(flattenedData);
      } catch (error) {
        console.error("Failed to fetch card data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopAppBar darkMode={darkMode} setDarkMode={setDarkMode} />
      {/* <Switch checked={darkMode} onChange={handleModeChange} /> */}
      <div className="tile-grid-container">
        <Container>
          <Grid container spacing={4}>
            {cardData.map((data, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <TileCard
                  title={data.title}
                  image={data.image}
                  category={data.category}
                  content={data.content}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
