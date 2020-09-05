import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import Video from 'react-native-video';

import { mediaHost } from '../../config';

import LoadingScreen from './LoadingScreen';

export default class App extends React.Component {
    state = {
        index: 0,
        loading: false
        //loading: true
    }

    onNext = () => {
        const { index } = this.state;
        const nextIndex = index + 1;
        this.setState({ index: nextIndex });
    }

    onLoadStart = () => this.setState({ loading: true })

    showVideo = () => {
        console.log('VIDEO READY');
    }

    render() {
        const { index, loading } = this.state;
        const { data } = this.props;

        console.log('WORKOUT NEW SCREEN', this.props);

        console.log('WORKOUT NEW INDEX', index);

        const currentWorkout = data[index];

        console.log('WORKOUT CURRENT WORKOUT ', currentWorkout);

        if (_.isEmpty(currentWorkout) || !currentWorkout) {
            this.onNext();
            return null;
        }

        if (!currentWorkout.fileName) {
            this.onNext();
            return null;
        }

        const source = { uri: encodeURI(`${mediaHost}${currentWorkout.fileName}`) };

        return (
            <View style={styles.container}>
                {loading && <LoadingScreen />}

                <Video
                    source={source}
                    // ref={this.videoRef}
                    // paused={videoPaused}
                    onLoadStart={this.onLoadStart}
                    onReadyForDisplay={this.showVideo}
                    resizeMode='cover'
                    style={styles.video}
                    repeat={true}
                />

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={this.onNext}
                >
                    <Text>Next {index}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    nextButton: {
        backgroundColor: 'green',
        position: 'absolute',
        right: 20,
        bottom: 20,
        height: 50,
        width: 100
    },
    video: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    },
    loading: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
