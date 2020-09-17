import React from 'react';
import { View, StyleSheet, Dimensions, Image, Animated, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { mediaHost } from 'dash/src/config';
import { Close } from '../../components/Icons';

const { width, height } = Dimensions.get('window');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CONTAINER_HEIGHT = 264;

const SCALE_END = height / 2 - 20;

const OPACITY_START = height / 2 - 125;
const OPACITY_END = height / 2 - 80;

export default function Component(props) {
  const { ScrollViewAnimation, value } = props;

  // TODO: use constants here
  const scale = ScrollViewAnimation.interpolate({
    inputRange: [0, SCALE_END],
    outputRange: [1, 1.1],
    extrapolate: 'clamp',
  });

  const opacity = ScrollViewAnimation.interpolate({
    inputRange: [OPACITY_START, OPACITY_END],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const onClose = () => Actions.pop();

  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.pictureContainer,
            { transform: [{ scale }] },
          ]}>
          <Image
            style={styles.picture}
            resizeMode="cover"
            source={{ uri: `${mediaHost}${value.challengeBGImage}` }}
          />
        </Animated.View>
      </View>
      <AnimatedTouchable
        onPress={onClose}
        style={[styles.backButtonContainer, { opacity }]}
      >
        <Close />
      </AnimatedTouchable>
    </>
  );
}

const styles = StyleSheet.create({
  pictureContainer: {
    width,
    height: CONTAINER_HEIGHT,
  },
  picture: {
    width,
    height: CONTAINER_HEIGHT,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: CONTAINER_HEIGHT,
    zIndex: -1,
  },
  backButtonContainer: {
    zIndex: 10,
    position: 'absolute',
    left: 15,
    top: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(63, 67, 79, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
