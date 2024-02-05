// src/components/YourCardComponent.js or wherever your card is defined
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import CardStyles from '../cardStyles'; // Adjust the path as needed

const CardComponent = ({ title, description }) => {
  const classes = CardStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        {/* Your card content here */}
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Button variant="outlined" className={classes.button}>
          {description}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
