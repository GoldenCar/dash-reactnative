import React from 'react';
import { View, ScrollView, Dimensions, Text, Animated, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Globe, Add, ChevronRight } from 'dash/src/components/Icons/index';
import ViewedBy from 'dash/src/components/Challenge/ViewedBy';
import LightButton from 'dash/src/components/LightButton';

import Header from './Header';

const { height } = Dimensions.get('window');

export default class Component extends React.Component {
  AuthPopupRef;
  ScrollViewAnimation = new Animated.Value(0);

  render() {
    const { challenge, user } = this.props;

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.ScrollViewAnimation } } }],
      { useNativeDriver: false },
    );

    return (
      <View style={styles.container}>
        <Header
          ScrollViewAnimation={this.ScrollViewAnimation}
          {...this.props}
        />
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>


          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 40,
    flex: 1,
  },
  innerContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 1,
    marginTop: height / 2 - 20
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  hostedByName: {
    color: '$lightBlue',
  },
  hostedBy: {
    color: '#586178',
    marginLeft: 15,
    fontFamily: 'Poppins-Bold',
  },
  hostedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  joinChallengeText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  joinChallengeContainer: {
    marginTop: 50,
    backgroundColor: '#00A1FF',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#292E3A',
    marginBottom: 15,
    marginTop: 20,
  },
  publicText: {
    fontSize: 12,
    color: '#1AA0FF',
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    letterSpacing: 0.9,
    lineHeight: 13,
    marginTop: 4,
  },
  globeContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9F6FF',
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  title: {
    color: '#21293D',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
  },
  paddingHorizontal: {
    paddingHorizontal: 15,
  },
});
