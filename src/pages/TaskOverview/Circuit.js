import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import CircuitIcon from './CircuitIcon';

export default function Component(props) {
  const { task } = props;
  const [height, setHeight] = useState(300);

  console.log('CIRCUIT TASK', task);

  const exerciseCards = task.exeerciseCards || [];

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <CircuitIcon height={height} />
      </View>
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeight(height - 8);
        }}
      >
        <Text style={styles.heading}>Circuit</Text>
        <Text style={styles.headingSubtitle}>
          5 Rounds
        </Text>
        {exerciseCards.map((exercise) => {
          return (
            <View style={styles.cell}>
              <View style={styles.image}></View>
              <View>
                <Text style={styles.taskTitle}>{exercise.title}</Text>
                <Text style={styles.taskBlueText}>12-15 Reps</Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  icon: {
    width: 24,
    height: '100%',
    marginRight: 16,
    alignItems: 'center'
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
    color: '#3F434F'
  },
  headingSubtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#859AB6',
    marginBottom: 11
  },
  cell: {
    height: 88,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    height: 72,
    width: 72,
    borderRadius: 16,
    backgroundColor: 'purple',
    marginRight: 19
  },
  taskTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#3F434F'
  },
  taskBlueText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 24,
    color: '#1AA0FF'
  }
});
