import React from 'react';
import { View, Animated } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import Menu from './Menu';
import Top from './Top';

export let ScrollViewRef;

export default class Component extends React.Component {
  ScrollViewAnimation = new Animated.Value(0);

  render() {
    const translateY = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [0, -280],
      extrapolate: 'clamp',
    });

    const opacity = this.ScrollViewAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const animatedContainerStyles = [
      {
        transform: [{ translateY }],
        opacity
      },
      styles.containerBackground
    ];

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.ScrollViewAnimation } } }],
      { useNativeDriver: true }
    );

    return (
      <View style={styles.container}>
        <Animated.View style={animatedContainerStyles}>
          <LinearGradient
            colors={['#007BFF', '#00A1FF']}
            useAngle={true}
            angle={72}
            style={styles.containerGradient}
          />
        </Animated.View>
        <Animated.ScrollView
          ref={(e) => (ScrollViewRef = e)}
          scrollEventThrottle={16}
          onScroll={onScroll}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Menu />
        </Animated.ScrollView>
        <Top ScrollViewAnimation={this.ScrollViewAnimation} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  containerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  containerBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 350,
  },
  contentContainerStyle: {
    paddingTop: 280,
    paddingBottom: 75,
  },
  container: {
    flex: 1
  },
});

Component.defaultProps = {};
