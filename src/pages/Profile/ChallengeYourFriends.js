import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default function Component() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.picture}
        resizeMode="contain"
        source={require('dash/src/res/ChallengeYourFriends2.png')}
      />
      <Text style={styles.title}>Challenge Your Friends</Text>
      <Text style={styles.subTitle}>
        Create group challenges, share photos,
            </Text>
      <Text style={styles.subTitle}>and keep eachother motivated.</Text>
      <TouchableOpacity>
        <Text style={styles.invite}>Invite Friends</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  picture: {
    width: 217,
    height: 217,
    marginBottom: -30,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    lineHeight: 24,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: '#859AB6',
    textAlign: 'center',
  },
  invite: {
    paddingVertical: 10,
    paddingHorizontal: 23,
    fontSize: 16,
    borderRadius: 40,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
    marginTop: 20,
    backgroundColor: '#E9F6FF'
  }
});

Component.defaultProps = {};
