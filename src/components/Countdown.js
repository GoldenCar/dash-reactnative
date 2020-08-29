import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('screen');

const TITLE_WIDTH = 186;
const CONTAINER_MARGIN = 32;
const CENTERED_MARGIN = (width - (TITLE_WIDTH + CONTAINER_MARGIN)) / 2;

class Countdown extends Component {
    constructor(props) {
        super(props);
        const time = props.initialTime <= 0 ? 1 : props.initialTime;
        this.state = {
            timer: time,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    componentDidMount() {
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

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { days, hours, minutes, seconds } = this.state;
        const { showButton, countdownBackground, containerStyle, centerTitle, onPress } = this.props;

        return (
            <View style={[styles.countdownContainer, containerStyle]}>
                <View style={[styles.countdownTitleContainer, centerTitle && { left: CENTERED_MARGIN }]}>
                    <Text style={styles.countdownTitle}>
                        Challenge Starts in:
                    </Text>
                </View>
                <View style={styles.countdownContent}>
                    <View style={[styles.countdown, countdownBackground]}>
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
                    {showButton && (
                        <TouchableOpacity
                            style={styles.joinButton}
                            onPress={onPress}
                        >
                            <Text style={styles.joinText}>
                                Join
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    countdownContainer: {
        height: 115,
        backgroundColor: '#1AA0FF',
        //box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.25);
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
    },
    countdownTitleContainer: {
        position: 'absolute',
        left: 16,
        top: -20,
        justifyContent: 'center',
        width: 186,
        height: 37,
        backgroundColor: '#FFFFFF',
    },
    countdownTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        lineHeight: 16,
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#1AA0FF'
    },
    countdownContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    joinButton: {
        width: 89,
        height: 48,
        backgroundColor: '#FFFFFF',
        //box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.11);
        borderRadius: 8,
        justifyContent: 'center'
    },
    joinText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        color: '#1AA0FF'
    },
    countdown: {
        flex: 1,
        width: 216,
        height: 48,
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
