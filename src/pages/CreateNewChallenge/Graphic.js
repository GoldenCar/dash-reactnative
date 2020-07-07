import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Add, Check} from 'dash/src/components/Icons';
import {Actions} from 'react-native-router-flux';

const {height, width} = Dimensions.get('screen');

const array = [
  {
    default: true,
    value: '1',
    uri: require('dash/src/res/graphic/1.jpg'),
  },
  {
    default: true,
    value: '2',
    uri: require('dash/src/res/graphic/2.jpg'),
  },
  {
    default: true,
    value: '3',
    uri: require('dash/src/res/graphic/3.jpg'),
  },
  {
    default: true,
    value: '4',
    uri: require('dash/src/res/graphic/4.jpg'),
  },
];

export default function Component(props) {
  const [arr, setArr] = useState(array);
  const {challenge, onPress} = props;
  return (
    <View style={styles.itemsContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          Actions.CameraRoll({
            callbackCamera: (item) => {
              const find = arr.find((v) => v.uri === item.node.image.uri);
              if (!find) {
                arr.unshift(item.node.image);
                setArr(arr);
                onPress(item.node.image);
              }
            },
            onePhoto: true,
          })
        }>
        <View style={styles.center}>
          <View style={styles.circle}>
            <Add />
          </View>
          <Text style={styles.addText}>Upload</Text>
        </View>
      </TouchableOpacity>
      {arr.map((value, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => onPress(value)}>
            <Image
              source={value.default ? value.uri : {uri: value.uri}}
              resizeMode="cover"
              style={styles.picture}
            />
            {challenge.graphic &&
              ((value.filename &&
                value.filename === challenge.graphic.filename) ||
                (value.value && challenge.graphic.value === value.value)) && (
                <View style={styles.checkContainer}>
                  <Check />
                </View>
              )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  checkContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: '#1AA0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#292E3A',
    marginTop: 15,
  },
  circle: {
    height: 65,
    width: 65,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F0F5FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    width: width / 2 - (15 + 7.5),
    height: width / 2 - (15 + 7.5),
  },
  item: {
    margin: 7.5,
    width: width / 2 - (15 + 7.5),
    height: width / 2 - (15 + 7.5),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F0F5FA',
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

Component.defaultProps = {};
