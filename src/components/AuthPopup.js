import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AppleGoogleSignInButtons from './AppleGoogleSignInButtons';

const { height, width } = Dimensions.get('screen');

// TODO: turn into page

export default class Component extends React.Component {
  translateY = new Animated.Value(1);

  state = {
    visible: false,
    callback: null
  };

  showOpenAnimation = () => {
    Animated.timing(this.translateY, {
      toValue: 0,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  open = (callback) => {
    if (callback) {
      this.setState({ callback });
    }

    this.setState({ visible: true }, () => this.showOpenAnimation());
  }

  close = (user) => {
    const { callback } = this.state;
    Animated.timing(this.translateY, {
      toValue: 1,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        this.setState({ visible: false });

        if (callback) {
          callback(user);
        }

      }
    });
  }

  render() {
    const opacity = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const translateY = this.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 350],
      extrapolate: 'clamp',
    });

    return (
      this.state.visible && (
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={this.close}>
            <Animated.View style={[styles.container, { opacity }]} />
          </TouchableWithoutFeedback>
          <Animated.View
            style={[
              { transform: [{ translateY }] },
              styles.modalContainer,
            ]}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={this.close}>
                <Icon name={'close'} color="#B6BCCA" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>Join Dash</Text>
              <Text style={styles.text}>Join Liza Koshy on her 30 day</Text>
              <Text style={styles.text}>challenge and get healthier.</Text>
              <AppleGoogleSignInButtons callback={this.close} />
            </View>
          </Animated.View>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalContainer: {
    marginTop: height - 350,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginHorizontal: 0,
    height: 350,
    overflow: 'hidden',
    zIndex: 1001,
  },
  text: {
    color: '#6F80A7',
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  title: {
    color: '#292E3A',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  overlay: {
    width,
    height,
    position: 'absolute',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  closeButton: {
    padding: 20,
  },
});
