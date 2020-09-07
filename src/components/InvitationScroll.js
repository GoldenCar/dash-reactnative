import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { mediaHost } from 'dash/src/config';

const { width, height } = Dimensions.get('window');


export default function Component(props) {
  const { type, list, Accept } = props;
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      {list.map((value, index) => (
        <View
          key={index}
          style={[
            styles.invitationItem,
            index === list.length - 1
              ? {
                marginRight: 15,
              }
              : {},
          ]}>
          <View style={styles.invitationItemHeader}>
            <View style={styles.invitationItemAvatarContainer}>
              <Image
                resizeMode="cover"
                source={{ uri: `${mediaHost}${value.profileImage}` }}
                style={styles.invitationItemAvatar}
              />
            </View>
            <View style={styles.invitationTextContainer}>
              <Text style={styles.invitationName}>
                {/*{value.username}{' '}*/}
                {'312321312'}{' '}
                {type !== 'request' && (
                  <Text style={styles.invitedToThe}>Invited you to the</Text>
                )}
              </Text>
              {type === 'request' ? (
                <Text style={[styles.inviteChallenge, { color: '#21293D' }]}>
                  Sent Friend Request
                                </Text>
              ) : (
                  <Text style={styles.inviteChallenge}>{value.challenge}</Text>
                )}
            </View>
          </View>
          <View style={styles.inviteActionsContainer}>
            <TouchableOpacity
              onPress={() => Accept(value, 'accept')}
              style={[
                styles.inviteAction,
                {
                  borderRightWidth: 1,
                  borderRightColor: '#F0F5FA',
                },
              ]}>
              <Text style={styles.inviteAccept}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Accept(value, 'reject')} style={styles.inviteAction}>
              <Text style={styles.inviteIgnore}>Ignore</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inviteIgnore: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#96AAC6',
  },
  inviteAccept: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  inviteAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  inviteActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteChallenge: {
    color: '#00A1FF',
    fontFamily: 'Poppins',
  },
  invitedToThe: {
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
  },
  invitationName: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
  invitationTextContainer: {
    marginLeft: 10,
  },
  invitationItemAvatar: {
    width: 50,
    height: 50,
  },
  invitationItemAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    // overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'white',
  },
  invitationItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  invitationItem: {
    backgroundColor: '#fff',
    width: width - 80,
    borderWidth: 1,
    borderColor: '#E7EEF5',
    borderRadius: 16,
    marginVertical: 25,
    marginLeft: 15,
  },
});

Component.defaultProps = {
  type: '',
};
