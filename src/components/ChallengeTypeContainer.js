import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from '../pages/CreateNewChallenge/Video';

export default function Component(props) {
  const {item, containerStyle, onPress, nextTitle = 'Select Plan'} = props;
  const Touch = onPress ? TouchableOpacity : View;
  const [play, setPlay] = useState(false);
  const [load, setLoad] = useState(false);
  const videoRef = React.createRef(null);

  return (
    <Touch
      style={[styles.challengeTypeContainer, containerStyle]}
      onPress={onPress}
    >
      <View
        style={[
          styles.challengeTypeStart,
          { backgroundColor: item.color }
        ]}>
          <Video
            play={play}
            load={load}
            item={item}
            videoRef={videoRef}
            setLoad={setLoad}
            setPlay={setPlay}
            onPress={onPress}
            nextTitle={nextTitle}
          />
          <TouchableOpacity style={styles.trailerBox} onPress={() => setPlay(true)}>
            <FontAwesome
              style={styles.arrowTrailer}
              name={'play'}
              color="#000000"
              size={12}
            />
            <Text style={styles.trailerText}>
              TRAILER
            </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.challengeTypeMain}>
        <Text style={styles.typeName}>{item.title}</Text>
        <Text style={styles.typeDescription}>{item.description}</Text>
      </View>
      {props.children}
    </Touch>
  );
}

const styles = StyleSheet.create({
  typeDescription: {
    color: '#21293D',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.6,
  },
  typeName: {
    color: '#21293D',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    lineHeight: 24,
  },
  challengeTypeMain: {
    flex: 1,
    marginTop:20,
    paddingHorizontal: 15,
    alignSelf:"flex-start",
    paddingVertical: 20,
  },
  challengeTypeStart: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  challengeTypeContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 40,
    overflow: 'hidden',
    alignItems:"center",
    elevation:1
  },
  trailerBox: {
    flexDirection:"row",
    backgroundColor:"#ffffff",
    borderRadius:15,
    paddingLeft:17,
    paddingRight:17,
    paddingTop:7,
    paddingBottom:7,
    marginTop:-50,
    alignSelf:"flex-end",
    marginRight:15
  },
  arrowTrailer: {
    marginTop:3
  },
  trailerText: {
    marginLeft:11,
    fontSize:10,
    marginTop:2,
    fontFamily: 'Poppins-Bold',
    letterSpacing:2
  }
});

Component.defaultProps = {};
