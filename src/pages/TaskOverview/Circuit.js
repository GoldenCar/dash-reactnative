import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import CircuitIcon from './CircuitIcon';

import { getCircuitThumbnail } from '../../helpers/workout';
import * as planActions from '../../actions/plans';

export default function Component(props) {
  const { task } = props;
  const [height, setHeight] = useState(300);

  const exerciseCards = task.exeerciseCards || [];
  const rounds = task.Cycles;

  const [cards, setCards] = useState(exerciseCards);

  // TODO: pull this out
  useEffect(() => {
    const getCardData = async () => {
      // TODO: this is a fucking mess. issues with request + data structure
      for (let i = 0; i < exerciseCards.length; i++) {
        let exercise = exerciseCards[i];

        const cardID = exercise.cardUUID;
        const exerciseID = exercise.cardExerciseID;

        if (cardID && exerciseID) {
          const response = await planActions.getExerciseData(cardID, exerciseID);
          exerciseCards[i].exerciseData = response;
        }
      }

      // setCards(exerciseCards);
    };

    getCardData();
  }, []);

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
          {rounds} Rounds
        </Text>

        {cards.map((exercise) => {
          const thumbnailUrl = getCircuitThumbnail(exercise);

          let subtitle = '';
          if (exercise.flag === 'exercise') {
            subtitle = `${exercise.RepsCount} ${exercise.Reps}`;
          }

          return (
            <View style={styles.cell}>
              <View style={styles.image}>
                <Image
                  source={thumbnailUrl}
                  style={styles.image}
                />
              </View>
              <View>
                <Text style={styles.taskTitle}>{exercise.title}</Text>
                <Text style={styles.taskBlueText}>{subtitle}</Text>
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
