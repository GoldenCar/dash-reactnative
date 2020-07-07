import React from 'react';
import {StatusBar, View, ActivityIndicator, StyleSheet} from 'react-native';
import Stories from './Stories';

const stories = [
  {
    id: '2',
    source: require('dash/src/res/friends/friend1.png'),
    user: 'derek.russel',
    avatar: require('dash/src/res/friends/friend1.png'),
    timer: [5, 30],
    videos: [
      require('dash/src/res/video/Jump-Squat.mp4'),
      require('dash/src/res/video/Wall-Ball.mp4'),
    ],
  },
  {
    id: '4',
    source: require('dash/src/res/friends/friend1.png'),
    user: 'jmitch',
    avatar: require('dash/src/res/friends/friend1.png'),
    timer: [15, 20],
    videos: [
      require('dash/src/res/video/Wall-Ball.mp4'),
      require('dash/src/res/video/Jump-Squat.mp4'),
      require('dash/src/res/video/Wall-Ball.mp4'),
    ],
  },
];

export default class App extends React.Component {
  state = {
    ready: false,
  };

  async componentDidMount() {
    this.setState({ready: true});
  }

  render() {
    const {ready} = this.state;
    if (!ready) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <Stories {...{stories}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
});
