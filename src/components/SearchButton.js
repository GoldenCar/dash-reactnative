import React from 'react';
import {View, StyleSheet} from 'react-native';

import SearchIcon from './Icons/SearchIcon';

export default function Component(props) {
  return (
    <View style={[styles.container, props.style]}>
      <SearchIcon stroke='black' height={15} width={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }
});

Component.defaultProps = {};
