import React from 'react';
import { Animated, Dimensions, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Graphic from '../../Graphic';
const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    const { CarouselRef, onChangeChallenge, onPressNext, challenge } = props;

    const translateY = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 4, width * 5],
        outputRange: [height - 100, 0],
        extrapolate: 'clamp',
    });
    const translateX = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 4, width * 5],
        outputRange: [-width, 0],
        extrapolate: 'clamp',
    });
    const scale = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 4, width * 5],
        outputRange: [0.9, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={{
                transform: [{ translateY }, { translateX }, { scale }],
                flex: 1,
            }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.contentContainerStyle,
                    { paddingHorizontal: 7.5, paddingBottom: 60 },
                ]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.itemHeaderText}>Lookin' good!</Text>
                    <Text style={styles.titles}>Choose a header for {'\n'} your challenge:</Text>
                </View>
                <Graphic
                    challenge={challenge}
                    onPress={(graphic) => {
                        onChangeChallenge({ graphic });
                    }}
                />
            </ScrollView>
            <TouchableWithoutFeedback
                onPress={() =>
                    challenge.graphic !== null && onPressNext({})
                }>
                <View
                    style={[
                        styles.nextButton,
                        challenge.graphic === null
                            ? { backgroundColor: '#96AAC6' }
                            : {},
                    ]}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    )
}

const styles = EStyleSheet.create({
    contentContainerStyle: {
        backgroundColor: '#F7F9FB',
        paddingBottom: 30,
        flexGrow: 1
    },
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
        backgroundColor: '#1AA0FF',
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
});
