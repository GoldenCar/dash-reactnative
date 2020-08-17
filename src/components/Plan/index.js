import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { mediaHost } from 'dash/src/config';

export default function Component(props) {
  const { value } = props;

  return (
    <LinearGradient
      colors={['#FFFFFF', '#E7EEF5']}
      style={styles.container}
      start={{x: 1, y: 0}} end={{x: 0, y: 0}}
    >
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
      </LinearGradient>
  );
}

Component.defaultProps = {

};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    marginHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E7EEF5'
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
    color: '#21293D',
    fontSize: 14
  },
  description: {
    fontFamily: 'Poppins-Regular',
    color: '#8A98B7',
    fontSize: 12,
    lineHeight: 20
  },
  image: {
    flex: 1,
    width: 100,
    overflow: 'hidden', 
    borderTopRightRadius: 25, 
    borderBottomRightRadius: 25
  }
});
