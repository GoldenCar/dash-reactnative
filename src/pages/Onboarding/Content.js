import React from 'react';
import { View, Image, Text } from 'react-native';

export default function Buttons(props) {
    const { image, title, subtitle } = props;
    return (
        <View>
            <Image source={image} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>
        </View>
    )
}

const styles = {
    image: {
        height: 304,
        marginBottom: 30
    },
    textContainer: {
        marginHorizontal: 36
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 32,
        color: '#FFFFFF',
        marginBottom: 8,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        lineHeight: 28,
        color: '#FFFFFF',
        textAlign: 'center'
    }
}
