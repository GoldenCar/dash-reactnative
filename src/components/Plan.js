import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path } from 'react-native-svg';

import { mediaHost } from 'dash/src/config';

const SVG_D = "M4.47953 3.52047L1.14619 0.187141C1.02046 0.0657025 0.852056 -0.00149374 0.677258 2.52017e-05C0.50246 0.00154415 0.335252 0.0716568 0.211646 0.195262C0.0880411 0.318868 0.0179284 0.486076 0.0164095 0.660874C0.0148905 0.835672 0.0820867 1.00407 0.203525 1.12981L3.06553 3.99181L0.203525 6.85381C0.139852 6.91531 0.0890639 6.98887 0.0541246 7.07021C0.0191852 7.15154 0.000794382 7.23902 2.51711e-05 7.32754C-0.00074404 7.41606 0.0161238 7.50385 0.0496444 7.58578C0.083165 7.66771 0.132667 7.74214 0.195262 7.80474C0.257857 7.86733 0.332292 7.91684 0.414223 7.95036C0.496154 7.98388 0.58394 8.00074 0.67246 7.99998C0.760979 7.99921 0.848459 7.98082 0.929795 7.94588C1.01113 7.91094 1.08469 7.86015 1.14619 7.79647L4.47953 4.46314C4.60451 4.33812 4.67472 4.16858 4.67472 3.99181C4.67472 3.81503 4.60451 3.64549 4.47953 3.52047Z";

export default function Component(props) {
  const { blueButton, value, onPress, useDefaultMargin } = props;

  const containerStyles = [styles.container];
  if (useDefaultMargin) {
    containerStyles.push({
      marginHorizontal: 16,
      marginVertical: 5
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#FFFFFF', '#E7EEF5']}
        style={containerStyles}
        start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }}
      >
        <View style={styles.left}>
          <Text style={styles.title}>
            {value.title}
          </Text>
          {blueButton ? (
            <View style={styles.blueButton}>
              <Text style={styles.blueButtonText}>View Plan</Text>
              <Svg width={5} height={8} viewBox="0 0 5 8" fill="none">
                <Path
                  d={SVG_D}
                  fill="#1AA0FF"
                />
              </Svg>
            </View>
          ) : (
              <Text style={styles.description}>
                {value.description}
              </Text>
            )}
        </View>
        <View>
          <Image
            source={{ uri: `${mediaHost}${value.planImage}` }}
            style={styles.image}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>

  );
}

Component.defaultProps = {

};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
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
  blueButton: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  blueButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: '#1AA0FF',
    alignItems: 'center',
    paddingRight: 8
  },
  image: {
    flex: 1,
    width: 120,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  }
});
