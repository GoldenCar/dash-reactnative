import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import * as planActions from '../../../actions/plans';

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

  state = {
    dayData: []
  }

  async componentDidMount() {
    const { plan } = this.props;

    // TODO: clean this up & pull into it's own function
    const planData = await planActions.getPlanTasks(plan._id);
    if (planData.planTypeData.length === 0) {
      return;
    }

    // TODO: is it okay to assume it's the first one? need to test with plan with 2 versions
    const versionData = planData.planTypeData[0];
    if (!versionData || !versionData.versionData || versionData.versionData.length === 0) {
      return;
    }

    const dayData = versionData.versionData[0].planVersionDayTaskData;
    this.setState({ dayData });
  }

  render() {
    const { dayData } = this.state;
    const { challenge, plan, user, setContentContainerHeight } = this.props;

    const now = moment(new Date());
    const startDate = new Date(challenge.startDate);

    const secondsTilStart = moment(startDate).diff(now, 'seconds');
    const hasStarted = secondsTilStart <= 0;
    const currentDay = moment(now).diff(startDate, 'days');

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
                    onPress={() => Actions.PlanOverview({ challenge, plan })}
                  />
                </View>
              </>
            ) : (
                <DayOverview
                  currentDay={currentDay}
                  dayData={dayData}
                  challenge={challenge}
                  user={user}
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
