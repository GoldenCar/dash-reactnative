import React from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import Countdown from '../../../components/Countdown';
import Plan from '../../../components/Plan';
import PopupPost from '../Social/PopupPost';
import Social from '../Social'

import Plus from '../../MyChallenges/Icons/Plus';
import FriendImage from './invite.png';

const { height } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  PopupPostRef;

  render() {
    const { challenge, plan, user, setContentContainerHeight } = this.props;

    const timeTilStart = moment(new Date(challenge.startDate)).diff(moment(new Date()), 'seconds');
    const hasStarted = timeTilStart <= 0;

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.blueText}>Hosted by {challenge.Host}</Text>
          <Text style={styles.title}>{challenge.title}</Text>

          <View
            style={styles.contentContainer}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setContentContainerHeight(height);
            }}
          >
            {!hasStarted && (
              <Countdown
                initialTime={60}
                centerTitle
                containerStyle={styles.countdownContainer}
              />
            )}
            { /* TODO: pull out into seperate component */}
            <View style={styles.inviteFriends}>
              <Image
                source={FriendImage}
                style={styles.friendImage}
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
            <TouchableOpacity onPress={() => Actions.PlanExploration()}>
              <View style={styles.planContainer}>
                <Plan value={plan} blueButton />
              </View>
            </TouchableOpacity>
          </View>

          <Social
            user={user}
            challenge={challenge}
            PopupPostRef={this.PopupPostRef}
          />
        </View>
        <PopupPost ref={(e) => (this.PopupPostRef = e)} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    flex: 1,
    marginTop: height / 2 - 20,
    paddingTop: 34,
    paddingBottom: 208,
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
  friendImage: {
    width: '100%'
  },
  friendTextContainer: {
    position: 'absolute',
    top: 212,
    paddingHorizontal: 32
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
  }
});
