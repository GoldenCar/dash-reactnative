import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';

import Challenge from '../../components/Challenge';
import SearchButton from '../../components/SearchButton';
import NavBar from '../../components/NavBar';
import Plan from '../../components/Plan';

import {Actions} from 'react-native-router-flux';
import * as plansActions from '../../actions/plans';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width - 60;

const viewedBy = [
  {
    picture: require('dash/src/res/viewedBy/4.png'),
  },
  {
    picture: require('dash/src/res/viewedBy/3.png'),
  },
  {
    picture: require('dash/src/res/viewedBy/1.jpg'),
  },
  {
    picture: require('dash/src/res/viewedBy/2.jpg'),
  },
  {},
  {},
  {},
  {},
]

const array = [
  {
    picture: require('dash/src/res/explore/1.png'),
    title: 'Chris Bumstead 30 Day Challenge',
    startsIn: 'Starts in 3 Days',
    viewedBy: [
      {
        picture: require('dash/src/res/viewedBy/1.jpg'),
      },
      {
        picture: require('dash/src/res/viewedBy/2.jpg'),
      },
      {
        picture: require('dash/src/res/viewedBy/3.png'),
      },
      {
        picture: require('dash/src/res/viewedBy/4.png'),
      },
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  },
  {
    picture: require('dash/src/res/explore/2.png'),
    title: 'David Dobrik 30 Day Challenge',
    startsIn: 'Starts in 3 Days',
    viewedBy: [
      {
        picture: require('dash/src/res/viewedBy/4.png'),
      },
      {
        picture: require('dash/src/res/viewedBy/3.png'),
      },
      {
        picture: require('dash/src/res/viewedBy/1.jpg'),
      },
      {
        picture: require('dash/src/res/viewedBy/2.jpg'),
      },
      {},
      {},
      {},
      {},
    ],
  },
];

function renderItem({item, index}) {
  return (
    <TouchableWithoutFeedback
      key={index}
      //onPress={() => Actions.ChallengeDetail({challenge: value})}
      onPress={() => Actions.ExplorePost({ challenge: item })}
    >
      <View>
        <Challenge 
          value={item}
          viewedBy={viewedBy}
          explore
          cardWidth={ITEM_WIDTH}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

function Component(props) {
 
  const challenges = props.challenges.filter(
    (v) => v.Featured === "yes",
  );

  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const requestPlans = async () => {
      try {
        const data = await plansActions.getPlans();
        console.log("categories1.....", data);
        const currentPlans = data.filter((plan) => plan.status === 'current');
        setPlans(currentPlans);
      } catch (e) {}
    };
    requestPlans();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}  bounces={false}>
        <TouchableOpacity style={styles.search} onPress={() => Actions.Search()}>
          <SearchButton />
        </TouchableOpacity>
        <View style={styles.challengesContainer}>
        { /* TODO: fix this gradient (top 300px of explore section) */ }
        {/* <LinearGradient 
          colors={['#F0F5FA', 'rgb(240, 245, 250)']}
          style={{
            position: 'absolute',
            height: 300,
            top: 0,
            zIndex: 1
          }}
        /> */}
          <Text style={styles.title}>Explore</Text>
          <Carousel
            data={challenges}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
            renderItem={renderItem}
            activeSlideAlignment='start'
          />
        </View>

        <View style={styles.hostContainer}>
          <Text style={styles.hostTitle}>Host a Challenge</Text>
          <Text style={styles.subtitle}>
            Choose one of our plans and host a challenge for you and your friends
          </Text>
          {plans.map((value, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {}}
              >
                <Plan value={value} />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 100,
  },
  challengesContainer: {
    paddingTop: 30,
    paddingBottom: 30
  },
  hostContainer: {
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#3F434F',
    marginHorizontal: 16,
    marginBottom: 30
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8A98B7',
    marginHorizontal: 16,
    marginBottom: 22,
    fontWeight: '500',
    lineHeight: 24,
  },
  search: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 10
  },
  hostTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: .7,
    color: '#3F434F',
    marginHorizontal: 16,
    marginBottom: 13
  }
});
export default connect(({challenges}) => ({
  challenges,
}))(Component);
