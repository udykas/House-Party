import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core"

import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import Info from './Info';


class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             roomCode: null,
        }
    }

    async componentDidMount() {
        fetch('/api/user-in-room')
            .then((res) => res.json())
            .then((data) => { this.setState({ roomCode: data.code }) });
    }

    clearRoomCode = () => {
        this.setState({
            roomCode: null,
        })
    }

    renderHomePage = () => {
        return (
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography variant="h3" compact="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to='/join' component={ Link }>
                            Join a Room
                        </Button>
                        <Button color="default" to='/info' component={ Link }>
                            Info
                        </Button>
                        <Button color="secondary" to='/create' component={ Link }>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }
    
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route 
                            exact path='/' 
                            render={() => {
                                return this.state.roomCode ? (
                                    <Redirect to={`/room/${this.state.roomCode}`} />
                                ) : 
                                    this.renderHomePage()
                        }} />
                        <Route path='/join' component={RoomJoinPage} />
                        <Route path='/info' component={Info} />
                        <Route path='/create' component={CreateRoomPage} />
                        <Route 
                            path="/room/:roomCode" 
                            render={(props) => {
                                return <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                            }} 
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default HomePage;