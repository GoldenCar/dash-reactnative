import React from 'react';
import { View, ScrollView, Dimensions, Text, Animated, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

import Header from './Header';
import Countdown from '../../../components/Countdown';
import Plan from '../../../components/Plan';
import PopupPost from '../Social/PopupPost';
import Social from '../Social'

import Plus from '../../MyChallenges/Icons/Plus';
import FriendImage from './invite.png';

const { height, width } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  PopupPostRef;
  ScrollViewAnimation = new Animated.Value(0);

  state = {
    contentHeight: 1000
  }

  render() {
    const { contentHeight } = this.state;
    const { challenge, plan, user } = this.props;

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.ScrollViewAnimation } } }],
      { useNativeDriver: false },
    );

    const opacity = this.ScrollViewAnimation.interpolate({
      inputRange: [0, contentHeight - 1, contentHeight],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

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

            <View
              style={styles.contentContainer}
              onLayout={(event) => {
                const { x, y, width, height } = event.nativeEvent.layout;
                console.log('content container height', height);
                this.setState({ contentHeight: height });
              }}
            >
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

            <View style={{ width, height }}>
              <Social
                user={user}
                challenge={challenge}
                PopupPostRef={this.PopupPostRef}
              />
            </View>
          </View>
        </ScrollView>
        <PopupPost ref={(e) => (this.PopupPostRef = e)} />

        <TouchableOpacity onPress={() => Actions.CreatePost({ challenge })}>
          <Animated.View style={[styles.addPostButton, { opacity }]}>
            <Plus fill='#fff' />
            <Text style={styles.addPostText}>New Post</Text>
          </Animated.View>
        </TouchableOpacity>
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
    paddingTop: 34,
    paddingBottom: 208
  },
  contentContainer: {
    paddingHorizontal: 16,
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
    marginTop: 13,
    marginBottom: 16
  },
  addPostButton: {
    width: 138,
    height: 56,
    borderRadius: 28,
    position: 'absolute',
    bottom: 36,
    right: 18,
    backgroundColor: '#1AA0FF',
    //box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.25);
    flexDirection: 'row',
    paddingHorizontal: 22,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addPostText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF'
  }
});
