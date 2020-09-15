import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import * as challengesActions from '../../actions/challenges';
import { mediaHost } from 'dash/src/config';

import FriendItem from '../../components/FriendItem';
import NavBar from '../../components/NavBar';

function Component(props) {
  const { user } = props;

  const [allChallenges, setAllChallenges] = useState([]);

  useEffect(() => {
    const getAllChallenges = async () => {
      const response = await challengesActions.getAllChallengesOfDB();
      setAllChallenges(response);
    }

    getAllChallenges();
  }, []);

  // TODO: put in state
  let myChallenges = [];
  if (user && user._id) {
    myChallenges = allChallenges.filter((v) => {
      if (!v.status === 'start') {
        return false;
      }

      if (v.createdBy === user._id) {
        return true;
      }

      const hasUserJoined = (v.joinedUsers.indexOf(user._id) > -1);
      if (hasUserJoined) {
        return true;
      }

      return false;
    });
  }

  console.log(myChallenges, allChallenges);
  console.log(user);

  const friend = {
    profileImage: user.profileImage,
    displayname: user.displayname,
    username: `${user.displayname}`
  };

  return (
    <View style={styles.container}>
      <NavBar title="Invite To Challenge" />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <FriendItem
          value={friend}
          containerStyle={styles.friendContainerStyle}
          disablePress={true}
        />
        <View style={styles.itemsContainer}>
          {myChallenges.map((value, index) => {
            const imageURL = { uri: `${mediaHost}${value.challengeBGImage}` };

            return (
              <View key={index} style={styles.item}>
                <View style={styles.itemTop}>
                  <View style={styles.pictureContainer}>
                    <Image
                      style={styles.picture}
                      source={imageURL}
                      resizeMode="cover"
                    />
                  </View>
                  <View>
                    <Text style={styles.itemTitle}>{value.title}</Text>
                    <Text style={styles.itemSubTitle}>Plan: {value.Plan}</Text>
                  </View>
                </View>
                <View style={styles.inviteContainer}>
                  <Text style={styles.invite}>Invite</Text>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default connect(({ user }) => ({
  user,
}))(Component);


const styles = StyleSheet.create({
  invite: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  inviteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F5FA',
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 10,
  },
  itemSubTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 20,
    color: '#859AB6',
    marginLeft: 10
  },
  picture: {
    width: 55,
    height: 55,
  },
  pictureContainer: {
    width: 55,
    height: 55,
    borderRadius: 10,
    overflow: 'hidden',
  },
  item: {
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    paddingTop: 15,
    marginBottom: 15,
  },
  itemsContainer: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 80,
  },
  friendContainerStyle: {
    marginHorizontal: 0,
    paddingHorizontal: 15,
  },
  inviteAllContainer: {
    backgroundColor: '#F7F9FB',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inviteAllText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
});

Component.defaultProps = {};
