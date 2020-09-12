import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import NavButtons from './NavButtons';
import LapText from './LapText';
import NewsCell from './NewsCell';

import NoteScreen from './Screens/NoteScreen';
import CircuitComplete from './Screens/CircuitComplete';
import RestScreen from './Screens/RestScreen';
import VideoScreen from './Screens/VideoScreen';
import PauseScreen from './Screens/PauseScreen';
import Completed from './Completed';
import CircuitPreview from './Screens/CircuitPreview';

class Workout extends React.Component {
    state = {
        index: 0,
        paused: false,
        completed: false
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
            this.setState({ completed: true });
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
        const { index, paused, completed } = this.state;
        const { data, currentDay, day, MyChallenge, user, challenge } = this.props;
        const { plan } = MyChallenge;

        const currentWorkout = data[index];
        const { flag, restTime } = currentWorkout;

        console.log('WORKOUT NEW SCREEN', this.props);
        console.log('WORKOUT NEW INDEX', index);
        console.log('WORKOUT CURRENT WORKOUT ', currentWorkout);

        // TODO: put flag in helper 
        const showButtons = (flag !== 'circuitComplete' && flag !== 'circuitPreview') && !completed;

        // TODO: hide for note, what else?
        const showContent = !paused && showButtons;

        return (
            <View style={styles.container}>

                {completed ? (
                    <Completed currentDay={currentDay} challenge={challenge} user={user} day={day} />
                ) : flag === 'note' ? (
                    <NoteScreen currentWorkout={currentWorkout} />
                ) : flag === 'circuitComplete' ? (
                    <CircuitComplete />
                ) : flag === 'circuitPreview' ? (
                    <CircuitPreview onPress={this.onNext} />
                ) : flag === 'rest' ? (
                    <RestScreen
                        isPlaying={!paused}
                        onComplete={this.onNext}
                        restTime={restTime}
                    />
                ) : flag === 'video' ? (
                    <VideoScreen
                        currentWorkout={currentWorkout}
                        paused={paused}
                        onComplete={this.onNext}
                    />
                ) : null}

                {showContent && (
                    <>
                        <NewsCell currentWorkout={currentWorkout} />
                        <LapText currentWorkout={currentWorkout} />
                    </>
                )}

                {paused && (
                    <PauseScreen currentDay={currentDay} day={day} plan={plan} />
                )}

                {showButtons && (
                    <NavButtons
                        onNext={this.onNext}
                        onPause={this.onPause}
                        onPrevious={this.onPrevious}
                        paused={paused}
                    />
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

export default connect(({ user, MyChallenge }) => ({
    user,
    MyChallenge
}))(Workout);
