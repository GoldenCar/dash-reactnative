import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { getCircuitThumbnailUrl } from '../../helpers/workout';
import * as planActions from '../../actions/plans';

export default function (props) {
  const { task } = props;

  let subtitle = '';
  if (task.flag === 'exercise') {
    subtitle = `${task.RepsCount} ${task.Reps}`;
  }

  const [fullTask, setTask] = useState(task);

  // TODO: pull this out
  useEffect(() => {
    const getData = async () => {
      if (fullTask.flag !== 'exercise') {
        return;
      }

      const allExerciseData = await planActions.getExerciseData(fullTask.cardUUID);
      const exerciseData = allExerciseData.exercisesData.filter((e) => e.id === fullTask.cardExerciseID);
      if (exerciseData.length >= 1) {
        fullTask.exerciseData = exerciseData[0];
        setTask(task);
      }
    }

    getData();
  }, []);

  const thumbnailURL = getCircuitThumbnailUrl(fullTask);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={thumbnailURL}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
