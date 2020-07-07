import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import _ from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Modal from 'dash/src/components/Modal';
import RNPickerSelect from 'react-native-picker-select';
import * as challenegesActions from 'dash/src/actions/challenges';

import CreateNew from '../CreateNew';
import Title from '../Title';
import Program from '../Program';
import Description from '../Description';
import StartDate from '../StartDate';
import Graphic from '../Graphic';
import AllSet from '../AllSet';
import Access from '../Access';

import Header from './Header';

import {mediaHost} from 'dash/src/config';
//import { FlatList, ScrollView } from 'react-native-gesture-handler';
//import { TouchableOpacity } from 'react-native-gesture-handler';

const {height, width} = Dimensions.get('screen');

const defaultChallenge = {
  type: null,
  public: null,
  title: '',
  description: '',
  duration: null,
  startDate: null,
  graphic: null,
  typeProgram: null,
};
//const [cancel, setCancel] = useState(false);
//const [done, setDone] = useState(false);

class Component extends React.Component {
  CreateNewRef;
  CarouselRef;
  TitleRef;
  HeaderRef;
  state = {
    challenge: _.cloneDeep(defaultChallenge),
    currentIndex: 0,
    renderList: [0, 1],
    loading: true,
    createdChallenge: null,
    versionNum:1
  };
  
  getChallenges = async () => {
    const data = await challenegesActions.getChallenges();
    //console.log("challenges.....11111111", data)
  }

  createChallenge = async () => {
    try {
      this.setState({loading: true});
      const res = await challenegesActions.postMyChallenge(
        this.state.challenge,
      );
      this.setState({loading: false, createdChallenge: res});
    } catch (e) {
      console.log(e.message);
      console.log(e.response);
      this.setState({loading: false});
    }
  };

  openCreateNew = (create = true) => {
    if (create) {
      this.setState(
        {currentIndex: 0, challenge: _.cloneDeep(defaultChallenge), createdChallenge: null},
        () => {
          this.CreateNewRef.open({});
        },
      );
    } else {
      this.CreateNewRef.open({});
    }
  };
  closeCreateNew = ({call = () => {}}) => {
    this.CreateNewRef.close({call});
  };
  onSnapItem = (currentIndex) => {
    const renderList = this.state.renderList;
    const i = renderList.indexOf(currentIndex + 1);
    if (i === -1) {
      renderList.push(currentIndex + 1);
    }
    this.setState({renderList, currentIndex}, () => {
      if (currentIndex === 2) {
        this.TitleRef.focus();
      }
      if (currentIndex === 6 && this.props.user) {
        this.createChallenge();
      }
    });
  };
  onChangeChallenge = (value, call = () => {}) => {
    this.setState(
      {
        challenge: {
          ...this.state.challenge,
          ...value,
        },
      },
      call,
    );
  };
  onPressNext = ({call} = {}) => {
    if (this.state.currentIndex === 3) {
      Keyboard.dismiss();
    }
    this.CarouselRef.snapToNext(true);
    if (call) {
      call();
    }
  };
  onPressBack = () => {
    if (this.state.currentIndex === 2) {
      Keyboard.dismiss();
    }
    this.CarouselRef.snapToPrev();
  };

  componentDidMount(){
    //this.getChallenges();
  }

