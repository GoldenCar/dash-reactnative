import React, { useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  Animated,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import AuthPopup from 'dash/src/components/AuthPopup';
import Header from './Header';
import Countdown from './Countdown';
import { Calendar } from '../../../components/Icons';

import * as plansActions from '../../../actions/plans';
import { mediaHost } from 'dash/src/config';

const { height } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);

  state = {
    plan: {}
  }

  // NOTE: currently finding plan based on title. this is not acceptable
  //       need to fix plan id and use that instead
  async componentDidMount() {
    const { challenge } = this.props;
    const data = await plansActions.getPlans();
    let plan = data.filter((plan) => plan.status === 'current' && challenge.Plan === plan.title);

    if (plan.length > 0) {
      plan = plan[0];
      this.setState({ plan })
    }
  }

  render() {
    const { plan } = this.state;
    const { challenge } = this.props;

    const timeTilStart = moment(new Date(challenge.startDate)).diff(moment(new Date()), 'seconds');

    return (
      <View style={styles.container}>
        <Header ScrollViewAnimation={this.ScrollViewAnimation} value={challenge} />
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this.ScrollViewAnimation}},
              },
            ],
            {
              useNativeDriver: false,
            },
          )}
          showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.innerContainer,
              {
                marginTop: height / 2 - 20,
                marginBottom: 208
              }
            ]}>
            <View style={styles.circle}></View>
            <View style={styles.padding}>
              { /* TODO: host is currently broken. test when fixed */ }
              <Text style={styles.host}>Hosted by {challenge.host}</Text>
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
                source={{uri: `${mediaHost}${plan.planImage}`}}
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
                <Text style={styles.viewText}>
                  { /* TODO: hook up button */ }
                  View Plan
                </Text>
              </View>
            </LinearGradient>

            {/* <TouchableOpacity
              style={styles.joinChallengeContainer}
              onPress={() => {
                this.AuthPopupRef.open();
              }}>
              <Text style={styles.joinChallengeText}>Join Challenge</Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
        <AuthPopup ref={(e) => (this.AuthPopupRef = e)} />

          <View style={styles.countdownContainer}>
            <View style={styles.countdownTitleContainer}>
              <Text style={styles.countdownTitle}>
                Challenge Starts in:
              </Text>
            </View>
            <View style={styles.countdownContent}>
              <Countdown initialTime={timeTilStart} />
              <View style={styles.joinButton}>
                <Text style={styles.joinText}>
                  Join
                </Text>
              </View>
            </View>
          </View>
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
    height: 115,
    backgroundColor: '#1AA0FF',
    //box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.25);
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16
  },
  countdownTitleContainer: {
    position: 'absolute',
    left: 16,
    top: -20,
    justifyContent: 'center',
    width: 186,
    height: 37,
    backgroundColor: '#FFFFFF'
  },
  countdownTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#1AA0FF'
  },
  countdownContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  joinButton: {
    width: 89,
    height: 48,
    backgroundColor: '#FFFFFF',
    //box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.11);
    borderRadius: 8,
    justifyContent: 'center'
  },
  joinText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#1AA0FF'
  }
  // joinChallengeText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontFamily: 'Poppins-Bold',
  // },
  // joinChallengeContainer: {
  //   marginTop: 50,
  //   backgroundColor: '#00A1FF',
  //   paddingVertical: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // }
});
