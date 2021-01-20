import React, { Component } from 'react';

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
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            })
    }
    
    render() {
        return (
            <div>
                <h3>{this.roomCode}</h3>
                <p>Votes: {this.state.votesToSkip}</p>
                <p>Guests Can Pause: {this.state.guestCanPause.toString()}</p>
                <p>Host: {this.state.isHost.toString()}</p>
            </div>
        );
    }
}

export default Room;