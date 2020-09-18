import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        let { initialTime } = props;

        const type = typeof initialTime;
        initialTime = type === 'string' ? parseInt(initialTime) : initialTime;

        const time = initialTime <= 0 ? 1 : initialTime;
        const { total_seconds, minutes, seconds } = this.getTime(time + 1);

        this.state = {
            timer: total_seconds,
            minutes,
            seconds
        };
    };

    componentDidUpdate(prevProps) {
        const { paused, onComplete, autoPlay, loading } = this.props;
        const { timer } = this.state;

        // start timer when video loading is complete
        if (!loading && prevProps.loading) {
            this.createInterval();
            return;
        }

        // if timer somehow goes negative, clear interval
        if (timer < 0) {
            clearInterval(this.interval);
            return;
        }

        // when timer hits zero, clear interval & run callback
        if (timer === 0) {
            clearInterval(this.interval);

            if (onComplete && autoPlay) {
                setTimeout(() => onComplete(), 1000);
            }
        }

        // playing -> paused
        if (paused && !prevProps.paused) {
            console.log('playing to pause', timer);
            clearInterval(this.interval);
            return;
        }

        // paused -> playing
        if (!paused && prevProps.paused && timer > 0) {
            console.log('paused to playing', timer);
            this.createInterval();
            return;
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    createInterval = () => {
        this.interval = setInterval(() => {
            const { total_seconds, minutes, seconds } = this.getTime(this.state.timer);
            this.setState({
                timer: total_seconds,
                minutes,
                seconds
            })
        }, 1000);
    }

    getTime(time) {
        const total_seconds = time - 1;
        const total_minutes = parseInt(Math.floor(total_seconds / 60));

        let seconds = parseInt(total_seconds % 60);
        let minutes = parseInt(total_minutes % 60);

        // TODO: lots of special cases here that can be cleaned up
        if (minutes === 0) {
            minutes = '00';
        }

        if (seconds === 0) {
            seconds = '00';
        } else if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return { total_seconds, minutes, seconds };
    }

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
