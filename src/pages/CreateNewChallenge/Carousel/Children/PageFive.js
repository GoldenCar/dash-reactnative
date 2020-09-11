import React from 'react';
import { Animated, Dimensions, Text, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import StartDate from '../../StartDate';
const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    let animation = new Animated.Value(100);
    const { CarouselRef, onChangeChallenge, onPressNext, challenge } = props;

    const hideHeader = () => {
        Animated.timing(animation, {
            toValue: -100,
            duration: 500,
            useNativeDriver: true,
        }).start()
    }

    const showHeader = (y) => {
        if (y < 10) {
            Animated.timing(animation, {
                toValue: 100,
                duration: 500,
                useNativeDriver: true,
            }).start()
        }
    }

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
            <Animated.View style={{ marginTop: animation }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.itemHeaderText}>It's a date!</Text>
                    <Text style={styles.titles}>
                        When would you like to{'\n'}start the challenge?
                    </Text>
                </View>
                <View style={styles.weekContainer}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',].map((val) => (
                        <Text style={styles.weekDay} key={val}>
                            {val}
                        </Text>
                    ))}
                </View>
            </Animated.View>
            <ScrollView onScrollEndDrag={(e) => showHeader(e.nativeEvent.contentOffset.y)} onScrollBeginDrag={hideHeader}>
                <StartDate
                    challenge={challenge}
                    onPress={(startDate) => onChangeChallenge({ startDate })}
                />
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
    weekDay: {
        width: 35,
        textAlign: 'center',
        color: '#292E3A',
        fontFamily: 'Poppins-Bold',
    },
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    nextButtonText: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: 16,
    },
    nextButton: {
        borderRadius: 8,
        width: width - 30,
        position: 'absolute',
        marginHorizontal: 15,
        height: 64,
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
