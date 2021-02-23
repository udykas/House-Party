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
             song: {}
        }
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }

    componentDidMount() {
        // This calls the endpoint every second to continually update our song information. This is not optimal, but since Spotify does not currently support web sockets for free and I don't expect many users, this is what I'm going with. If there were a lot more potential users, this would be a terrible solution
        this.interval = setInterval(this.getCurrentSong, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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

    getCurrentSong = () => {
        fetch('/spotify/current-song')
            .then((res) => {
                if (!res.ok) {
                    return {};
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                this.setState({ song: data })
                console.log(data);
            });
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
                {/* {this.state.song} */}
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