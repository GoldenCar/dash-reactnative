import React from 'react';
import { View, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { mediaHost } from 'dash/src/config';

const { width, height } = Dimensions.get('window');

export default function Component(props) {
  const { ScrollViewAnimation, challenge } = props;

  const scale = ScrollViewAnimation.interpolate({
    inputRange: [0, height / 2 - 20],
    outputRange: [1, 1.1],
    extrapolate: 'clamp',
  });

  const imageURL = `${mediaHost}${challenge.challengeBGImage}`;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pictureContainer,
          {
            transform: [{ scale }],
          },
        ]}>
        <Image
          style={styles.picture}
          resizeMode="cover"
          source={{ uri: imageURL }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height / 2,
    zIndex: -1,
  },
  pictureContainer: {
    width,
    height: height / 2,
  },
  picture: {
    width,
    height: height / 2,
  },
});

Component.defaultProps = {};
