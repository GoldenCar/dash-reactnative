import React from 'react';
import { Animated, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Title from '../../Title';
import Description from '../../Description';

const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    const { challenge, CarouselRef, TitleRef, onChangeChallenge, onPressNext } = props;

    const translateY = CarouselRef._scrollPos.interpolate({
        inputRange: [width, width * 2],
        outputRange: [height - 100, 0],
        extrapolate: 'clamp',
    });
    const translateX = CarouselRef._scrollPos.interpolate({
        inputRange: [width, width * 2],
        outputRange: [-width, 0],
        extrapolate: 'clamp',
    });
    const scale = CarouselRef._scrollPos.interpolate({
        inputRange: [width, width * 2],
        outputRange: [0.9, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View
            style={[
                {
                    transform: [{ translateY }, { translateX }, { scale }],
                    flex: 1,
                },
            ]}>
            <ScrollView contentContainerStyle={[styles.contentContainerStyle, { flexGrow: 1 }]}>
                <View>

                    <View style={styles.titleContainer}>
                        <Text style={styles.itemHeaderText}>Perfect!</Text>
                        <Text style={styles.titles}>Just a few more {'\n'} small details</Text>
                    </View>
                    <Title
                        //ref={(e) => (TitleRef = e)}
                        challenge={challenge}
                        onChangeText={(title) => onChangeChallenge({ title })}
                    />
                    <Description
                        challenge={challenge}
                        onChangeText={(description) => onChangeChallenge({ description })
                        }
                    />
                </View>
            </ScrollView>
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.bottomConfirmBox} onPress={() => onPressNext({})}>
                    <Text style={styles.confirmPlanText}>Next</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = EStyleSheet.create({
    contentContainerStyle: {
        backgroundColor: '#F7F9FB',
        paddingBottom: 30,
        flexGrow: 1
    },
    confirmPlanText: {
        color: "#ffffff",
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
    },
    bottomConfirmBox: {
        width: "100%",
        backgroundColor: "#1ca0ff",
        height: 56,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomButtonContainer: {
        height: 60,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent'
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
