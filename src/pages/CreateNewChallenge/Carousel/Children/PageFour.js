import React from 'react';
import { Animated, Dimensions, Text, View, TouchableWithoutFeedback } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Access from '../../Access';
const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    const { CarouselRef, onChangeChallenge, onPressNext, challenge } = props;

    const translateY = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 2, width * 3],
        outputRange: [height - 100, 0],
        extrapolate: 'clamp',
    });
    const translateX = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 2, width * 3],
        outputRange: [-width, 0],
        extrapolate: 'clamp',
    });
    const scale = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 2, width * 3],
        outputRange: [0.9, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={[
                styles.contentContainerStyle,
                {
                    transform: [{ translateY }, { translateX }, { scale }],
                    flex: 1,
                },
            ]}>
            <View style={styles.titleContainer}>
                <Text style={styles.itemHeaderText}>Awesome!</Text>
                <Text style={styles.titles}>Who can have access to {'\n'} this Challenge?</Text>
            </View>
            <Access
                challenge={challenge}
                onChangeSwitch={(value) => onChangeChallenge({ public: value })}
            />
            <TouchableWithoutFeedback
                onPress={() => challenge.public !== null && onPressNext({})}>
                <View
                    style={[
                        styles.nextButton,
                        challenge.public === null ? { backgroundColor: '#96AAC6' } : {},
                    ]}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    )
}

const styles = EStyleSheet.create({
    nextButtonText: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 16,
    },
    nextButton: {
        borderRadius: 8,
        width:width - 30,
        position: 'absolute',
        marginHorizontal: 15,
        height:64,
        backgroundColor: '$lightBlue',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 19,
    },
    titles: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 32,
        fontFamily: 'Poppins-Bold',
        paddingHorizontal: 15,
        color: '#292E3A',
    },
    itemHeaderText: {
        fontSize: 16,
        marginBottom: 7,
        color: "#1AA0FF",
        fontFamily: 'Poppins-Bold',
    },
    titleContainer: {
        alignItems: "center",
    },
    contentContainerStyle: {
        backgroundColor: '#F7F9FB',
        paddingBottom: 30,
        height:'100%',
        flexGrow: 1
    },
});
