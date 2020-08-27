import React from 'react';
import { View, ScrollView, Dimensions, Text, Animated, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Header from './Header';
import Countdown from '../../../components/Countdown';
import Plan from '../../../components/Plan';

import Plus from '../../MyChallenges/Icons/Plus';
import FriendImage from './invite.png';

const { height } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);

  render() {
    const { challenge, plan, user } = this.props;

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
              <Image
                source={FriendImage}
              />
              <View style={styles.friendTextContainer}>
                <Text style={styles.friendTitle}>Invite Friends</Text>
                <Text style={styles.friendSubtitle}>
                  Invite your friends to this challenge so they can join in on the fun.
                </Text>
              </View>
              <View style={styles.friendButton}>
                <Plus fill='#fff' />
                <Text style={styles.friendButtonText}>
                  Invite Friends
                </Text>
              </View>
            </View>

            <View style={styles.planContainer}>
              <Plan value={plan} blueButton />
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
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    flex: 1,
    marginTop: height / 2 - 20,
    paddingHorizontal: 16,
    paddingTop: 34,
    marginBottom: 208
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
    height: 390,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E7EEF5',
    borderRadius: 16,
    paddingTop: 12
  },
  friendTextContainer: {
    position: 'absolute',
    top: 212,
    paddingHorizontal: 60
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
    width: 154,
    height: 48,
    backgroundColor: '#1AA0FF',
    borderRadius: 48,
    paddingHorizontal: 23,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center'
  },
  friendButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  planContainer: {
    marginTop: 13
  }
});
