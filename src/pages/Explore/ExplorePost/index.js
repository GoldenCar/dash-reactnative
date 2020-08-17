import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {Globe} from 'dash/src/components/Icons/index';
import ViewedBy from 'dash/src/components/Challenge/ViewedBy';
import ChallengeTypeContainer from 'dash/src/components/ChallengeTypeContainer';
import AuthPopup from 'dash/src/components/AuthPopup';

import Header from './Header';
import TimeTillChallenge from './TimeTillChallenge';
import ChallengeSchedule from './ChallengeSchedule';

const {height} = Dimensions.get('window');

// const array = [
//   {
//     picture: require('dash/src/res/viewedBy/4.png'),
//   },
//   {
//     picture: require('dash/src/res/viewedBy/3.png'),
//   },
//   {
//     picture: require('dash/src/res/viewedBy/1.jpg'),
//   },
//   {
//     picture: require('dash/src/res/viewedBy/2.jpg'),
//   },
//   {},
//   {},
//   {},
//   {},
// ];

// const item = {
//   picture: require('dash/src/res/StrengthTraining.png'),
//   backgroundColor: '#F8E0BC',
//   name: 'Strength Training',
//   description:
//     'Guided strength training circuit workouts. No equipment needed.',
// };

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);
  render() {
    console.log(this.props);
    const { challenge } = this.props;
    return (
      <View style={styles.container}>
        <Header ScrollViewAnimation={this.ScrollViewAnimation} value={challenge} />
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this.ScrollViewAnimation}},
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.innerContainer,
              {
                marginTop: height / 2 - 20,
              },
            ]}>
            <View style={[styles.paddingHorizontal, {paddingTop: 10}]}>
              <Text style={styles.title}>{challenge.title}</Text>
              <Text style={styles.description}>
                {challenge.description}
              </Text>
            </View>
            <TimeTillChallenge />
            <TouchableOpacity
              style={styles.joinChallengeContainer}
              onPress={() => {
                this.AuthPopupRef.open();
              }}>
              <Text style={styles.joinChallengeText}>Join Challenge</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <AuthPopup ref={(e) => (this.AuthPopupRef = e)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  title: {
    color: '#21293D',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#586178',
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
  },
  joinChallengeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  joinChallengeContainer: {
    marginTop: 50,
    backgroundColor: '#00A1FF',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
