import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Just shows the time, taking app state time as input prop
const Timer = function (props) {
    return (
        <Text>
            {props.time}
        </Text>
    );
};

// Resets the timer on click and clear the setInterval
// const Reset = function (props) {
//     return (
//         <button onClick={props.onClickReset} className="reset">
//             Reset
// 		</button>
//     );
// };


// Pause/ play button
// class Control extends React.Component {
//     constructor(props) {
//         super(props);
//     };

//     onClickHandler = () => {
//         if (this.props.paused) {
//             this.props.start();
//         }
//         else {
//             this.props.stop();
//         }
//     }

//     render() {
//         return (
//             // <button className={this.props.paused ? "paused" : ""} onClick={this.onClickHandler}>
//             //     {this.props.paused ? "play" : "pause"}
//             // </button>
//         );
//     };
// };


export default class App extends React.Component {
    constructor(props) {
        super(props);

        const type = typeof props.initialTime;
        const initialTime = type === 'string' ? parseInt(props.initialTime) : props.initialTime;

        const time = initialTime <= 0 ? 1 : initialTime;
        this.state = {
            timer: time,
            minutes: '00',
            seconds: '00'
        }
    };

    componentDidMount() {
        this.interval = setInterval(() => {
            const total_seconds = this.state.timer - 1;
            const total_minutes = parseInt(Math.floor(total_seconds / 60));

            let seconds = parseInt(total_seconds % 60);
            let minutes = parseInt(total_minutes % 60);

            if (minutes === 0) {
                minutes = '00';
            }

            if (seconds === 0) {
                seconds = '00';
            }

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            this.setState({
                timer: total_seconds,
                minutes,
                seconds
            });
        }, 1000);
    }

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // tick = () => {
    //     this.setState({ timer: this.state.timer + 1 });
    // }

    // startTimer = () => {
    //     this.interval = setInterval(this.tick, 1000);
    //   //  this.setState({ paused: false });
    // }

    // stopTimer = () => {
    //     clearInterval(this.interval);
    //    // this.setState({ paused: true });
    // }

    // reset = () => {
    //     this.setState({ timer: 0, paused: true });
    //    // clearInterval(this.interval);
    // }

    render() {
        const { minutes, seconds } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.reps}>{minutes}:</Text>
                <Text style={styles.reps}>{seconds}</Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    reps: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        color: '#FFFFFF'
        //text-shadow: 0px 4.50549px 20px rgba(63, 67, 79, 0.35);
    },
});
