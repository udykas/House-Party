import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';

class Room extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
             votesToSkip: 2,
             guestCanPause: false,
             isHost: false,
        }
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }
    
    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((response) => {
                if(!response.ok){
                    this.props.leaveRoomCallback();
                    this.props.history.push('/');
                }
                response.json()
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
            })
            .catch((err) => {
                console.error(err);
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
    
    render() {
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
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={this.leaveRoom}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>

            // <div>
            //     <h3>{this.roomCode}</h3>
            //     <p>Votes: {this.state.votesToSkip}</p>
            //     <p>Guests Can Pause: {this.state.guestCanPause.toString()}</p>
            //     <p>Host: {this.state.isHost.toString()}</p>
            // </div>
        );
    }
}

export default Room;