import React from 'react';
import { Animated, Dimensions, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import StartDate from '../../StartDate';
const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    const { CarouselRef, onChangeChallenge, onPressNext, challenge } = props;

    const translateY = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 3, width * 4],
        outputRange: [height - 100, 0],
        extrapolate: 'clamp',
    });
    const translateX = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 3, width * 4],
        outputRange: [-width, 0],
        extrapolate: 'clamp',
    });
    const scale = CarouselRef._scrollPos.interpolate({
        inputRange: [width * 3, width * 4],
        outputRange: [0.9, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={{
                transform: [{ translateY }, { translateX }, { scale }],
                flex: 1
            }}>
            <ScrollView>
                <View style={{ paddingTop: 100 }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.itemHeaderText}>It's a date!</Text>
                        <Text style={styles.titles}>
                            When would you like to{'\n'}start the challenge?
                        </Text>
                    </View>
                    <StartDate
                        challenge={challenge}
                        onPress={(startDate) => onChangeChallenge({ startDate })}
                    />
                </View>
            </ScrollView>
            <TouchableWithoutFeedback
                onPress={() => challenge.startDate !== null && onPressNext({})}
            >
                <View
                    style={[
                        styles.nextButton,
                        challenge.startDate === null
                            ? { backgroundColor: '#96AAC6' }
                            : {},
                    ]}>
                    <Text style={styles.nextButtonText}>Confirm Date</Text>
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
