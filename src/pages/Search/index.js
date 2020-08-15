import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Challenge from '../../components/Challenge';

import Search from '../../components/Search';
import {Close, BackArrow} from '../../components/Icons';

import NavBar from '../../components/NavBar';
import Plan from '../../components/Plan';

import {Actions} from 'react-native-router-flux';
import * as plansActions from '../../actions/plans';

function Component(props) {
 
  const challenges = props.challenges.filter(
    (v) => v.Featured === "yes",
  );

  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const init = async () => {
      try {
        const data = await plansActions.getPlans();
        console.log("categories1.....", data)
        setPlans(data);
      } catch (e) {}
    };
    init();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle} bounces={false}>
        <Text style={styles.title}>Search</Text>
          <Search />

          {/* <Close /> */}
          <TouchableOpacity onPress={() => Actions.pop()} style={{width: 40, alignItems:"center"}}>
            {/* <BackArrow /> */}
            <Icon name={'close'} color="#B6BCCA" size={20} />
          </TouchableOpacity>

        {/* <View style={styles.challengesContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {challenges.map((value, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => Actions.ChallengeDetail({challenge: value})}
                // onPress={() => Actions.ExplorePost()}
                >
                <View>
                  <Challenge value={value} viewedBy={viewedBy} explore />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </ScrollView>

          <View style={styles.hostContainer}>
            <Text style={[styles.title, { marginBottom: 10 }]}>Host a Challenge</Text>
            <Text style={styles.subtitle}>
              Choose one of our plans and host a challenge for you and your friends
            </Text>
          </View>
          {plans.map((value, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => {}}
                >
                  <Plan value={value} />
              </TouchableWithoutFeedback>
            ))}
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  challengesContainer: {
    marginTop: 30,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#21293D',
    marginHorizontal: 15,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#21293D',
    marginHorizontal: 15
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 100,
  },
  search: {
    position: 'absolute',
    right: 20,
    top: 30
  },
  hostContainer: {
    marginBottom: 30
  }
});
export default connect(({challenges}) => ({
  challenges,
}))(Component);
