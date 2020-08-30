import React from 'react';
import {View, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavBar from '../../../components/NavBar';
import Item from './Item';

const PreviousChallenges = props => {
    return (
      <View style={styles.container}>
          <NavBar styleContainer={{backgroundColor:'white'}} shadow={false} title="My Past Challenges" />
          <ScrollView contentContainerStyle={{backgroundColor:'#F0F5FA', paddingTop:100, paddingHorizontal:16}} style={{marginBottom:70}}>
            <Item progress={100}/>
            <Item progress={100}/>
            <Item progress={100}/>
            <Item progress={100}/>
            <Item progress={100}/>
            <Item progress={50}/>
            <Item progress={30}/>
            <Item progress={60}/>
          </ScrollView>
      </View>
    );
}

const styles = EStyleSheet.create({
  containerGradiend: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  containerBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 350,
  },
  contentContainerStyle: {
    paddingTop: 280,
    paddingBottom: 75,
  },
  container: {
    flex: 1,
  },
});

export default PreviousChallenges