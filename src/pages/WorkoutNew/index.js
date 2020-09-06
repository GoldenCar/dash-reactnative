import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import NavButtons from './NavButtons';
import ExerciseTitle from './ExerciseTitle';
import LapText from './LapText';
import NewsCell from './NewsCell';

import NoteScreen from './NoteScreen';
import CircuitComplete from './CircuitComplete';
import RestScreen from './RestScreen';
import VideoScreen from './VideoScreen';
import PauseScreen from './PauseScreen';

export default class App extends React.Component {
    state = {
        index: 0,
        paused: false
    }

    setTimers(nextWorkout) {
        if (nextWorkout.flag === 'circuitComplete') {
            setTimeout(() => this.onNext(), 4000);
        }
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

        const nextWorkout = data[nextIndex];
        this.setTimers(nextWorkout);
    }

    onPrevious = () => {
        const { data } = this.props;
        const { index } = this.state;
        const previousIndex = index - 1;

        // don't go below 0
        if (previousIndex < 0) {
            return;
        }

        this.setState({ index: previousIndex });

        const nextWorkout = data[previousIndex];
        this.setTimers(nextWorkout);
    }

    onPause = () => this.setState({ paused: !this.state.paused })

    render() {
        const { index, paused } = this.state;
        const { data } = this.props;

        const currentWorkout = data[index];
        const { flag, restTime } = currentWorkout;

        console.log('WORKOUT NEW SCREEN', this.props);
        console.log('WORKOUT NEW INDEX', index);
        console.log('WORKOUT CURRENT WORKOUT ', currentWorkout);

        const showButtons = flag !== 'circuitComplete';
        const showContent = !paused && showButtons;

        return (
            <View style={styles.container}>

                {paused ? (
                    <PauseScreen />
                ) : flag === 'note' ? (
                    <NoteScreen />
                ) : flag === 'circuitComplete' ? (
                    <CircuitComplete />
                ) : flag === 'rest' ? (
                    <RestScreen
                        isPlaying={!paused}
                        onComplete={this.onNext}
                        restTime={restTime}
                    />
                ) : flag === 'video' ? (
                    <VideoScreen currentWorkout={currentWorkout} paused={paused} />
                ) : null}

                {showButtons && (
                    <NavButtons
                        onNext={this.onNext}
                        onPause={this.onPause}
                        onPrevious={this.onPrevious}
                        paused={paused}
                    />
                )}

                {showContent && (
                    <>
                        <NewsCell currentWorkout={currentWorkout} />
                        <ExerciseTitle currentWorkout={currentWorkout} />
                        <LapText currentWorkout={currentWorkout} />
                    </>
                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
