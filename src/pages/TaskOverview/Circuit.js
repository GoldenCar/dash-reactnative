import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

export default class extends React.Component {
  render() {
    const { task } = this.props;

    console.log('CIRCUIT TASK', task);

    const exerciseCards = task.exeerciseCards || [];

    return (
      <View>
        {exerciseCards.map((exercise) => {
          return (
            <View>
              <Text>{exercise.title}</Text>
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
