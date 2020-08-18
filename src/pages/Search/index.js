import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

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
          containerStyle={styles.search}
        />
        <TouchableOpacity 
          onPress={() => Actions.pop()}
          style={styles.close}
        >
          <Icon name='close' color="#586178" size={15} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={results}
        decelerationRate={.1}
        onScroll={() => Keyboard.dismiss()}
        keyboardShouldPersistTaps='always'
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity onPress={() => Actions.ExplorePost({ challenge: item })}>
            <Challenge value={item} viewedBy={viewedBy} explore />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <LinearGradient 
            colors={['#F0F5FA', 'rgb(240, 245, 250)']}
            style={{ flex: 1 }}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
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
    borderWidth: 1,
    borderColor: '#E7EEF5'
  },
  search: {
    marginHorizontal: 0,
    borderWidth: 0
  }
});
export default connect(({challenges}) => ({
  challenges,
}))(Component);
