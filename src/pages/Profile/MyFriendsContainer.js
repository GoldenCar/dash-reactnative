import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import ViewedBy from '../../components/Challenge/ViewedBy';
import LightButton from '../..//components/LightButton';

import { Add } from 'dash/src/components/Icons';
import { Actions } from 'react-native-router-flux';

export default function Component(props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>My friends</Text>
        <TouchableOpacity onPress={() => Actions.Friends()}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <ViewedBy viewedBy={props.list} />
        <LightButton
          title="Add New"
          iconLeft={<Add stroke="#1AA0FF" height="10" width="10" />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  viewAll: {
    color: '#96AAC6',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  title: {
    color: '#292E3A',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  top: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F5FA',
  },
});

Component.defaultProps = {};
