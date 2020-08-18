import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Globe} from 'dash/src/components/Icons/index';
import ViewedBy from 'dash/src/components/Challenge/ViewedBy';
import ChallengeTypeContainer from 'dash/src/components/ChallengeTypeContainer';
import AuthPopup from 'dash/src/components/AuthPopup';

import Header from './Header';
import TimeTillChallenge from './TimeTillChallenge';
import ChallengeSchedule from './ChallengeSchedule';
import { Calendar } from '../../../components/Icons';

const {height} = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);
  render() {
    console.log(this.props);
    const { challenge } = this.props;

    // TODO: request challenge details

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
              },
            ]}>
            <View style={styles.circle}></View>
            <View style={[styles.paddingHorizontal, {paddingTop: 10}]}>
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
              <View style={{ height: 175 }} />
              <Text style={styles.planTextBlue}>Challenges Plan:</Text>
              <Text style={styles.planTitle}>
                20 Minute Daily Mens Workout
              </Text>
              <View style={styles.viewButton}>
                <View style={styles.iconContainer}>
                  <Calendar />
                </View>
                <Text style={styles.viewText}>
                  View Plan
                </Text>
              </View>
            </LinearGradient>
            {/* <TimeTillChallenge /> */}

            <View style={styles.countdownContainer}>
              <View style={styles.countdownTitleContainer}>
                <Text style={styles.countdownTitle}>
                  Challenge Starts in:
                </Text>
              </View>
              <View style={styles.countdownContent}>
                <View style={styles.countdown}>
                  <View style={styles.countdownColumn}>
                    <Text style={styles.columnValue}>2</Text>
                    <Text style={styles.columnLabel}>Days</Text>
                  </View>
                  <View style={styles.countdownColumn}>
                    <Text style={styles.columnValue}>2</Text>
                    <Text style={styles.columnLabel}>Hour</Text>
                  </View>
                  <View style={styles.countdownColumn}>
                    <Text style={styles.columnValue}>2</Text>
                    <Text style={styles.columnLabel}>Mins</Text>
                  </View>
                  <View style={styles.countdownColumn}>
                    <Text style={styles.columnValue}>2</Text>
                    <Text style={styles.columnLabel}>Secs</Text>
                  </View>
                </View>
                <View style={styles.joinButton}>
                  <Text style={styles.joinText}>
                    Join
                  </Text>
                </View>
              </View>
            </View>

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
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
    margin: 16,
    padding: 16,
    justifyContent: 'center'
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
  countdown: {
    width: 216,
    height: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  countdownColumn: {
    
  },
  columnValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  columnLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    opacity: 0.7
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
