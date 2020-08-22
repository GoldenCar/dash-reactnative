import React from 'react';
import { Animated, Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CreateNew from '../../CreateNew';

export default function Component(props) {
    const { CarouselRef, HeaderRef, onChangeChallenge, onPressNext } = props;

    const opacity = CarouselRef._scrollPos.interpolate({
        inputRange: [0, 300],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <Animated.ScrollView
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={false}
            style={{ opacity }}
            contentContainerStyle={[styles.contentContainerStyle]}>
            <View style={styles.titleContainer1}>
                <Text style={styles.titles}>Start your 30 day</Text>
                <Text style={styles.titles}>
                    challenge by choosing
              </Text>
                <Text style={styles.titles}>
                    the plan:
              </Text>
            </View>
            <CreateNew
                onPress={(type) => {
                    console.log(" type is ", type);
                    onPressNext({
                        call: () => {
                            HeaderRef.next();
                            if (type.planTypeData && type.planTypeData.length > 0) {
                                onChangeChallenge({ type });
                            }
                        },
                    });
                }}
            />
        </Animated.ScrollView>
    )
}

const styles = EStyleSheet.create({
    contentContainerStyle: {
        backgroundColor: '#F7F9FB',
        paddingBottom: 30,
        flexGrow: 1
    },
    titleContainer1: {
        alignItems: "flex-start",
        marginBottom: 22
    },
    titles: {
        textAlign: 'center',
        fontSize: 24,
        lineHeight: 32,
        fontFamily: 'Poppins-Bold',
        paddingHorizontal: 15,
        color: '#292E3A',
    },

});
