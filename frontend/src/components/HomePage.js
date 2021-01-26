import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core"

import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';


class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
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
                        <Route exact path='/'>
                            {this.renderHomePage()}
                        </Route>
                        <Route path='/join' component={RoomJoinPage} />
                        <Route path='/create' component={CreateRoomPage} />
                        <Route path="/room/:roomCode" component={Room} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default HomePage;