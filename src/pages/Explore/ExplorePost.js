import React from 'react';
import { View, StyleSheet, Dimensions, Text, Animated, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import AuthPopup from 'dash/src/components/AuthPopup';
import Header from './Header';
import Countdown from '../../components/Countdown';
import { Calendar } from '../../components/Icons';

import * as plansActions from '../../actions/plans';
import * as userActions from '../../actions/user';
import * as challengeActions from '../../actions/challenges';

import { mediaHost } from 'dash/src/config';

const { height } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);

  state = {
    plan: {}
  }

  async componentDidMount() {
    const { challenge } = this.props;
    const data = await plansActions.getPlans();

    // TODO: change to find
    let plan = data.filter((plan) => plan.status === 'current' && challenge.PlanID === plan._id);

    if (plan.length > 0) {
      plan = plan[0];
      this.setState({ plan })
    }
  }

  async onJoinPress() {
    const { challenge } = this.props;

    const joinRequest = async (challenge, user) => {
      // TODO: this request is currently broken. getting 400 error
      const response = await userActions.joinChallenge(challenge._id, user._id);
      if (response.status === 200) {
        // TODO: do i need to re-request challenges?
        // TODO: move to MyChallenge store?
        Actions.ChallengeDetail({ challenge });
      }
    }

    if (!this.props.user) {
      this.AuthPopupRef.open((user) => joinRequest(challenge, user));
    } else {
      joinRequest(challenge, this.props.user);
    }
  }

  render() {
    const { plan } = this.state;
    const { challenge } = this.props;

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.ScrollViewAnimation } } }],
      { useNativeDriver: true }
    );

    const timeTilStart = moment(new Date(challenge.startDate)).diff(moment(new Date()), 'seconds');

    return (
      <View style={styles.container}>
        <Header ScrollViewAnimation={this.ScrollViewAnimation} value={challenge} />
        <Animated.ScrollView
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <View style={styles.circle}></View>
            <View style={styles.padding}>
              <Text style={styles.host}>Hosted by {challenge.Host}</Text>
              <Text style={styles.title}>{challenge.title}</Text>
              <Text style={styles.description}>
                {challenge.description}
              </Text>
            </View>
            <LinearGradient
              colors={['#E7EEF5', '#fff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.planContainer}
            >
              <Image
                source={{ uri: `${mediaHost}${plan.planImage}` }}
                style={styles.planImage}
              />
              <Text style={styles.planTextBlue}>Challenges Plan:</Text>
              <Text style={styles.planTitle}>
                {plan.title}
              </Text>
              <View style={styles.viewButton}>
                <View style={styles.iconContainer}>
                  <Calendar />
                </View>
                <TouchableOpacity onPress={() => Actions.PlanOverview({ challenge, plan })}>
                  <Text style={styles.viewText}>
                    View Plan
                </Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </Animated.ScrollView>
        <AuthPopup ref={(e) => (this.AuthPopupRef = e)} />

        <Countdown
          initialTime={timeTilStart}
          containerStyle={styles.countdownContainer}
          showButton
          countdownBackground={styles.countdownBackground}
          onPress={() => this.onJoinPress()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  padding: {
    paddingHorizontal: 15,
    paddingTop: 10
  },
  container: {
    flex: 1
  },
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingTop: 35,
    marginTop: height / 2 - 20,
    marginBottom: 208
  },
  circle: {
    height: 56,
    width: 56,
    backgroundColor: '#FBFBFB',
    position: 'absolute',
    top: -28,
    borderRadius: 28,
    alignSelf: 'center',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
  },
  host: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#1AA0FF'
  },
  title: {
    color: '#3F434F',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
    lineHeight: 32,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    color: '#859AB6',
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 27
  },
  planContainer: {
    borderColor: '#E7EEF5',
    borderWidth: 1,
    height: 450,
    margin: 16,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center'
  },
  planImage: {
    height: 200,
    width: 200,
    marginBottom: 28
  },
  planTextBlue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: '#1AA0FF',
    paddingBottom: 6
  },
  planTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: '#3F434F',
    paddingBottom: 20
  },
  viewButton: {
    // box-shadow: 0px 20px 52px rgba(0, 0, 0, 0.03);
    width: 150,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 3
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#E9F6FF',
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 20,
    color: '#1AA0FF'
  },
  countdownContainer: {
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16
  },
  countdownBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  }
});
