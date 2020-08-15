import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from 'react-native-router-flux';

import Search from '../../components/Search';

function Component(props) {
  return (
    <View style={styles.container}>
      <View style={{
        paddingBottom: 20
      }}>
        <Text style={styles.title}>Search</Text>
        <Search autoFocus />

        <TouchableOpacity 
          onPress={() => Actions.pop()}
          style={styles.close}
        >
          <Icon name='close' color="#B6BCCA" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle} bounces={false}></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  challengesContainer: {
    marginTop: 30,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#21293D',
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    paddingTop: 30
  },
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 100,
    backgroundColor: '#B6BCCA',
    flex: 1
  },
  close: {
    position: 'absolute',
    right: 20,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#96AAC6'
  }
});
export default connect(({challenges}) => ({
  challenges,
}))(Component);
