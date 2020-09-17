import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";

import ImageOne from './assets/imageOne.png';
import ImageTwo from './assets/imageTwo.png';
import ImageThree from './assets/imageThree.png';

const DOTS = [0, 1, 2, 3];

function getPage(index, setActivePage) {
    const onNext = () => setActivePage(index + 1);
    const onEnd = () => Actions.MyChallenges();

    // TODO: remove duplication

    switch (index) {
        case 0:
            return (
                <View style={styles.page}>
                    <View>
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
                            {DOTS.map((d, i) => <View style={[styles.dot, index === i && styles.whiteDot]} />)}
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                            <Text style={styles.nextText}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.skipButton} onPress={onEnd}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        case 1:
            return (
                <View style={styles.page}>
                    <View>
                        <Image source={ImageTwo} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>
                                Create Challenges
                        </Text>
                            <Text style={styles.subtitle}>
                                Challenge friends and family. Build your own challenge, set unique goals, and complete tasks.
                        </Text>
                        </View>
                        <View style={styles.dotContainer}>
                            {DOTS.map((d, i) => <View style={[styles.dot, index === i && styles.whiteDot]} />)}
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                            <Text style={styles.nextText}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.skipButton} onPress={onEnd}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        case 2:
            return (
                <View style={styles.page}>
                    <View>
                        <Image source={ImageThree} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>
                                Explore Challenges
                        </Text>
                            <Text style={styles.subtitle}>
                                Join our community challenges hosted by Dash and your favorite influencers.
                        </Text>
                        </View>
                        <View style={styles.dotContainer}>
                            {DOTS.map((d, i) => <View style={[styles.dot, index === i && styles.whiteDot]} />)}
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.nextButton} onPress={onNext}>
                            <Text style={styles.nextText}>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.skipButton} onPress={onEnd}>
                            <Text style={styles.skipText}>Skip</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        case 3:
            return (
                <View style={styles.page}>
                    <View>
                        <Image source={ImageOne} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>
                                Like, Comment, Share
                        </Text>
                            <Text style={styles.subtitle}>
                                Track your progress and keep each other accountable in the challenge social feed.
                        </Text>
                        </View>
                        <View style={styles.dotContainer}>
                            {DOTS.map((d, i) => <View style={[styles.dot, index === i && styles.whiteDot]} />)}
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.nextButton} onPress={onEnd}>
                            <Text style={styles.nextText}>Get Started!</Text>
                        </TouchableOpacity>
                        <View style={styles.skipButton}>
                            <Text style={styles.skipText}></Text>
                        </View>
                    </View>
                </View>
            )
        default:
            return null;
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
        justifyContent: 'space-around',
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
    },
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
});

export default connect(({ }) => ({

}))(Component);
