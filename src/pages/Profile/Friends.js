import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

import * as UserActions from '../../actions/user';

import FriendItem from '../../components/FriendItem';
import NavBar from '../../components/NavBar';
import Search from '../../components/Search';
import InvitationScroll from '../../components/InvitationScroll';
import ChallengeYourFriends from './ChallengeYourFriends';

import AddFriend from '../MyChallenges/Icons/AddFriend';
import ChevronRight from '../MyChallenges/Icons/ChevronRight';

import { FriendPopupRef } from 'dash/src/pages/CustomTabBar';

// TODO - ASAP: clean up

function renderSearch(search, found, friendsIds, user, isRequested, onPressFriend) {
  if (search.length === 0) {
    return renderFriendContent(friendsIds, onFriendClick, onPressFriend);
  }

  return (
    found.map((value, index) => {
      if (value._id === user._id) {
        return null;
      }

      const onSearchFriendClick = () => onPressFriend(value, 'user', isRequested(value))

      return (
        <FriendItem
          key={index}
          value={value}
          onPress={onSearchFriendClick}
        />
      )
    })
  )
}

function renderFriendContent(friendsIds, onPressFriend) {
  if (friendsIds.length === 0) {
    return <ChallengeYourFriends />
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => Actions.InviteFriendsToDash()}>
        <View style={styles.startPart}>
          <View style={styles.pictureContainer}>
            <AddFriend />
          </View>
          <View style={styles.centerContainer}>
            <Text style={styles.inviteText}>
              Invite Friends to Dash
            </Text>
          </View>
        </View>
        <ChevronRight />
      </TouchableOpacity>
      {friendsIds.map((value, index) => {
        const onFriendClick = () => onPressFriend(value, 'friend');

        return (
          <FriendItem
            key={index}
            value={value}
            onPress={onFriendClick}
          />
        )
      }
      )}
    </View>
  )
}

function Component(props) {
  const { user } = props;
  const { requestedUsers, receivedUsers, friendsIds } = user;

  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [found, setFound] = useState([]);

  const load = async () => {
    const list = await UserActions.getUser();
    setList(list);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    let foundList = [];

    list.forEach((v) => {
      const username = v.username.toLowerCase();
      if (username.indexOf(search.toLowerCase()) !== -1) {
        foundList = [...foundList, v]
      }
    });

    setFound(foundList);
  }, [search])

  // TODO: pull these in to friend helpers?
  const onPressFriend = (item, type, isRequested) => {
    FriendPopupRef.open(item, type, isRequested);
  };

  const isRequested = (user) => {
    return requestedUsers.findIndex(v => v._id === user._id) !== -1;
  }

  const accept = async (item, status) => {
    await UserActions.sendFriendAccept(item._id, status);
    await load();
  }

  const showInvitationScroll = search.length === 0 && receivedUsers.length !== 0;

  return (
    <View style={styles.containerMain}>
      <NavBar title="Friends" />
      <LinearGradient
        colors={['#E7EEF5', '#fff']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Search onChangeText={(e) => setSearch(e)} placeholder="Find friends.." />
          {showInvitationScroll && ( // TODO: clean up
            <InvitationScroll accept={accept} list={receivedUsers} type="request" />
          )}

          {renderSearch(search, found, friendsIds, user, isRequested, onPressFriend)}
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  contentContainerStyle: {
    paddingBottom: 60,
    paddingTop: 80,
  },
  containerMain: {
    flex: 1,
  },
  inviteText: {
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  link: {
    fontSize: 14,
    color: '#96AAC6',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  centerContainer: {
    marginHorizontal: 10,
  },
  startPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0EAF3',
  },
  pictureContainer: {
    width: 56,
    height: 56,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(({ user }) => ({
  user,
}))(Component);
