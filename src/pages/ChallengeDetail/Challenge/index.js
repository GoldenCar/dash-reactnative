import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { getDaysCompleted, getDaysElapsed } from '../../../helpers/challenge';
import { getSecondsTilStart } from '../../../helpers/date';
import { getPlanDayData } from '../../../helpers/plan';
import * as MyChallengeActions from '../../../actions/MyChallenges';

import Countdown from '../../../components/Countdown';
import Plan from '../../../components/Plan';
import InviteFriends from './InviteFriends';
import PopupPost from '../Social/PopupPost';
import Social from '../Social'
import DayOverview from './DayOverview';

const { height } = Dimensions.get('window');

class Component extends React.Component {
  AuthPopupRef;
  PopupPostRef;

  state = {
    dayData: []
  }

  // TODO: there should be a redux action here to push plan day data to store
  async componentDidMount() {
    const { challenge, MyChallenge } = this.props;

    const { plan } = MyChallenge;

    // TODO: move to store
    const dayData = await getPlanDayData(plan, challenge);
    this.setState({ dayData });

    MyChallengeActions.setMyChallenge(challenge);
  }

  render() {
    const { dayData } = this.state;
    const { challenge, user, setContentContainerHeight, MyChallenge } = this.props;
    const { plan } = MyChallenge;

    const currentDay = getDaysElapsed(challenge);

    // TODO: move to helper
    const secondsTilStart = getSecondsTilStart(challenge);
    const hasStarted = secondsTilStart <= 0;

    // TODO: why doesn't plan overview do this? or put in store?
    const daysCompleted = getDaysCompleted(user.myStep, challenge);

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
            {!hasStarted ? (
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
                    onPress={() => Actions.PlanOverview()}
                  />
                </View>
              </>
            ) : (
                <DayOverview
                  currentDay={currentDay}
                  dayData={dayData}
                  challenge={challenge}
                  user={user}
                  onPress={() => Actions.PlanOverview({
                    //daysCompleted
                  })}
                  plan={plan}
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

export default connect(({ user, MyChallenge }) => ({
  user,
  MyChallenge
}))(Component);
