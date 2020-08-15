import React from 'react';
import { View, StyleSheet, Animated, Text, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

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
        const { status } = this.props;

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
        const { autoplay, oncomplete } = this.props;
        const { count } = this.state;

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
        const { count } = this.state;
        const { duration } = this.props;

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
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity,
                            transform: [{ translateY }],
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
                            size={180}
                            width={20}
                            fill={fillValue}
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
                <TouchableOpacity style={styles.skipContainer} onPress={() => this.props.onPress()}>
                    <Text style={styles.skip}>Skip Rest</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00a5f9",
        zIndex: -1

    },
    skip: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins-Bold',
        color: '#000',
    },
    skipContainer: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 40,
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
        fontSize: 50,
        lineHeight: 70,
        fontFamily: 'Poppins-Bold',
        color: 'white',
    },
    rest: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        color: 'white',
    },
});
