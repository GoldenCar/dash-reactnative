import React from 'react';
import { StyleSheet, Animated, Text } from 'react-native';

const GO = 'GO!';

export default class extends React.Component {
  animation = new Animated.Value(0);
  state = {
    count: 3,
  };

  componentDidMount() {
    setTimeout(() => this.start(), 500);
  }

  start = () => {
    this.animation.setValue(0);

    Animated.timing(this.animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.secondStage();
    });
  };

  // TODO: what is each step doing? figure out and document
  secondStage = () => {
    setTimeout(() => {
      Animated.timing(this.animation, {
        toValue: 2,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        this.setState(
          (prev) => {
            const count = prev.count === GO ? -1 : prev.count - 1 === 0 ? GO : prev.count - 1;
            return count;
          }, () => {
            this.animationEnd();
          }
        );
      });
    }, 333);
  }

  animationEnd = () => {
    const { onEnd } = this.props;

    if (this.state.count !== -1) {
      this.start();
    } else if (onEnd) {
      onEnd();
    }
  }

  render() {
    const { count } = this.state;

    const opacity = this.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const scale = this.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 2],
      extrapolate: 'clamp',
    });

    const containerStyles = [styles.container, { opacity, transform: [{ scale }] }]

    const fontSize = count === GO ? 25 : 40;
    const lineHeight = count === GO ? 35 : 55

    const countStyles = [styles.count, { fontSize, lineHeight }];

    return (
      <Animated.View style={containerStyles}>
        <Text style={countStyles}>
          {count}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 41, 61, 0.4)',
    borderRadius: 50,
  },
  count: {
    fontSize: 35,
    lineHeight: 55,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
});
