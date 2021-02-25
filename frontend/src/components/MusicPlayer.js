import React, { Component } from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PauseIcon from '@material-ui/icons/Pause';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }
  
  // TODO: Add error handling for skip, pause and play song functions
  skipSong = () => {
    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
    };
    fetch('/spotify/skip', requestOptions);
  }
  
  pauseSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
    };
    fetch('/spotify/pause', requestOptions);
  }
  
  playSong = () => {
    const requestOptions = {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
    };
    fetch('/spotify/play', requestOptions);
  }

  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;
    
    return (
      <Card>
        <Grid container align="center">
          <Grid item xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item xs={8}>
            <Typography component="h5" variant="h5" >
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1" >
              {this.props.artist}
            </Typography>
            <div>
              <IconButton>
                { this.props.is_playing ? <PauseIcon onClick={this.pauseSong} /> : <PlayArrowIcon onClick={this.playSong} /> }
              </IconButton>
              <IconButton>
                <SkipNextIcon onClick={this.skipSong} />
              </IconButton>
              {this.props.votes} / {this.props.votes_required}
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }
}

export default MusicPlayer;