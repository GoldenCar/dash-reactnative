import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { mediaHost } from 'dash/src/config';

export default function Component(props) {
  const { value } = props;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>
        {value.title}
        </Text>
        <Text style={styles.description}>
          {value.description}
        </Text>
      </View>
      <View>
        <Image 
          source={{uri: `${mediaHost}${value.planImage}`}}
          style={styles.image}
        />
      </View>
    </View>
  );
}

Component.defaultProps = {

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f5fa',
    borderRadius: 25,
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row'
  },
  left: {
    flex: 3,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 5
  },
  title: {
    fontFamily: 'Poppins-Bold',
    paddingBottom: 7.5,
    color: '#21293D'
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#21293D',
    fontSize: 14
  },
  image: {
    flex: 1,
    width: 100,
    overflow: 'hidden', 
    borderTopRightRadius: 25, 
    borderBottomRightRadius: 25
  }
});
