import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { hasChallengeStarted, getDaysSinceStart, getSecondsTilStart } from '../../../helpers/challenge';
import { getPlanDayData, getDayData } from '../../../helpers/plan';
import * as MyChallengeActions from '../../../actions/MyChallenges';

import Countdown from '../../../components/Countdown';
import Plan from '../../../components/Plan';
import InviteFriends from './InviteFriends';
import PopupPost from '../Social/PopupPost';
import Social from '../Social'
import DayOverview from './DayOverview';

const { height } = Dimensions.get('window');

class Component extends React.Component {
  PopupPostRef;

  // TODO: there should be a redux action here to push plan day data to store
  //       move this to ChallengeDetail?
  async componentDidMount() {
    const { challenge, MyChallenge } = this.props;
    const { plan } = MyChallenge;

    const currentDay = getDaysSinceStart(challenge);
    const dayData = await getPlanDayData(plan, challenge);
    const day = getDayData(dayData, currentDay);

    const isChallengeActive = hasChallengeStarted(challenge);
    if (isChallengeActive) {
      MyChallengeActions.setMyDay(day);
    }

    MyChallengeActions.setMyChallenge(challenge);
    MyChallengeActions.setCurrentDay(currentDay);
    MyChallengeActions.setPlanDayData(dayData);
  }

  render() {
    const { challenge, user, setContentContainerHeight, MyChallenge } = this.props;
    const { plan, day, currentDay } = MyChallenge;

    const isChallengeActive = hasChallengeStarted(challenge);
    const secondsTilStart = getSecondsTilStart(challenge);

    const onPress = () => Actions.PlanOverview();

    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.blueText}>Hosted by {challenge.Host}</Text>
          <Text style={styles.title}>{challenge.title}</Text>

          <View
            style={styles.contentContainer}
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setContentContainerHeight(height - 100);
            }}
          >
            {!isChallengeActive ? (
              <>
                <Countdown
                  initialTime={secondsTilStart}
                  centerTitle
                  containerStyle={styles.countdownContainer}
                />
                <InviteFriends />
                <View style={styles.planContainer}>
                  <Plan
                    value={plan}
                    blueButton
                    onPress={onPress}
                  />
                </View>
              </>
            ) : (
                <DayOverview
                  currentDay={currentDay}
                  day={day}
                  onPress={onPress}
                />
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
    marginTop: height / 2 - 20, // TODO: make const
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

export default connect(({ user, MyChallenge }) => ({
  user,
  MyChallenge
}))(Component);