  renderChildren = () => {
    const {challenge} = this.state;
    let data = [
      () => {
        const opacity = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        });
        return (
          <Animated.ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            style={{opacity}}
            contentContainerStyle={[styles.contentContainerStyle]}>
            <View style={styles.titleContainer1}>
              <Text style={styles.titles}>Start your 30 day</Text>
              <Text style={styles.titles}>
                challenge by choosing
              </Text>
              <Text style={styles.titles}>
                the plan:
              </Text>
            </View>
            <CreateNew
              onPress={(type) => {
                this.onPressNext({
                  call: () => {
                    this.HeaderRef.next();
                    this.onChangeChallenge({type});
                  },
                });
              }}
            />
          </Animated.ScrollView>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [0, width],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        if (!challenge.type) {
          return null;
        }
        
        let items = [];

        challenge.type.planTypeData.map((item, index) => {
          items.push({label:"Version "+item.version+".0", value:item.version})
        })

        return (
          <Animated.View
            style={{
              transform: [{translateY}, {translateX}, {scale}],
            }}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentContainerStyle}>
              <View style={styles.titleContainer}>
                <View
                  style={[
                    styles.programPictureContainer
                  ]}>
                  <Image
                    style={styles.programPicture}
                    resizeMode="cover"
                    source={{uri: `${mediaHost}${challenge.type.planImage}`}}
                  />
                  <View style={styles.descriptionBody}>
                    <Text style={styles.titles}>{challenge.type.title}</Text>
                    <Text style={styles.challengeDescription}>
                      {challenge.type.description}
                    </Text>
                  </View> 
                  <View style={styles.versionBox}>
                    <View style={styles.versionsTextBox}>
                      <Text style={styles.versionText}>Version {this.state.versionNum}.0</Text>
                      <View style={styles.versionRecommendedBox}>
                        <Text style={styles.versionRecommended}>Recommended</Text>
                      </View>
                    </View>                    
                    <TouchableOpacity style={styles.editButton}>
                      <MaterialIcon name={'edit'} color="#6F80A7" size={20} />
                    </TouchableOpacity>  
                                 
                  </View>                 
                </View>
                <RNPickerSelect
                        placeholder={{
                            label: 'Select a version...',
                            value: null,
                        }}
                        onValueChange={(value) => this.setState({versionNum:value})}
                        items={items}
                        style = {{
                          inputAndroid: {
                            position:"absolute",
                            width:80,
                            height:47,
                            backgroundColor:"transparent",
                            top:-88,
                            right:20,
                            zIndex:999
                          },
                          inputIOS: {}
                        }}
                    />    
              </View>
              {/* <Program
                onPress={(typeProgram) => {
                  this.onPressNext({
                    call: () => {
                      this.HeaderRef.next();
                      this.onChangeChallenge({typeProgram});
                    },
                  });
                }}
              />               */}
            </KeyboardAwareScrollView>
            <TouchableOpacity style={styles.bottomConfirmBox} onPress={() => this.onPressNext({})}>
              <Text style={styles.confirmPlanText}>Confirm Plan</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width, width * 2],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width, width * 2],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width, width * 2],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              styles.contentContainerStyle,
              {
                transform: [{translateY}, {translateX}, {scale}],
                flex: 1,
                paddingBottom: 0,
              },
            ]}>
            <View style={styles.titleContainer}>
              <Text style={styles.itemHeaderText}>Perfect!</Text>
              <Text style={styles.titles}>Just a few more {'\n'} small details</Text>
            </View>
            <Title
              ref={(e) => (this.TitleRef = e)}
              challenge={challenge}
              onChangeText={(title) => this.onChangeChallenge({title})}
            />
            <Description
              challenge={challenge}
              onChangeText={(description) =>
                this.onChangeChallenge({description})
              }
            />
            <TouchableWithoutFeedback onPress={() => this.onPressNext({})}>
              <View style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 2, width * 3],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 2, width * 3],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 2, width * 3],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              styles.contentContainerStyle,
              {
                transform: [{translateY}, {translateX}, {scale}],
                flex: 1,
              },
            ]}>
            <View style={styles.titleContainer}>
              <Text style={styles.itemHeaderText}>Awesome!</Text>
              <Text style={styles.titles}>Who can have access to {'\n'} this Challenge?</Text>
            </View>
            <Access
              challenge={challenge}
              onChangeSwitch={(value) =>
                this.onChangeChallenge({public: value})
              }
            />
            <TouchableWithoutFeedback
              onPress={() => challenge.public !== null && this.onPressNext({})}>
              <View
                style={[
                  styles.nextButton,
                  challenge.public === null ? {backgroundColor: '#96AAC6'} : {},
                ]}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 3, width * 4],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 3, width * 4],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 3, width * 4],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={{
              transform: [{translateY}, {translateX}, {scale}],
              paddingTop: 100,
              flex: 1,
            }}>
            <View style={styles.titleContainer}>
              <Text style={styles.itemHeaderText}>It's a date!</Text>
              <Text style={styles.titles}>
                When would you like to{'\n'}start the challenge?
              </Text>
            </View>
            <StartDate
              challenge={challenge}
              onPress={(startDate) => {
                this.onChangeChallenge({startDate});
              }}
            />
            <TouchableWithoutFeedback
              onPress={() =>
                challenge.startDate !== null && this.onPressNext({})
              }>
              <View
                style={[
                  styles.nextButton,
                  challenge.startDate === null
                    ? {backgroundColor: '#96AAC6'}
                    : {},
                ]}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 4, width * 5],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 4, width * 5],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 4, width * 5],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={{
              transform: [{translateY}, {translateX}, {scale}],
              flex: 1,
            }}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.contentContainerStyle,
                {paddingHorizontal: 7.5, paddingBottom: 60},
              ]}>
              <View style={styles.titleContainer}>
                <Text style={styles.itemHeaderText}>Lookin' good!</Text>
            <Text style={styles.titles}>Choose a header for {'\n'} your challenge:</Text>
              </View>
              <Graphic
                challenge={challenge}
                onPress={(graphic) => {
                  this.onChangeChallenge({graphic});
                }}
              />
            </KeyboardAwareScrollView>
            <TouchableWithoutFeedback
              onPress={() =>
                challenge.graphic !== null && this.onPressNext({})
              }>
              <View
                style={[
                  styles.nextButton,
                  challenge.graphic === null
                    ? {backgroundColor: '#96AAC6'}
                    : {},
                ]}>
                <Text style={styles.nextButtonText}>Next</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      },
      () => {
        const translateY = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 5, width * 6],
          outputRange: [height - 100, 0],
          extrapolate: 'clamp',
        });
        const translateX = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 5, width * 6],
          outputRange: [-width, 0],
          extrapolate: 'clamp',
        });
        const scale = this.CarouselRef._scrollPos.interpolate({
          inputRange: [width * 5, width * 6],
          outputRange: [0.9, 1],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={{
              transform: [{translateY}, {translateX}, {scale}],
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AllSet
              user={this.props.user}
              challenge={challenge}
              loading={this.state.loading}
              createChallenge={this.createChallenge}
              closeCreateNew={this.closeCreateNew}
              createdChallenge={this.state.createdChallenge}
            />
          </Animated.View>
        );
      },
    ];
    data = data.map((v, i) => {
      const index = this.state.renderList.indexOf(i);
      if (index === -1) {
        return () => {
          return <View />;
        };
      }
      return v;
    });
    return (
      <Carousel
        keyboardShouldPersistTaps={'handled'}
        ref={(e) => (this.CarouselRef = e)}
        scrollEnabled={false}
        data={data}
        renderItem={({item}) => {
          return item();
        }}
        sliderWidth={width}
        sliderHeight={height - 100}
        itemWidth={width}
        itemHeight={height - 100}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.7}
        onSnapToItem={this.onSnapItem}
        inactiveSlideShift={0}
      />
    );
  };
  render() {
    const {challenge} = this.state;
    return (
      <Modal
        ref={(e) => (this.CreateNewRef = e)}
        popupHeight={height}
        header={
          <Header
            ref={(e) => (this.HeaderRef = e)}
            challenge={challenge}
            onPressBack={this.onPressBack}
            onPressNext={this.onPressNext}
            closeCreateNew={this.closeCreateNew}
          />
        }>
        {this.renderChildren()}
      </Modal>
    );
  }
}

