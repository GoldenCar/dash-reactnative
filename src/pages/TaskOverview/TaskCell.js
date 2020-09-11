import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { getCircuitThumbnail } from '../../helpers/workout';
import * as planActions from '../../actions/plans';

export default function (props) {
  const { task } = props;
  const [completeTask, setTask] = useState(task);

  const { flag, title, RepsCount, Reps } = completeTask;

  // TODO - DATA CLEAN UP: pull this out (duplicated in Circuit)
  useEffect(() => {
    const getData = async () => {
      if (flag !== 'exercise') {
        return;
      }

      const cardID = completeTask.cardUUID;
      const exerciseID = completeTask.cardExerciseID;

      const response = await planActions.getExerciseData(cardID, exerciseID);
      if (response) {
        completeTask.exerciseData = response;
        setTask(completeTask);
      }
    }

    getData();
  }, []);

  const thumbnailURL = getCircuitThumbnail(completeTask);
  const subtitle = flag === 'exercise' ? `${RepsCount} ${Reps}` : '';

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={thumbnailURL}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
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
