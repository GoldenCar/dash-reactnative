import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from "react-redux";

import {
    Logout,
    Instagram,
    Facebook,
    ChevronRight,
    AccountDetails,
    PreviousChallenges,
    PushNotifications,
    LeaveAReview,
    EmailSupport,
} from '../..//components/Icons';
import MyFriendsContainer from './MyFriendsContainer';

import * as UserActions from 'dash/src/actions/user';

const MENU_ITEMS = [
    {
        icon: <AccountDetails />,
        title: 'Account Details',
        onPress: () => {
            Actions.AccountDetails();
        },
    },
    {
        icon: <PushNotifications />,
        title: 'Push Notifications',
    },
    {
        icon: <PreviousChallenges />,
        title: 'Previous Challenges',
        onPress: () => {
            Actions.PreviousChallenges();
        },
    },
    {
        icon: <LeaveAReview />,
        title: 'Leave a Review',
    },
    {
        icon: <Instagram />,
        title: 'Follow Us On Instagram',
    },
    {
        icon: <Facebook />,
        title: 'Follow Us On Facebook',
    },
    {
        icon: <EmailSupport />,
        title: 'Email Support',
    },
    {
        icon: <Logout />,
        title: 'Logout',
        onPress: () => {
            UserActions.logout();
        },
    },
];

// TODO: rename this to something ore descriptive

function Component(props) {
    return (
        <View style={styles.container}>
            {props.user && <MyFriendsContainer list={props.user.friendsIds} />}
            <View style={styles.itemsContainer}>
                {MENU_ITEMS.map((value, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.item}
                            onPress={() => {
                                if (value.onPress) {
                                    value.onPress();
                                }
                            }}>
                            <View style={styles.itemStartPart}>
                                <View style={styles.iconContainer}>{value.icon}</View>
                                <Text style={styles.itemTitle}>{value.title}</Text>
                            </View>
                            <ChevronRight />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemTitle: {
        color: '#292E3A',
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        lineHeight: 24,
    },
    iconContainer: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#E9F6FF',
        marginRight: 25,
    },
    itemStartPart: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#F0F5FA',
        borderBottomWidth: 1,
        paddingVertical: 15,
    },
    itemsContainer: {
        paddingTop: 10,
        paddingBottom: 30,
        paddingHorizontal: 15,
    },

    container: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
});

export default connect(({ user }) => ({
    user,
}))(Component);

