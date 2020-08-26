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
    flex: 1,
    marginTop: height / 2 - 20
  },
});
