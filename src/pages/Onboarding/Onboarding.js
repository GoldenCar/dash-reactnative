import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

import ImageOne from './assets/imageOne.png';
import ImageTwo from './assets/imageTwo.png';
import ImageThree from './assets/imageThree.png';

import Buttons from './Buttons';
import Circles from './Circles';
import Content from './Content';

const PAGES = [
    {
        image: ImageOne,
        title: 'Welcome To Dash',
        subtitle: 'Participate in challenges and grow with your community. Start your journey today!'
    },
    {
        image: ImageTwo,
        title: 'Create Challenges',
        subtitle: 'Challenge friends and family. Build your own challenge, set unique goals, and complete tasks.'
    },
    {
        image: ImageThree,
        title: 'Explore Challenges',
        subtitle: 'Join our community challenges hosted by Dash and your favorite influencers.'
    },
    {
        // TODO: get correct image 4
        image: ImageOne,
        title: 'Like, Comment, Share',
        subtitle: 'Track your progress and keep each other accountable in the challenge social feed.',
        nextText: 'Get Started!',
        hideSkip: true
    }
]

function Component() {
    const [activePage, setActivePage] = useState(0);

    const onNext = () => setActivePage(activePage + 1);
    const onSkip = () => {
        AsyncStorage.setItem('hasUserSeenOnboarding', 'true');
        Actions.MyChallenges();
    };

    const page = PAGES[activePage];
    const { image, title, subtitle, nextText, hideSkip } = page;

    // if it's the last page, use onSkip instead
    const onNextPress = activePage === 3 ? onSkip : onNext;

    return (
        <View style={styles.page}>
            <Content
                image={image}
                title={title}
                subtitle={subtitle}
            />
            <Circles currentIndex={activePage} />
            <View>
                <Buttons onSkip={onSkip} onNext={onNextPress} nextText={nextText} hideSkip={hideSkip} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        // linear-gradient(189.97deg, #007BFF -10.81%, #00A1FF 85.05%)
        backgroundColor: '#00A1FF',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default connect(({ }) => ({

}))(Component);
