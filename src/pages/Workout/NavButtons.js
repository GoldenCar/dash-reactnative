import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Pause from './Icons/Pause';
import Next from './Icons/Next';
import Previous from './Icons/Previous';

import Play from './Icons/Play';
import SoundOn from './Icons/SoundOn';
import SoundOff from './Icons/SoundOff';
import List from './Icons/List';

const { width } = Dimensions.get('screen');

const NAV_BUTTON_CONTAINER = 224;
const MARGIN = (width - NAV_BUTTON_CONTAINER) / 2;

export default function Component(props) {
    const { onNext, onPause, onPrevious, paused } = props;

    const [sound, setSound] = useState(true);
    const onSoundPress = () => setSound(!sound);

    // TODO: pull this out into another function
    const leftButton = !paused ? <Previous /> : sound ? <SoundOn /> : <SoundOff />;
    const centerButton = paused ? <Play /> : <Pause />;
    const rightButton = paused ? <List /> : <Next />;

    const backgroundColor = paused ? '#fff' : 'rgba(33, 41, 61, 0.5)';

    const onLeftPress = () => paused ? onSoundPress() : onPrevious();
    const onRightPress = () => paused ? console.log('') : onNext();

    return (
        <View style={styles.navButtons}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor }]}
                onPress={onLeftPress}
            >
                {leftButton}
            </TouchableOpacity>
            <TouchableOpacity style={styles.pauseButton} onPress={onPause}>
                {centerButton}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { backgroundColor }]}
                onPress={onRightPress}
            >
                {rightButton}
            </TouchableOpacity>
        </View>
    );

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
        alignItems: 'center',
        elevation: 2,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        // drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.05))
    }
});
