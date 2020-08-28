import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import Plus from '../../MyChallenges/Icons/Plus';
import FriendImage from './invite.png';

export default function Component(props) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
});
