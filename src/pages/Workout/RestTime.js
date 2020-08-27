import React from 'react';
import {View, StyleSheet, Animated, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import KeepAwake from 'react-native-keep-awake';


import {ArrowNext} from 'dash/src/components/Icons';

export default class RestTime extends React.Component {
    animation = new Animated.Value(2);
    timer;
    state = {
        count: this.props.duration,
        totalTime: this.props.duration * 1000
    };

    componentDidMount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        Animated.timing(this.animation, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false,
        }).start(() => {
            this.start();
        });
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.status == false && this.timer == "Pause") {
            this.start();
        }
    }

    start = () => {
        const {status} = this.props;

        if (status === true) {
            this.timer = "Pause";
            return null;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.setState(
                (prev) => {
                    return {
                        count: prev.count - 1,
                    };
                },
                () => {
                    if (this.state.count !== 0) {
                        this.start();
                    }
                },
            );
        }, 1000);
    };

    end = () => {
        Animated.timing(this.animation, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
        }).start(() => {
            if (this.props.onEnd) {
                this.props.onEnd();
            }
        });
    };

    complete = () => {
        const {autoplay, oncomplete} = this.props;
        const {count} = this.state;

        // check count ---
        if (count != 0) {
            return null;
        }

        // check if autoplay card ---
        if (autoplay == false) {
            return null;
        }

        // action on complete time ---
        if (oncomplete) {
            Animated.timing(this.animation, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start(() => {
                oncomplete();
            });
        }
    };

    render() {
        const {count} = this.state;
        const {duration} = this.props;

        const opacity = this.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
        });

        const translateY = this.animation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [100, 0, 100],
            extrapolate: 'clamp',
        });

        const fillValue = ((duration - count) / duration) * 100;

        return (
            <Animated.View style={[styles.mainContainer]}>
                <KeepAwake/>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity,
                            transform: [{translateY}],
                        },
                    ]}>
                    <View
                        style={{
                            transform: [
                                {
                                    rotateY: '180deg',
                                },
                            ],
                        }}>
                        <AnimatedCircularProgress
                            size={200}
                            width={20}
                            fill={fillValue}
                            style={{backgroundColor: '#00a5f9'}}
                            rotation={0}
                            // duration={totalTime}
                            tintColor="rgba(255,255,255,1)"
                            backgroundColor="#54c6fb"
                            onAnimationComplete={this.complete}
                        />
                    </View>
                    <View style={styles.innerContainer}>
                        <Text style={styles.count}>{count}</Text>
                        <Text style={styles.rest}>REST</Text>
                    </View>
                </Animated.View>
                {!this.props.taskPaused && (
                    <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
                        <View style={styles.skipContainer}>
                            <Text style={styles.skipButtonText}>Skip</Text><ArrowNext/>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    skipContainer: {
        height: 48,
        width: 97,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 25,
        position: 'absolute',
        right: 15,
        bottom: 40,
    },
    skipButtonText: {
        marginTop: -2,
        marginRight: 11,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 28,
        color: '#000000'
    },
    mainContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00a5f9",
        zIndex: 99,
        height: '100%',
        position: 'absolute'

    },
    skip: {
        alignItems: 'center',
        paddingTop: 3,
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Poppins-Medium',
        color: '#000',
    },
    skipButton: {
        flexDirection: 'row',
        width: 97,
        height: 48,
        justifyContent: 'space-between',
        paddingHorizontal: 23,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50
    },
    innerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(33, 41, 61, 0.4)',
        borderRadius: 115,
    },
    count: {
        fontSize: 56,
        lineHeight: 60,
        fontFamily: 'Poppins-Bold',
        color: 'white',
    },
    rest: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        lineHeight: 16,
        letterSpacing: 1.6,
        color: 'white',
    },
});
