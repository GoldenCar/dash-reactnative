import React from 'react';
import { View, ScrollView, Dimensions, Text, Animated, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Globe, Add, ChevronRight } from 'dash/src/components/Icons/index';
import ViewedBy from 'dash/src/components/Challenge/ViewedBy';
import LightButton from 'dash/src/components/LightButton';

import Header from './Header';
import Countdown from '../../../components/Countdown';

const { height } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);

  render() {
    const { challenge, user } = this.props;

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.ScrollViewAnimation } } }],
      { useNativeDriver: false },
    );

    return (
      <View style={styles.container}>
        <Header
          ScrollViewAnimation={this.ScrollViewAnimation}
          {...this.props}
        />
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.blueText}>Hosted by {challenge.Host}</Text>
            <Text style={styles.title}>{challenge.title}</Text>
            <Countdown
              initialTime={60}
              centerTitle
              containerStyle={styles.countdownContainer}
            />

            <View style={styles.inviteFriends}>

              <Text style={styles.friendTitle}>Invite Friends</Text>
              <Text style={styles.friendSubtitle}>
                Invite your friends to this challenge so they can join in on the fun.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 40,
    flex: 1,
  },
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    flex: 1,
    marginTop: height / 2 - 20,
    paddingHorizontal: 16,
    paddingTop: 34
  },
  countdownContainer: {
    paddingHorizontal: 56,
    marginBottom: 9
  },
  blueText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#1AA0FF',
    paddingBottom: 8
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: '#3F434F',
    paddingBottom: 18
  },


  inviteFriends: {

  },
  friendImage: {

  },
  friendTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#3F434F'
  },
  friendSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#859AB6'
  },
  friendButton: {

  },
  friendButtonText: {

  }
});
