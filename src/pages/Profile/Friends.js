import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as UserActions from '../../actions/user';

import FriendItem from '../../components/FriendItem';
import NavBar from '../../components/NavBar';
import Search from '../../components/Search';
import InvitationScroll from '../../components/InvitationScroll';

import AddFriend from '../MyChallenges/Icons/AddFriend';
import ChevronRight from '../MyChallenges/Icons/ChevronRight';
import ChallengeYourFriends from '../MyChallenges/ChallengeYourFriends';

import { FriendPopupRef } from 'dash/src/pages/CustomTabBar';
import { connect } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { getCurrentUser } from "../../actions/user";

const array = [
  {
    first: true,
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Cameron Mckinney',
    username: 'itsjuanita',
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Juanita Webb',
    username: 'Juanita Webb',
    noFriend: true,
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Randall Williamson',
    username: 'randallwilliamson',
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Regina Mccoy',
    username: 'Juanita Webb',
    noFriend: true,
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Cameron Mckinney',
    username: 'Juanita Webb',
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Juanita Webb',
    username: 'Juanita Webb',
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Randall Williamson',
    username: 'Juanita Webb',
  },
  {
    profileImage: "2020-8-1-2-16-44-1598993089056.jpg",
    displayname: 'Regina Mccoy',
    username: 'Juanita Webb',
  },
];

function Component(props) {
  const [search, setSearch] = useState('')
  const [list, setList] = useState([])
  const [found, setFound] = useState([])

  const load = async () => {
    const list = await UserActions.getUser()
    setList(list)
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (search.length === 1) {

    } else if (search.length === 0) {

    }
    let foundList = []
    list.forEach((v) => {
      if (v.username.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
        foundList = [...foundList, v]
      }
    })
    setFound(foundList)
  }, [search])

  const onPressFriend = (item, type, isRequested) => {
    FriendPopupRef.open(item, type, isRequested);
  };

  const isRequested = (user) => {
    return props.user.requestedUsers.findIndex(v => v._id === user._id) !== -1
  }

  const Accept = async (item, status) => {
    await UserActions.sendFriendAccept(item._id, status)
    await load()
  }

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
          {search.length === 0 && props.user.receivedUsers.length !== 0 && (
            <InvitationScroll Accept={Accept} list={props.user.receivedUsers} type="request" />
          )}
          {search.length === 0 ? (
            <>
              {props.user.friendsIds.length === 0 ? (
                <ChallengeYourFriends />
              ) : (
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
                    {props.user.friendsIds.map((value, index) => (
                      <FriendItem
                        key={index}
                        value={value}
                        onPress={() => onPressFriend(value, 'friend')}
                      />
                    ),
                    )}
                  </View>
                )}
            </>
          ) : (
              <>
                {found.map((value, index) => {
                  if (value._id === props.user._id) return
                  return (
                    <FriendItem
                      key={index}
                      value={value}
                      onPress={() => onPressFriend(value, 'user', isRequested(value))}
                    />
                  )
                })}
              </>
            )}
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
