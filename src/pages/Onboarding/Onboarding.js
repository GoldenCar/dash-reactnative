import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";

import ImageOne from './assets/imageOne.png';

const DOTS = [0, 1, 2, 3];

function getPage(index, setActivePage) {
    const onNext = () => setActivePage(index + 1);
    switch (index) {
        case 0:
            return (
                <View style={styles.page}>
                    <Image source={ImageOne} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Welcome To Dash
                        </Text>
                        <Text style={styles.subtitle}>
                            Participate in challenges and grow with your community. Start your journey today!
                        </Text>
                    </View>
                    <View style={styles.dotContainer}>
                        {DOTS.map(() => <View style={styles.dot} />)}
                    </View>
                    <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                        <Text style={styles.nextText}>Next</Text>
                    </TouchableOpacity>
                    <View style={styles.skipButton}>
                        <Text style={styles.skipText}>Skip</Text>
                    </View>
                </View>
            )
        case 1:
            return (
                <View style={styles.page}>
                    <Text>Page 2</Text>
                </View>
            )
        case 2:
            return (
                <View style={styles.page}>
                    <Text>Page 3</Text>
                </View>
            )
        case 3:
            return (
                <View style={styles.page}>
                    <Text>Page 4</Text>
                </View>
            )
    }

}

function Component(props) {

    const [activePage, setActivePage] = useState(0);

    return (
        <View style={styles.container}>
            {getPage(activePage, setActivePage)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    page: {
        flex: 1,
        // linear-gradient(189.97deg, #007BFF -10.81%, #00A1FF 85.05%)
        backgroundColor: '#00A1FF',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
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
    },
    dotContainer: {
        flexDirection: 'row'
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
    },
    nextButton: {
        width: 175,
        height: 64,
        backgroundColor: '#FFFFFF',
        // box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.25);
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#1AA0FF'
    },
    skipText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#FFFFFF'
    }
});

export default connect(({ }) => ({

}))(Component);
