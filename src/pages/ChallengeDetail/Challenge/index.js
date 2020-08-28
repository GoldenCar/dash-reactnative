import React from 'react';
import { View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import Countdown from '../../../components/Countdown';
import Plan from '../../../components/Plan';
import InviteFriends from './InviteFriends';
import PopupPost from '../Social/PopupPost';
import Social from '../Social'
import DayOverview from './DayOverview';

const { height } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  PopupPostRef;

  render() {
    const { challenge, plan, user, setContentContainerHeight } = this.props;

    const timeTilStart = moment(new Date(challenge.startDate)).diff(moment(new Date()), 'seconds');
    const hasStarted = timeTilStart <= 0;

    // TODO: get current days plan data (title, date)

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.blueText}>Hosted by {challenge.Host}</Text>
          <Text style={styles.title}>{challenge.title}</Text>

          <View
            style={styles.contentContainer}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setContentContainerHeight(height);
            }}
          >
            {!hasStarted ? (
              <>
                <Countdown
                  initialTime={timeTilStart}
                  centerTitle
                  containerStyle={styles.countdownContainer}
                />
                <InviteFriends />
                <TouchableOpacity onPress={() => Actions.PlanExploration()}>
                  <View style={styles.planContainer}>
                    <Plan value={plan} blueButton />
                  </View>
                </TouchableOpacity>
              </>
            ) : (
                <DayOverview />
              )}
          </View>

          <Social
            user={user}
            challenge={challenge}
            PopupPostRef={this.PopupPostRef}
          />
        </View>
        <PopupPost ref={(e) => (this.PopupPostRef = e)} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    flex: 1,
    marginTop: height / 2 - 20,
    paddingTop: 34,
    paddingBottom: 208,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  countdownContainer: {
    paddingHorizontal: 56,
    marginBottom: 9
  },
  blueText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#1AA0FF',
    paddingBottom: 8
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: '#3F434F',
    paddingBottom: 18
  },
  planContainer: {
    marginTop: 13,
    marginBottom: 16
  },
});
