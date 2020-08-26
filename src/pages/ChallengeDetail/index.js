import React from 'react';
import {
    View,
    Dimensions,
    Animated,
    Text,
    TouchableOpacity,
    Easing,
    BackHandler,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

import { BackArrow, AddUser } from 'dash/src/components/Icons';
import { InviteFriendsRef } from 'dash/src/index';

import * as UserActions from 'dash/src/actions/user';

import Challenge from './Challenge';
import Social from './Social';
import PopupPost from './Social/PopupPost';
import IconEntypo from 'react-native-vector-icons/Entypo';

const { width, height } = Dimensions.get('screen');

class Component extends React.Component {
    constructor(props) {
        super(props);
        const { challenge, user } = this.props;

        this.state = {
            index: 0,
            user: challenge.createdBy === user._id ? user : {},
        };
    }

    render() {
        const { index, user } = this.state;
        const { challenge } = this.props;
        console.log(" challenge is ", challenge);

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => Actions.MyChallengesTab()}
                    >
                        <BackArrow />
                    </TouchableOpacity>
                </View>
                <View style={{ width, height }}>
                    <Challenge challenge={challenge} user={user} />
                </View>
            </View>
        );
    }
}

export default connect(({ user }) => ({
    user,
}))(Component);

const styles = EStyleSheet.create({
    header: {
        // position: 'absolute',
        // paddingVertical: 15,
        // flexDirection: 'row',
        // alignItems: 'center',
        // left: 0,
        // right: 0,
        // top: 0,
        // backgroundColor: 'white',
        // elevation: 2,
        // zIndex: 100,
        // borderBottomWidth: 1,
        // borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});