export default connect(
  ({user}) => ({
    user,
  }),
  null,
  null,
  {forwardRef: true},
)(Component);

const styles = EStyleSheet.create({
  nextButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
  },
  nextButton: {
    position: 'absolute',
    paddingVertical: 15,
    backgroundColor: '$lightBlue',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 43,
  },
  chooseVersion: {
    marginTop: 30,
    color: '#000000',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Poppins-Bold',
  },
  challengeDescription: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
    color:"#96AAC6"
  },
  programPicture: {
    height: 200,
    width: "100%",
  },
  programPictureContainer: {
    width: "100%",
    borderRadius:13,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor:"#ffffff"
  },
  descriptionBody: {
    width:"100%",
    alignItems:"flex-start",
    paddingLeft:25,
    paddingTop:25,
  },
  versionBox: {
    width:"90%",
    flexDirection:"row",
    padding:15,
    borderRadius:12,
    alignItems:"center",
    marginBottom:20,
    marginTop:15,
    borderWidth:1,
    borderColor:"#F0F5FA"
  },
  versionsTextBox: {
    flex:1,
    flexDirection:"row"
  },
  versionText: {
    color:"#21293D",
    fontWeight:"bold",
    marginRight:15,
    marginTop:3
  },
  versionRecommendedBox: {
    paddingLeft:8,
    paddingRight:8,
    paddingTop:4,
    paddingBottom:4,
    borderRadius:10,
    backgroundColor:"#E9F6FF"
  },
  versionRecommended: {
    color:"#1AA0FF",
    fontSize:12
  },
  editButton: {
    marginRight:10
  },
  
  bottomConfirmBox: {
    width:"100%",
    backgroundColor:"#1ca0ff",
    height:56,
    alignItems:"center",
    justifyContent:"center",
    marginTop:height-658,
  },
  confirmPlanText: {
    color:"#ffffff",
    fontSize:16,
    fontFamily: 'Poppins-Medium',
  },
  confirmButton: {
    backgroundColor:"#445533"
  },
  versionListBox: {
    width:"100%",    
    paddingTop:12,    
    marginTop:height-755,
  },
  versionList: {
    width:"100%",
    backgroundColor:"#d1d5db",   
    height:150, 
    paddingTop:15
  },
  versionsBox: {
    flexDirection:"row",
    alignSelf:"center",
    marginBottom:5
  },
  versionsText: {
    fontSize:20,
    fontWeight:"bold"
  },
  checkIcon: {
    position:"absolute",
    left:-35,
    top:3
  },
  actionBox: {
    flexDirection:"row",
    marginBottom:13
  },
  actionCancel: {
    flex:1,
    marginLeft:15
  },
  actionSet: {
    marginRight:15
  },
  actionText: {
    color:"#62a3f7",
    fontWeight:"bold",
    fontSize:17
  },
  backButton: {width: 40},
  subTitles: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#6F80A7',
  },
  next: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
  },
  contentContainerStyle: {
    backgroundColor: '#F7F9FB',
    paddingTop: 100,
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  titleContainer1: {
    alignItems:"flex-start",
  },
  titleContainer: {
    alignItems:"center",
  },
  titles: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  itemHeaderText: {
    fontSize:16,
    marginBottom:7,
    color:"#1AA0FF",
    fontFamily: 'Poppins-Bold',
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F5FA',
  },
  closeButton: {},
});
