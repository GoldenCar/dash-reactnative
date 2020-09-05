import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import _ from 'lodash';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';

import { mediaHost } from '../../config';

import LoadingScreen from './LoadingScreen';
import NavButtons from './NavButtons';

export default class App extends React.Component {
    state = {
        index: 0,
        loading: false,
        //loading: true,
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
        this.setState({ paused: !this.state.paused });
    }

    render() {
        const { index, loading, paused } = this.state;
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

        if (!currentWorkout.fileName) {
            this.onNext();
            return null;
        }

        const source = { uri: encodeURI(`${mediaHost}${currentWorkout.fileName}`) };

        // TODO: handle this better
        let title = '';
        if (currentWorkout.cardType === 'exercise' && currentWorkout.title) {
            title = currentWorkout.title;
        }

        let reps = '';
        if (currentWorkout.reps && currentWorkout.repsCount) {
            reps = `${currentWorkout.repsCount} ${currentWorkout.reps}`;
        }

        return (
            <View style={styles.container}>
                {loading && <LoadingScreen />}

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

                <NavButtons
                    onNext={this.onNext}
                    onPause={this.onPause}
                    onPrevious={this.onPrevious}
                />

                { /* TODO: move to component */}
                <View style={styles.news}>
                    <Text style={styles.newsText}>Exercise</Text>
                </View>

                { /* TODO: move to component */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {/* Overhead Single Arm Strict Shoulder Press */}
                        {title}
                    </Text>
                    <Text style={styles.reps}>
                        {/* 20 Reps */}
                        {reps}
                    </Text>
                </View>

                { /* TODO: move to component */}
                <View style={styles.lap}>
                    <Text style={styles.lapText}>
                        Lap 1 of 3
                    </Text>
                </View>
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
    news: {
        backgroundColor: 'rgba(63, 67, 79, 0.4)',
        borderRadius: 4,
        position: 'absolute',
        top: 18,
        left: 17,
        width: 69,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newsText: {
        color: '#ffffff'
    },
    titleContainer: {
        position: 'absolute',
        left: 16,
        right: 16,
        top: 60
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 32,
        color: '#FFFFFF',
        //text-shadow: 0px 4.50549px 20px rgba(63, 67, 79, 0.35),
        marginBottom: 8
    },
    reps: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        color: '#FFFFFF'
        //text-shadow: 0px 4.50549px 20px rgba(63, 67, 79, 0.35);
    },
    lap: {
        height: 16,
        bottom: 16,
        alignSelf: 'center'
    },
    lapText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        color: '#FFFFFF'
    }
});
