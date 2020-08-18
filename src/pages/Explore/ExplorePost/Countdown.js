import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import { RText } from '../../shared';

class Countdown extends Component {
constructor(props) {
    super(props);
    this.state ={
        timer: props.initialTime
    }

    // let total_minutes = parseInt(Math.floor(props.initialTime / 60));
    // let total_hours = parseInt(Math.floor(total_minutes / 60));
    // let days = parseInt(Math.floor(total_hours / 24));
  
    // let seconds = parseInt(props.initialTime % 60);
    // let minutes = parseInt(total_minutes % 60);
    // let hours = parseInt(total_hours % 24);

    // console.log('days', days);
    // console.log('hours', hours);
    // console.log('minutes', minutes);
    // console.log('seconds', seconds);
  }

  componentDidMount(){
    this.interval = setInterval(
      () => {
          //this.setState((prevState)=> ({ timer: prevState.timer - 1 }))

          const total_seconds = this.state.timer - 1;

          let total_minutes = parseInt(Math.floor(total_seconds / 60));
          let total_hours = parseInt(Math.floor(total_minutes / 60));
          let days = parseInt(Math.floor(total_hours / 24));
        
          let seconds = parseInt(total_seconds % 60);
          let minutes = parseInt(total_minutes % 60);
          let hours = parseInt(total_hours % 24);
      
          console.log('days', days);
          console.log('hours', hours);
          console.log('minutes', minutes);
          console.log('seconds', seconds);

          this.setState({ 
            //timer: seconds,
            //timer: seconds,
            timer: total_seconds,
            days,
            hours,
            minutes,
            seconds
          })

        },
      1000
    );
  }

  componentDidUpdate(){
    if(this.state.timer === 1){ 
      console.log("-------------------timer count down is leaking")
      clearInterval(this.interval);
     // this.props.onTimerElapsed()
    }
  }

  componentWillUnmount(){
   clearInterval(this.interval);
   //this.props.onTimerElapsed()
  }

  render() {
    return (
        <>
            <Text style={this.props.style}> {this.state.timer} </Text>
            <Text>Days {this.state.days}</Text>
            <Text>Hours {this.state.hours}</Text>
            <Text>Minutes {this.state.minutes}</Text>
            <Text>Seconds {this.state.seconds}</Text>
        </>
    )
  }
}

export default Countdown;