import React, { useState } from 'react';
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
import Challenge from '../../components/Challenge';

const viewedBy = [
  {
    picture: require('dash/src/res/viewedBy/4.png'),
  },
  {
    picture: require('dash/src/res/viewedBy/3.png'),
  },
  {
    picture: require('dash/src/res/viewedBy/1.jpg'),
  },
  {
    picture: require('dash/src/res/viewedBy/2.jpg'),
  },
  {},
  {},
  {},
  {},
]

function Component(props) {

  // TODO: clean up search style

  const [search, setSearchValue] = useState('');

  let results = [];
  if (search.length > 0) {
    results = props.challenges.filter((challenge) => {
      const { category, title } = challenge;
      return category.includes(search) || title.includes(search);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Text style={styles.title}>Search</Text>
        <Search 
          autoFocus 
          value={search}
          onChangeText={(value) => setSearchValue(value)}
        />

        <TouchableOpacity 
          onPress={() => Actions.pop()}
          style={styles.close}
        >
          <Icon name='close' color="#B6BCCA" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle} bounces={false}>
        <View style={{
          backgroundColor: '#B6BCCA',
          flex: 1
        }}>
        {results.map((value, index) => (
            <View key={index}>
              <Challenge value={value} viewedBy={viewedBy} explore />
            </View>
        ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
  },
  contentContainerStyle: {
    paddingTop: 30,
    paddingBottom: 30,
    // backgroundColor: '#B6BCCA',
   // flex: 1
  },
  searchSection: {
    paddingBottom: 20
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#21293D',
    marginHorizontal: 15,
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
