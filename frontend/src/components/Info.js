import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBeforeIcon, NavigateNextIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const pages = {
  JOIN: 'pages.join',
  CREATE: 'pages.create',
}

function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  const joinInfo = () => {
    return "Join page";
  }

  const createInfo = () => {
    return "Create page";
  }

  return (
    <Grid container spacing={1} align="center">
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          { page === pages.JOIN ? joinInfo() : createInfo() }
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="contained" to='/' component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default Info;