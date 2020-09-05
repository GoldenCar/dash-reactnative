import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import _ from 'lodash';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import { mediaHost } from '../../config';

import LoadingScreen from './LoadingScreen';
import NavButtons from './NavButtons';
import ExerciseTitle from './ExerciseTitle';
import LapText from './LapText';
import NewsCell from './NewsCell';

export default class App extends React.Component {
    state = {
        index: 0,
        loading: false,
        paused: false
    }

    onNext = () => {
        const { data } = this.props;
        const { index } = this.state;
        const nextIndex = index + 1;

        // if end reached, navigate to Completed page
        if (nextIndex === data.length) {
            Actions.Completed();
            return;
        }

        this.setState({ index: nextIndex });
    }

    onPrevious = () => {
        const { index } = this.state;
        const previousIndex = index - 1;

        // don't go past 0
        if (previousIndex < 0) {
            return;
        }

        this.setState({ index: previousIndex });
    }

    onLoadStart = () => this.setState({ loading: true })

    showVideo = () => {
        console.log('VIDEO READY');
    }

    onPause = () => {
        this.setState({ paused: !this.state.paused, timerPaused: !this.state.paused });
    }

    render() {
        const { index, loading, paused, timerPaused } = this.state;
        const { data } = this.props;

        console.log('WORKOUT NEW SCREEN', this.props);

        console.log('WORKOUT NEW INDEX', index);

        const currentWorkout = data[index];

        console.log('WORKOUT CURRENT WORKOUT ', currentWorkout);



        // TODO: handle this better
        if (_.isEmpty(currentWorkout) || !currentWorkout) {
            this.onNext();
            return null;
        }

        let showVideo = true;
        if (!currentWorkout.fileName) {
            //this.onNext();
            console.log('NO FILE HERE', currentWorkout);
            //return null;

            showVideo = false;
        }

        const source = { uri: encodeURI(`${mediaHost}${currentWorkout.fileName}`) };

        return (
            <View style={styles.container}>
                {/* {(loading && showVideo) && <LoadingScreen />} */}

                {
                    showVideo ? (
                        <Video
                            source={source}
                            // ref={this.videoRef}
                            onLoadStart={this.onLoadStart}
                            onReadyForDisplay={this.showVideo}
                            resizeMode='cover'
                            style={styles.video}
                            repeat={true}
                            paused={paused}
                        />
                    ) : (
                            // TODO: pull this out
                            <View style={styles.rest}>
                                <CountdownCircleTimer
                                    isPlaying={!timerPaused}
                                    duration={30}
                                    colors="gray"
                                    trailColor='#fff'
                                    size={210}
                                    strokeWidth={18}
                                >
                                    {({ remainingTime }) => (
                                        <View>
                                            <Text style={styles.timerText}>
                                                {remainingTime}
                                            </Text>
                                            <Text style={styles.timerSubText}>
                                                Rest
                                        </Text>
                                        </View>
                                    )}
                                </CountdownCircleTimer>
                            </View>
                        )
                }

                <NavButtons
                    onNext={this.onNext}
                    onPause={this.onPause}
                    onPrevious={this.onPrevious}
                />

                <NewsCell currentWorkout={currentWorkout} />
                <ExerciseTitle currentWorkout={currentWorkout} />
                <LapText />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    video: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    },

    rest: {
        flex: 1,
        backgroundColor: '#1AA0FF',
        justifyContent: 'center',
        alignItems: 'center'
    },

    timerText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 56,
        color: '#ffffff'
    },
    timerSubText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        textAlign: 'center'
    }
});
