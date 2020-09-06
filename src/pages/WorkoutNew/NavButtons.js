import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Pause from './Icons/Pause';
import Next from './Icons/Next';
import Previous from './Icons/Previous';

import Play from './Icons/Play';
import SoundOn from './Icons/SoundOn';
import List from './Icons/List';

const { width } = Dimensions.get('screen');

const NAV_BUTTON_CONTAINER = 224;
const MARGIN = (width - NAV_BUTTON_CONTAINER) / 2;

export default class App extends React.Component {
    render() {
        const { onNext, onPause, onPrevious, paused } = this.props;

        const leftButton = paused ? <SoundOn /> : <Previous />;
        const centerButton = paused ? <Play /> : <Pause />;
        const rightButton = paused ? <List /> : <Next />;

        const backgroundColor = paused ? '#fff' : 'rgba(33, 41, 61, 0.5)';

        // TODO: add correct sound on and sound off button

        return (
            <View style={styles.navButtons}>
                <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPrevious}>
                    {leftButton}
                </TouchableOpacity>
                <TouchableOpacity style={styles.pauseButton} onPress={onPause}>
                    {centerButton}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onNext}>
                    {rightButton}
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navButtons: {
        position: 'absolute',
        left: MARGIN,
        right: MARGIN,
        bottom: 61,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: NAV_BUTTON_CONTAINER
    },
    pauseButton: {
        width: 80,
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    button: {
        borderRadius: 28,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
