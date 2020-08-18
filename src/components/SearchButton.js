import React from 'react';
import {View, StyleSheet} from 'react-native';

import SearchIcon from './Icons/SearchIcon';

export default function Component(props) {
  return (
    <View style={[styles.container, props.style]}>
      <SearchIcon stroke='#586178' height={15} width={15} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E7EEF5',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: .3
  }
});

Component.defaultProps = {};
