import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Stories from './Stories';

export default class App extends React.Component {
  state = {
    ready: false,
    stories: [],
    arrayVersionTask: []
  };

  componentDidMount() {
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    const { stories, arrayVersionTask, user, challenge } = this.props;

    if (!ready) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Stories
          stories={stories}
          dayTasks={arrayVersionTask}
          challenge={challenge}
          user={user} />
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
