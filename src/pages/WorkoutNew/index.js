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

export default class App extends React.Component {
    state = {
        index: 0,
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

        // don't go below 0
        if (previousIndex < 0) {
            return;
        }

        this.setState({ index: previousIndex });
    }

    onPause = () => this.setState({ paused: !this.state.paused })

    render() {
        const { index, paused } = this.state;
        const { data } = this.props;

        const currentWorkout = data[index];

        console.log('WORKOUT NEW SCREEN', this.props);
        console.log('WORKOUT NEW INDEX', index);
        console.log('WORKOUT CURRENT WORKOUT ', currentWorkout);

        return (
            <View style={styles.container}>

                {currentWorkout.flag === 'note' ? (
                    <NoteScreen />
                ) : currentWorkout.flag === 'circuitComplete' ? (
                    <CircuitComplete />
                ) : currentWorkout.flag === 'rest' ? (
                    <RestScreen isPlaying={!paused} />
                ) : currentWorkout.flag === 'video' ? (
                    <VideoScreen currentWorkout={currentWorkout} paused={paused} />
                ) : null}

                <NavButtons
                    onNext={this.onNext}
                    onPause={this.onPause}
                    onPrevious={this.onPrevious}
                />

                <NewsCell currentWorkout={currentWorkout} />
                <ExerciseTitle currentWorkout={currentWorkout} />
                <LapText currentWorkout={currentWorkout} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
