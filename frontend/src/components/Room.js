import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

import CreateRoomPage from './CreateRoomPage';

class Room extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
             votesToSkip: 2,
             guestCanPause: false,
             isHost: false,
             showSettings: false,
             spotifyAuthenticated: false,
        }
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }
    
    getRoomDetails = () => {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((response) => {
                if(!response.ok){
                    this.props.leaveRoomCallback();
                    this.props.history.push('/');
                }
                return response.json()
            })
            .then((data) => {
                if(!data) {
                    return null
                }
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
                this.state.isHost ? this.authenticateSpotify() : null;
            })
            .catch((err) => {
                console.error(err);
            })
    }

    authenticateSpotify = () => {
        fetch('/spotify/is-authenticated')
            .then((res) => res.json())
            .then((data) => {
                this.setState({ spotifyAuthenticated: data.status })
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then((res) => res.json())
                        .then((data) => {
                            // redirect to spotify auth page
                            window.location.replace(data.url);
                        })
                }
            })
    }

    leaveRoom = () => {
        const requestoptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
        }
        fetch('/api/leave-room', requestoptions)
            .then((res) => {
                this.props.leaveRoomCallback();
                this.props.history.push('/');
            })
    }

    updateShowSettings = () => {
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    renderSettings = () => {
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <CreateRoomPage 
                        update={true} 
                        votesToSkip={this.state.votesToSkip}  
                        guestCanPause={this.state.guestCanPause}
                        roomCode={this.roomCode}
                        updateCallback={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={this.updateShowSettings}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        )
    }

    renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={this.updateShowSettings}>
                    Settings
                </Button>
            </Grid>
        );
    }
    
    render() {
        if(this.state.showSettings) {
            return this.renderSettings();
        }

        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        Guests Can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" component="h6">
                        Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={this.leaveRoom}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default Room;