import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

import Pause from './Icons/Pause';
import Next from './Icons/Next';
import Previous from './Icons/Previous';

const { width } = Dimensions.get('screen');

const NAV_BUTTON_CONTAINER = 224;
const MARGIN = (width - NAV_BUTTON_CONTAINER) / 2;

export default class App extends React.Component {
    render() {
        const { onNext, onPause, onPrevious } = this.props;
        return (
            <View style={styles.navButtons}>
                <TouchableOpacity
                    style={styles.prevButton}
                    onPress={onPrevious}
                >
                    <Previous />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pauseButton}
                    onPress={onPause}
                >
                    <Pause />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={onNext}
                >
                    <Next />
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
        alignItems: 'center'
    },
    prevButton: {
        backgroundColor: 'rgba(33, 41, 61, 0.5)',
        borderRadius: 28,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextButton: {
        backgroundColor: 'rgba(33, 41, 61, 0.5)',
        borderRadius: 28,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
