import React from 'react';
import { View, Dimensions, TouchableOpacity, Animated, Text } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

import Challenge from './Challenge';
import Header from './Header';

// TODO: clean up import file destinations
import { Close, Settings } from 'dash/src/components/Icons';
import Plus from '../MyChallenges/Icons/Plus';

import * as plansActions from '../../actions/plans';
import * as MyChallengeActions from '../../actions/MyChallenges';

const { width, height } = Dimensions.get('screen');

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

class Component extends React.Component {
    state = {
        contentHeight: 1000
    };

    ScrollViewAnimation = new Animated.Value(0);

    // TODO: need way to get plan with id from server
    //       what am i doing currently?
    async componentDidMount() {
        const { challenge } = this.props;

        // TODO: move this to on challenge click?
        //       move this to helper or action?
        const data = await plansActions.getPlans();
        let plan = data.filter((plan) => plan.status === 'current' && challenge.PlanID === plan._id);

        if (plan.length > 0) {
            plan = plan[0];
            MyChallengeActions.setMyPlan(plan);
        }
    }

    render() {
        const { contentHeight } = this.state;
        const { challenge } = this.props;

        const onScroll = Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.ScrollViewAnimation } } }],
            { useNativeDriver: true }
        );

        const setContentContainerHeight = (height) => this.setState({ contentHeight: height });

        const addPostButtonOpacity = this.ScrollViewAnimation.interpolate({
            inputRange: [0, contentHeight - 1, contentHeight],
            outputRange: [0, 0, 1],
            extrapolate: 'clamp',
        });

        const buttonOpacity = this.ScrollViewAnimation.interpolate({
            inputRange: [0, height / 2],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <View style={{ width, height }}>
                <Header
                    ScrollViewAnimation={this.ScrollViewAnimation}
                    challenge={challenge}
                />
                <Animated.ScrollView
                    onScroll={onScroll}
                    showsVerticalScrollIndicator={false}
                >
                    <Challenge
                        challenge={challenge}
                        ScrollViewAnimation={this.ScrollViewAnimation}
                        setContentContainerHeight={setContentContainerHeight}
                    />
                </Animated.ScrollView>
                <AnimatedTouchable
                    style={[styles.button, styles.backButton, { opacity: buttonOpacity }]}
                    onPress={() => Actions.MyChallengesTab()}
                >
                    <Close />
                </AnimatedTouchable>
                <AnimatedTouchable
                    style={[styles.button, styles.settingsButton, { opacity: buttonOpacity }]}
                >
                    <Settings />
                </AnimatedTouchable>

                <AnimatedTouchable
                    onPress={() => Actions.CreatePost({ challenge })}
                    style={[styles.addPostButton, { opacity: addPostButtonOpacity }]}
                >
                    <Plus fill='#fff' />
                    <Text style={styles.addPostText}>New Post</Text>
                </AnimatedTouchable>
            </View>
        );
    }
}

export default connect(({ }) => ({
}))(Component);

const styles = EStyleSheet.create({
    button: {
        position: 'absolute',
        backgroundColor: 'rgba(63, 67, 79, 0.4)',
        zIndex: 2,
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
