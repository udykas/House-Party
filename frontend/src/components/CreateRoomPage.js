import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

class CreateRoomPage extends Component {
    defaultVotes = 2;
    
    constructor(props) {
        super(props)
    
        this.state = {
             guestCanPause: true,
             votesToSkip: this.defaultVotes,
        };
    }
    
    handleVotesChange = (e) => {
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    handleGuestPauseChange = (e) => {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false
        })
    }

    handleRoomSubmit = () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };
        fetch('api/create-room', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
    }
    
    render() {
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} align="center">
                        <Typography component='h4' variant='h4'>
                            Create A Room
                        </Typography>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl component="fieldset">
                            <FormHelperText>
                                <div align="center">
                                    Guest Control of Playback State
                                </div>
                            </FormHelperText>
                            <RadioGroup 
                                row 
                                defaultValue='true' 
                                onChange={this.handleGuestPauseChange}
                            >
                                <FormControlLabel 
                                    value='true' 
                                    control={<Radio color="primary" />} 
                                    label="Play/Pause"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel 
                                    value='false' 
                                    control={<Radio color="secondary" />} 
                                    label="No Control"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <FormControl>
                            <TextField 
                                required={true} 
                                type="number" 
                                onChange={this.handleVotesChange}
                                defaultValue={this.defaultVotes} 
                                inputProps={{
                                    min: 1,
                                    style: { textAlign: "center" },
                                }}
                            />
                            <FormHelperText>
                                <div align='center'>
                                    Votes Required to Skip Song
                                </div>
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button 
                            color="primary" 
                            variant="contained"
                            onClick={this.handleRoomSubmit}
                        >
                            Create a Room
                        </Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button color="secondary" variant="contained" to="/" component={Link}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default CreateRoomPage;