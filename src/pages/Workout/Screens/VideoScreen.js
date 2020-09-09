import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

import LoadingScreen from './LoadingScreen';
import CountDownAnimation from '../CountDownAnimation';
import ExerciseTitle from '../ExerciseTitle';

import { mediaHost } from '../../../config';

export default class App extends React.Component {
    state = {
        loading: true,
        animationRunning: true
    }

    componentDidUpdate(prevProps) {
        // TODO: use workout id instead of fileName?
        if (this.props.currentWorkout.fileName !== prevProps.currentWorkout.fileName) {
            this.setState({ animationRunning: true });
        }
    }

    setLoading = (loading) => this.setState({ loading })

    render() {
        const { loading, animationRunning } = this.state;
        const { currentWorkout, paused, onComplete } = this.props;

        const uri = encodeURI(`${mediaHost}${currentWorkout.fileName}`);
        const source = { uri };

        return (
            <>
                <View style={{ backgroundColor: 'black', flex: 1 }}>
                    {(loading && !animationRunning) && <LoadingScreen />}

                    <Video
                        source={source}
                        // ref={this.videoRef}
                        onLoadStart={() => this.setLoading(true)}
                        onReadyForDisplay={() => this.setLoading(false)}
                        resizeMode='cover'
                        style={styles.video}
                        repeat={true}
                        paused={paused || animationRunning}
                    />

                    {animationRunning && (
                        <View style={styles.countDownContainer}>
                            <CountDownAnimation
                                onEnd={() => this.setState({ animationRunning: false })}
                            />
                        </View>
                    )}

                    <ExerciseTitle
                        currentWorkout={currentWorkout}
                        paused={paused}
                        onComplete={onComplete}
                        loading={loading}
                    />
                </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    video: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    },
    countDownContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        //zIndex: 30,
    },
});
