import React from 'react';
import { View } from 'react-native';

const DOTS = [0, 1, 2, 3];

export default function Buttons(props) {
    const { currentIndex } = props;
    return (
        <View style={styles.dotContainer}>
            {DOTS.map((d, i) => <View style={[styles.dot, currentIndex === i && styles.whiteDot]} />)}
        </View>
    )
}

const styles = {
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 21,
        marginBottom: 29
    },
    dot: {
        width: 6,
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 3,
        marginHorizontal: 3.5
    },
    whiteDot: {
        backgroundColor: '#FFFFFF'
    }
}
