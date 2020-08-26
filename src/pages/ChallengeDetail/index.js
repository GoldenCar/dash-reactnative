import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

import { Close, Settings } from 'dash/src/components/Icons';
import Challenge from './Challenge';

const { width, height } = Dimensions.get('screen');

class Component extends React.Component {
    constructor(props) {
        super(props);
        const { challenge, user } = this.props;

        this.state = {
            user: challenge.createdBy === user._id ? user : {},
        };
    }

    render() {
        const { user } = this.state;
        const { challenge } = this.props;
        console.log(" challenge is ", challenge);

        return (
            <View>
                <TouchableOpacity
                    style={[styles.button, styles.backButton]}
                    onPress={() => Actions.MyChallengesTab()}
                >
                    <Close />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.settingsButton]}
                >
                    <Settings />
                </TouchableOpacity>
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
    button: {
        position: 'absolute',
        backgroundColor: 'rgba(63, 67, 79, 0.4)',
        zIndex: 100,
        height: 48,
        width: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        top: 25,
        left: 19
    },
    settingsButton: {
        top: 25,
        right: 19
    }
});
