import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class extends React.Component {
  render() {
    const { task } = this.props;

    console.log('TASK CELL', task);


    let subtitle = '';
    if (task.flag === 'exercise') {
      subtitle = `${task.RepsCount} ${task.Reps}`;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {task.title}
        </Text>
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 88
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#3F434F'
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#1AA0FF'
  }
});
