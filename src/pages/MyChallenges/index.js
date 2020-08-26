import React from 'react';
import { View, Dimensions, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EStyleSheet from 'react-native-extended-stylesheet';
import Carousel from 'react-native-snap-carousel';
import { Actions } from 'react-native-router-flux';

import Plus from './Icons/Plus';
import Challenge from '../../components/Challenge';

import * as challengesActions from '../../actions/challenges';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 60;

// TODO: this needs more clean up
// TODO: convert to functional component

class Component extends React.Component {
  state = {
    arrayAllChallenges: [],
  };

  componentDidMount = async () => {
    this.getData();
    this.props.navigation.addListener('willFocus', () => {

      this.callApiToGetChallenges();
    });
    this.callApiToGetChallenges();
  };

  callApiToGetChallenges = async () => {
    this.setState({ refresh: true });
    const response = await challengesActions.getAllChallengesOfDB();
    this.setState({ arrayAllChallenges: response });
  }

  getData = async () => {
    const { user } = this.props;
    if (user) {
      await challengesActions.getMyChallenges();
    }
  };

  renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => Actions.ChallengeDetail({ challenge: item })}
      >
        <Challenge
          value={item}
          explore
          cardWidth={ITEM_WIDTH}
        />
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { arrayAllChallenges } = this.state;
    const { user } = this.props;

    let challenges = [];
    if (user && user._id) {
      challenges = arrayAllChallenges.filter(
        (v) => v.createdBy === user._id && v.status === 'start',
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#E7EEF5', '#fff']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.heading}>Your {'\n'} Challenges</Text>
          <View style={styles.newButton}>
            <Plus />
            <Text style={styles.buttonText}>New</Text>
          </View>
          <View>
            <Carousel
              data={challenges}
              sliderWidth={width}
              itemWidth={ITEM_WIDTH}
              renderItem={this.renderItem}
              activeSlideAlignment='start'
              loop
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

export default connect(({ user, challenges }) => ({
  user,
  challenges,
}))(Component);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    lineHeight: 39,
    color: '#3F434F',
    marginHorizontal: 16,
    marginBottom: 13
  },
  newButton: {
    width: 81,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7EEF5',
    // box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.08);
    borderRadius: 40,
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#3F434F'
  }
});
