import React from 'react';
import { Animated, Dimensions } from 'react-native';
import AllSet from '../../AllSet';
const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    const { CarouselRef, challenge, user, loading, createChallenge, closeCreateNew, createdChallenge } = props;

    const translateY = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 5, width * 6],
        outputRange: [height - 100, 0],
        extrapolate: 'clamp',
    });
    const translateX = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 5, width * 6],
        outputRange: [-width, 0],
        extrapolate: 'clamp',
    });
    const scale = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 5, width * 6],
        outputRange: [0.9, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={{
                transform: [{ translateY }, { translateX }, { scale }],
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <AllSet
                user={user}
                challenge={challenge}
                loading={loading}
                createChallenge={createChallenge}
                closeCreateNew={closeCreateNew}
                createdChallenge={createdChallenge}
            />
        </Animated.View>
    )
}
