import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Video from 'react-native-video';

import {CheckList, Swap, Pause, Play} from 'dash/src/components/Icons';

import CountDownAnimation from './CountDownAnimation';
import RestAnimation from './RestAnimation';

const {width, height} = Dimensions.get('window');

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      pause: false,
      countDown: false,
      rest: false,
      timer: this.props.story.timer[0],
    };
  }
  translateY = new Animated.Value(0);
  pauseOpacity = new Animated.Value(0);
  opacityTimer;
  videoRef = React.createRef(null);
  setTimeoutTimer;
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
      Math.abs(gestureState.dy) > 5,
    onPanResponderGrant: (e, gestureState) => {
      this.translateY.extractOffset();
    },
    onPanResponderMove: Animated.event([null, {dx: 0, dy: this.translateY}], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy < -100) {
        clearTimeout(this.setTimeoutTimer);
        this.videoRef.current.setNativeProps({
          paused: true,
        });
        Animated.timing(this.translateY, {
          toValue: -(height - 200),
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      } else {
        clearTimeout(this.setTimeoutTimer);
        this.timer();
        this.videoRef.current.setNativeProps({
          paused: false,
        });
        this.translateY.flattenOffset();
        Animated.timing(this.translateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  countDown = () => {
    this.setState({countDown: true});
  };
  restEnd = () => {
    this.setState({rest: false, pause: false, countDown: true});
  };
  start = () => {
    if (!this.state.pause) {
      this.timer();
      this.videoRef.current.setNativeProps({
        paused: false,
      });
    }
  };
  timer = () => {
    this.setTimeoutTimer = setTimeout(() => {
      this.setState(
        (prev) => {
          return {
            timer: prev.timer - 1,
          };
        },
        () => {
          if (this.state.timer === 0) {
            if (
              this.state.currentIndex ===
              this.props.story.videos.length - 1
            ) {
              this.nextStory();
            } else {
              this.setState((prev) => {
                return {
                  currentIndex: prev.currentIndex + 1,
                  timer: this.props.story.timer[prev.currentIndex + 1],
                  pause: false,
                  rest: true,
                };
              });
            }
          } else {
            if (!this.state.pause) {
              this.timer();
            }
          }
        },
      );
    }, 1000);
  };
  next = () => {
    this.setState(
      (prev) => {
        this.pauseOpacity.setValue(0);
        this.videoRef.current.setNativeProps({
          paused: false,
        });
        return {
          currentIndex: prev.currentIndex + 1,
          timer: this.props.story.timer[prev.currentIndex + 1],
          pause: false,
        };
      },
      () => {
        if (this.setTimeoutTimer) {
          clearTimeout(this.setTimeoutTimer);
        }
        this.timer();
      },
    );
  };
  prev = () => {
    this.setState(
      (prev) => {
        this.pauseOpacity.setValue(0);
        this.videoRef.current.setNativeProps({
          paused: false,
        });
        return {
          currentIndex: prev.currentIndex - 1,
          pause: false,
          timer: this.props.story.timer[prev.currentIndex - 1],
        };
      },
      () => {
        if (this.setTimeoutTimer) {
          clearTimeout(this.setTimeoutTimer);
        }
        this.timer();
      },
    );
  };
  nextStory = () => {
    if (this.state.currentIndex === this.props.story.videos.length - 1) {
      this.props.nextStory();
    } else {
      this.next();
    }
  };
  prevStory = () => {
    if (this.state.currentIndex === 0) {
      this.props.prevStory();
    } else {
      this.prev();
    }
  };
  onPressPause = () => {
    this.setState((prev) => {
      if (this.opacityTimer) {
        clearTimeout(this.opacityTimer);
        this.opacityTimer = undefined;
      }
      Animated.timing(this.pauseOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();
      if (!!prev.pause) {
        this.opacityTimer = setTimeout(() => {
          Animated.timing(this.pauseOpacity, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
          }).start();
        }, 1000);
      }
      this.videoRef.current.setNativeProps({
        paused: !prev.pause,
      });
      if (!prev.pause) {
        if (this.setTimeoutTimer) {
          clearTimeout(this.setTimeoutTimer);
        }
      } else {
        this.timer();
      }
      return {
        pause: !prev.pause,
      };
    });
  };
  stop = () => {
    this.translateY.setValue(0);
    this.videoRef.current.setNativeProps({
      paused: true,
    });
    this.videoRef.current.seek(0);
    if (this.setTimeoutTimer) {
      clearTimeout(this.setTimeoutTimer);
    }
    this.setState({
      currentIndex: 0,
      pause: false,
      countDown: false,
      rest: false,
      timer: this.props.story.timer[0],
    });
  };
  render() {
    const {
      story: {videos},
    } = this.props;
    const {currentIndex, pause, countDown, rest} = this.state;
    const opacity = this.pauseOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    const minutes = Math.floor(this.state.timer / 60);
    const seconds = this.state.timer - minutes * 60;
    const heightContainer = this.translateY.interpolate({
      inputRange: [-(height - 200), 0],
      outputRange: [height - 200, 150],
      extrapolate: 'clamp',
    });
    const translateY = this.translateY.interpolate({
      inputRange: [-(height - 200), 0],
      outputRange: [-(height - 350), 0],
      extrapolate: 'clamp',
    });
    const backgroundColor = this.translateY.interpolate({
      inputRange: [-(height - 200), 0],
      outputRange: ['rgba(33, 41, 61, 0.4)', 'rgba(33, 41, 61, 0)'],
      extrapolate: 'clamp',
    });
    return (
      <SafeAreaView style={styles.container}>
        <Video
          ref={this.videoRef}
          useNativeDriver={false}
          repeat={true}
          paused={true}
          source={videos[currentIndex]}
          resizeMode={'cover'}
          style={styles.video}
          onVideoLoad={() => {}}
          onLoad={() => {
            this.videoRef.current.seek(0);
          }}
        />
        <Animated.View
          style={[styles.backgroundDescriptionOpen, {backgroundColor}]}
        />
        <View style={styles.linearGradientContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.0001)']}
            style={styles.linearGradient}
          />
        </View>
        <View style={styles.linearGradientContainerBottom}>
          <LinearGradient
            colors={['rgba(0,0,0,0.0001)', 'rgba(0,0,0,0.6)']}
            style={styles.linearGradientBottom}
          />
        </View>
        <View style={styles.centerContainer}>
          <TouchableWithoutFeedback onPress={this.onPressPause}>
            <Animated.View
              style={[
                styles.pauseContainer,
                {
                  opacity,
                },
              ]}>
              {pause ? (
                <Play height={30} width={30} />
              ) : (
                <Pause height={25} width={25} />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.linesContainer}>
          {videos.map((v, index) => (
            <View
              key={index}
              style={[
                styles.line,
                {
                  backgroundColor:
                    currentIndex === index ? 'white' : 'rgba(0,0,0,0.1)',
                },
              ]}
            />
          ))}
        </View>
        <TouchableWithoutFeedback onPress={this.prevStory}>
          <View style={styles.prev}></View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.nextStory}>
          <View style={styles.next}></View>
        </TouchableWithoutFeedback>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>Circle</Text>
            <Text style={styles.title}>4 Rounds Left</Text>
          </View>
          <View style={styles.timeContainer}>
            <Pause />
            <Text style={styles.time}>33:21</Text>
          </View>
        </View>
        <Animated.View
          style={[
            styles.mainContainer,
            {height: heightContainer, transform: [{translateY}]},
          ]}
          {...this.panResponder.panHandlers}>
          <Text style={styles.storyTime}>
            {`${minutes < 10 ? '0' : ''}${minutes}:${
              seconds < 10 ? '0' : ''
            }${seconds}`}
          </Text>
          <Text style={styles.storyTitle}>
            Overhead Single Arm Strict Shoulder Press
          </Text>
          <Text style={styles.storyDescription}>
            A treadmill can give you a great walking workout in any weather. If
            you use the right walking form and vary your workouts with
            intervals, hills, and speed changes, you can keep yourself
            interested and challenge your body in new ways.
          </Text>
        </Animated.View>

        <View style={styles.bottomRow}>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <CheckList />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.button}>
              <Swap />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {countDown && (
          <View style={styles.countDownContainer}>
            <CountDownAnimation
              onEnd={() => {
                this.setState(
                  {
                    countDown: false,
                  },
                  () => {
                    this.start();
                  },
                );
              }}
            />
          </View>
        )}
        {rest && (
          <View style={[styles.countDownContainer]}>
            <RestAnimation onEnd={this.restEnd} />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  backgroundDescriptionOpen: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  linearGradientContainerBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 100,
    bottom: 0,
  },
  linearGradientBottom: {
    width: '100%',
    height: 100,
  },
  linearGradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 300,
    top: 0,
  },
  linearGradient: {
    width: '100%',
    height: 300,
  },
  countDownContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  centerContainer: {
    position: 'absolute',
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 41, 61, 0.4)',
    borderRadius: 50,
  },
  storyDescription: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
  },
  storyTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
    marginBottom: 10,
  },
  storyTime: {
    fontSize: 28,
    lineHeight: 38,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
  },
  mainContainer: {
    position: 'absolute',
    top: height - 200,
    height: 120,
    overflow: 'hidden',
    left: 15,
    right: 15,
  },
  time: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(33, 41, 61, 0.4)',
  },
  title: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 1,
    fontSize: 18,
    lineHeight: 24,
  },
  prev: {
    position: 'absolute',
    width: 50,
    top: 20,
    left: 0,
    height,
    backgroundColor: 'transparent',
  },
  next: {
    position: 'absolute',
    right: 0,
    width: 50,
    top: 20,
    height,
    backgroundColor: 'transparent',
  },
  topRow: {
    top: 40,
    left: 15,
    right: 15,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(33, 41, 61, 0.4)',
    marginRight: 15,
  },
  bottomRow: {
    bottom: 15,
    left: 15,
    position: 'absolute',
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  linesContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    height: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    height: 28,
    width: 250,
    borderRadius: Platform.OS === 'android' ? 0 : 10,
  },
});
