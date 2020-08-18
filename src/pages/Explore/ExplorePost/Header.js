import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import { mediaHost } from 'dash/src/config';
import {BackArrow} from '../../../components/Icons';
import {Close} from '../../../components/Icons';


const {width, height} = Dimensions.get('window');

export default function Component(props) {
  const {ScrollViewAnimation, value} = props;
  const scale = ScrollViewAnimation.interpolate({
    inputRange: [0, height / 2 - 20],
    outputRange: [1, 1.1],
    extrapolate: 'clamp',
  });
  const zIndex = ScrollViewAnimation.interpolate({
    inputRange: [height / 2 - 125, height / 2 - 80],
    outputRange: [10, -1],
    extrapolate: 'clamp',
  });

  let bgImgUrl = '';
  if (value.challengeBGImage.includes('-')) {
    bgImgUrl = { uri: `${mediaHost}${value.challengeBGImage}` };
  } else {
    bgImgUrl = value.challengeBGImage
  }

  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.pictureContainer,
            {
              transform: [{scale}],
            },
          ]}>
          <Image
            style={styles.picture}
            resizeMode="cover"
            //source={require('dash/src/res/explore/ExplorePost.png')}
            source={{uri: `${mediaHost}${value.challengeBGImage}`}}
          />
        </Animated.View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          Actions.pop();
        }}>
        <Animated.View style={[styles.backButtonContainer, {zIndex}]}>
          {/* <BackArrow fill="#fff" /> */}
          <Close />
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  pictureContainer: {
    width,
    height: height / 2,
  },
  picture: {
    width,
    height: height / 2,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: height / 2,
    zIndex: -1,
  },
  backButtonContainer: {
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

Component.defaultProps = {};
