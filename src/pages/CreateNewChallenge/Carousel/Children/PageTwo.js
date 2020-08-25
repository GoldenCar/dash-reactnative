import React from 'react';
import { Animated, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DailyTask from '../../DailyTask';

const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    const { challenge, CarouselRef, onPress, versionNum, isVersionModalShow, showVersionModal, setVersionNum } = props;

    const translateY = CarouselRef._scrollPos.interpolate({
        inputRange: [0, width],
        outputRange: [height, 0],
        extrapolate: 'clamp',
    });
    const translateX = CarouselRef._scrollPos.interpolate({
        inputRange: [0, width],
        outputRange: [-width, 0],
        extrapolate: 'clamp',
    });
    const scale = CarouselRef._scrollPos.interpolate({
        inputRange: [0, width],
        outputRange: [1, 1],
        extrapolate: 'clamp',
    });

    if (!challenge.type) {
        return null;
    }

    let items = [];

    challenge.type.planTypeData.map((item, index) => {
        items.push(item.version);
    });

    return (
        <Animated.View
            style={{
                transform: [{ translateY }, { translateX }, { scale }],
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.contentContainerStyle, { height }]}
            >
                <DailyTask
                    versionNum={versionNum}
                    isVersionModalShow={isVersionModalShow}
                    challenge={challenge}
                    showVersionModal={showVersionModal}
                    setVersionNum={setVersionNum}
                    items={items}
                />
            </ScrollView>

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Confirm Plan</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = EStyleSheet.create({
    contentContainerStyle: {
        backgroundColor: '#F7F9FB',
        paddingBottom: 30,
        flexGrow: 1
    },
    button: {
        borderRadius: 16,
        height: 64,
        position: 'absolute',
        bottom: 19,
        left: 16,
        right: 16,
        backgroundColor: "#1AA0FF",
        alignItems: "center",
        justifyContent: "center",
        //box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.13);
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontFamily: 'Poppins-Medium'
    }
});
