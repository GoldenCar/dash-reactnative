import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import * as PostsActions from 'dash/src/actions/posts';

import Post from './Post';

class Component extends React.Component {
  PopupPostRef;
  state = {
    loading: false,
    refresh: false,
  };

  componentDidMount = () => {
    this.getData(true);
  };

  getData = async (loading = false) => {
    try {
      this.setState({ loading, refresh: true });
      await PostsActions.getPosts();
      this.setState({ loading: false, refresh: false });
    } catch (e) {
      this.setState({ loading: false, refresh: false });
    }
  };

  render() {
    const { user, challenge, PopupPostRef } = this.props;
    const posts = this.props.posts.filter(
      (v) => v.challengeId === challenge._id,
    );

    // TODO: need to be able to filter posts by all or just friends

    return (
      <LinearGradient
        colors={['#F0F5FA', '#FFFFFF']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Recent Activity</Text>
          <Text style={styles.headerBlueText}>Friends Only</Text>
        </View>

        <View style={styles.postsContainer}>
          {posts.map((value, index) => (
            <Post
              key={index}
              postId={value._id}
              user={user}
              onPressMenu={() => PopupPostRef.open()}
            />
          ))}
        </View>
      </LinearGradient>
    );
  }
}

export default connect(({ posts }) => ({
  posts,
}))(Component);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 25,
    paddingBottom: 17,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#21293D'
  },
  headerBlueText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1AA0FF'
  }
});

Component.defaultProps = {};
