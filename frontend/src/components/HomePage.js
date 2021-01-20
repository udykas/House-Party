import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';


class HomePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path='/'>
                            <p>Welcome to the Home Page!</p>
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