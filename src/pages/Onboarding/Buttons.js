import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Buttons(props) {
    const { onNext, onSkip, hideSkip } = props;

    const nextText = props.nextText || 'Next';

    return (
        <>
            <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                <Text style={styles.nextText}>{nextText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                {!hideSkip && <Text style={styles.skipText}>Skip</Text>}
            </TouchableOpacity>
        </>
    )
}

const styles = {
    nextButton: {
        width: 175,
        height: 64,
        backgroundColor: '#FFFFFF',
        // box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.25);
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18
    },
    nextText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#1AA0FF'
    },
    skipText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center'
    }
}
