import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: props.initialTime
        }
    }

    componentDidMount(){
        this.interval = setInterval(() => {
            const total_seconds = this.state.timer - 1;

            const total_minutes = parseInt(Math.floor(total_seconds / 60));
            const total_hours = parseInt(Math.floor(total_minutes / 60));
            const days = parseInt(Math.floor(total_hours / 24));
            
            const seconds = parseInt(total_seconds % 60);
            const minutes = parseInt(total_minutes % 60);
            const hours = parseInt(total_hours % 24);
    
            this.setState({ 
                timer: total_seconds,
                days,
                hours,
                minutes,
                seconds
            });

        }, 1000);
    }

    componentDidUpdate(){
        if (this.state.timer === 0) { 
            clearInterval(this.interval);
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;
        return (
            <View style={styles.countdown}>
                <View>
                    <Text style={styles.columnValue}>{days}</Text>
                    <Text style={styles.columnLabel}>Days</Text>
                </View>
                <View>
                    <Text style={styles.columnValue}>{hours}</Text>
                    <Text style={styles.columnLabel}>Hour</Text>
                </View>
                <View>
                    <Text style={styles.columnValue}>{minutes}</Text>
                    <Text style={styles.columnLabel}>Mins</Text>
                </View>
                <View>
                    <Text style={styles.columnValue}>{seconds}</Text>
                    <Text style={styles.columnLabel}>Secs</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    countdown: {
        width: 216,
        height: 48,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    columnValue: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    columnLabel: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        lineHeight: 16,
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        opacity: 0.7
    },
});

export default Countdown;
