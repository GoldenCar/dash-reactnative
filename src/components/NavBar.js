import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {BackArrow} from './Icons';

export default function Component(props) {
  const {title, icon, iconRight, iconRightPadding, styleContainer} = props;

  return (
    <View style={[styles.container, styleContainer]}>
      <View style={styles.iconContainer}>
        {icon ? (
          icon
        ) : (
          <TouchableOpacity 
          onPress={() =>{
             Actions.pop(); setTimeout(() => { 
             Actions.refresh({ refresh:true });           
          }, 500);}} 
          style={styles.iconContainerContent}
          >
            <BackArrow />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[styles.iconContainer1, {paddingHorizontal: iconRightPadding}]}>
        {iconRight ? iconRight : <View />}
      </View>
    </View>
  );
}

Component.defaultProps = {
  title: '',
  icon: false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F9FB',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#F0F5FA',
  },
  iconContainer: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:38,
    height:38,
    backgroundColor:"#ffffff",
    borderRadius:19,
    justifyContent: 'center',
    alignItems:"center"
  },
  iconContainerContent:{
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  iconContainer1: {
    paddingHorizontal: 10,
    width:38,
    height:38,
    borderRadius:19,
    justifyContent: 'center',
    alignItems:"center"
  },
  title: {
    color: '#292E3A',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

Component.defaultProps = {
  iconRightPadding: 10,
  styleContainer: {},
};
