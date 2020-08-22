import React, { useState } from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Carousel from 'react-native-snap-carousel';
import { Container, Content } from "native-base";
import _, { toInteger } from 'lodash';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Modal from 'dash/src/components/Modal';
import RNPickerSelect from 'react-native-picker-select';
import * as challenegesActions from '../../../actions/challenges';

import CreateNew from '../CreateNew';
import Title from '../Title';
import Program from '../Program';
import Description from '../Description';
import StartDate from '../StartDate';
import Graphic from '../Graphic';
import AllSet from '../AllSet';
import Access from '../Access';
import DailyTask from '../DailyTask';

import Header from './Header';

import PageOne from './Children/PageOne';
import PageTwo from './Children/PageTwo';
import PageThree from './Children/PageThree';
import PageFour from './Children/PageFour';
import PageFive from './Children/PageFive';
import PageSix from './Children/PageSix';
import PageSeven from './Children/PageSeven';

import { mediaHost } from 'dash/src/config';

const { height, width } = Dimensions.get('screen');
const radioButtonSize = 24;

const defaultChallenge = {
  type: null,
  public: null,
  title: '',
  description: '',
  startDate: null,
  graphic: null,
  version: '1'
};

// TODO: this needs major clean up

class Component extends React.Component {
  CreateNewRef;
  CarouselRef;
  TitleRef;
  HeaderRef;
  state = {
    isVersionModalShow: false,
    challenge: _.cloneDeep(defaultChallenge),
    currentIndex: 0,
    renderList: [0, 1],
    loading: true,
    createdChallenge: null,
    versionNum: "1",
  };

  getChallengesApiCall = async () => {
    const { challenge } = this.state;
    console.log(" chllenge ", challenge);
    const arrayAllChallenges = await challenegesActions.getChallenges();

    // get the version of the plan which user has completed in his challenge. 
    let arrayUserPlanVersion = [];

    for (let index = 0; index < arrayAllChallenges.length; index++) {
      const element = arrayAllChallenges[index];
      if (element.createdBy === this.props.user._id) {

        if (element.Plan === challenge.type.title) {
          arrayUserPlanVersion.push(element.Version);
        }
      }
    }
    let arrayPlannedVersion = challenge.type.planTypeData;

    let arrayOnlyVersion = [];
    for (let index = 0; index < arrayPlannedVersion.length; index++) {
      const element = arrayPlannedVersion[index];
      arrayOnlyVersion.push(element.version);
    }

    // Find not completed versions 
    const findUniques = (a, b) => [...a, ...b].reduce((r, c, i, a) => {
      a.filter(x => x === c).length === 1 ? r.push(c) : null
      return r
    }, [])

    let arrayNotMatchedVersions = findUniques(arrayUserPlanVersion, arrayOnlyVersion);
    if (arrayNotMatchedVersions.length === 0) {
      // User is selecting first time 
      let minimum = arrayOnlyVersion.sort((a, b) => a - b)[0];
      this.setState({ versionNum: minimum })
    } else {
      // User didn't completed these versions so showing minimum version first. 
      let minimum = arrayNotMatchedVersions.sort((a, b) => a - b)[0];
      this.setState({ versionNum: minimum })
    }
  }


  saveVersion = async () => {
    try {
      await AsyncStorage.setItem('version', this.state.versionNum);
    } catch (error) {
      console.log(error.message);
    }
  };

  createChallenge = async () => {
    try {
      this.setState({ loading: true });
      const res = await challenegesActions.postMyChallenge(
        this.state.challenge,
      );
      this.setState({ loading: false, createdChallenge: res });

    } catch (eventResponse) {
      console.log(" Create challenge 1 msg", eventResponse);
      console.log("create challenge response ", eventResponse.response);
      this.setState({ loading: false });
    }
  };

  openCreateNew = (create = true) => {
    if (create) {
      this.setState(
        { currentIndex: 0, challenge: _.cloneDeep(defaultChallenge), createdChallenge: null },
        () => {
          this.CreateNewRef.open({});
        },
      );
    } else {
      this.CreateNewRef.open({});
    }
  };
  closeCreateNew = ({ call = () => { } }) => {
    this.CreateNewRef.close({ call });
  };

  onSnapItem = (currentIndex) => {

    const renderList = this.state.renderList;
    const i = renderList.indexOf(currentIndex + 1);
    if (i === -1) {
      renderList.push(currentIndex + 1);
    }

    if (currentIndex === 1) {
      if (this.props.user) {
        this.getChallengesApiCall();

      } else {
        const { challenge } = this.state;
        if (challenge.type && challenge.type.planTypeData && challenge.type.planTypeData.length > 0) {
          let arrayPlannedVersion = challenge.type.planTypeData;
          let arrayOnlyVersion = [];
          for (let index = 0; index < arrayPlannedVersion.length; index++) {
            const element = arrayPlannedVersion[index];
            arrayOnlyVersion.push(element.version);
          }

          let minimum = arrayOnlyVersion.sort((a, b) => a - b)[0];
          this.setState({ versionNum: minimum })
        }

      }
    }

    this.setState({ renderList, currentIndex }, () => {
      if (currentIndex === 2) {
        //  this.TitleRef.focus();
      }
      if (currentIndex === 6 && this.props.user) {
        this.createChallenge();
      }
    });
  };

  onChangeChallenge = (value, call = () => { }) => {

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
  onPressNext = ({ call } = {}) => {
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

  renderChildren = () => {
    const { challenge } = this.state;

    const pageTwoOnPress = () => {
      const version = this.state.versionNum;
      this.onChangeChallenge({ version });
      this.onPressNext({});
      this.saveVersion();
    };

    let data = [
      () => <PageOne
        CarouselRef={this.CarouselRef}
        HeaderRef={this.HeaderRef}
        onChangeChallenge={this.onChangeChallenge}
        onPressNext={this.onPressNext}
      />,
      () => <PageTwo
        challenge={challenge}
        onPress={pageTwoOnPress}
        isVersionModalShow={this.state.isVersionModalShow}
        CarouselRef={this.CarouselRef}
        versionNum={this.state.versionNum}
        isVersionModalShow={this.state.isVersionModalShow}
        showVersionModal={(show) => this.setState({ isVersionModalShow: show })}
        setVersionNum={(version) => this.setState({ versionNum: version })}
      />,
      () => <PageThree
        challenge={challenge}
        CarouselRef={this.CarouselRef}
        TitleRef={this.TitleRef}
        onChangeChallenge={this.onChangeChallenge}
        onPressNext={this.onPressNext}
      />,
      () => <PageFour
        CarouselRef={this.CarouselRef}
        onChangeChallenge={this.onChangeChallenge}
        onPressNext={this.onPressNext}
        challenge={challenge}
      />,
      () => <PageFive
        CarouselRef={this.CarouselRef}
        onChangeChallenge={this.onChangeChallenge}
        onPressNext={this.onPressNext}
        challenge={challenge}
      />,
      () => <PageSix
        CarouselRef={this.CarouselRef}
        onChangeChallenge={this.onChangeChallenge}
        onPressNext={this.onPressNext}
        challenge={challenge}
      />,
      () => <PageSeven
        user={this.props.user}
        challenge={challenge}
        loading={this.state.loading}
        CarouselRef={this.CarouselRef}
        createChallenge={this.createChallenge}
        closeCreateNew={this.closeCreateNew}
        createChallenge={this.state.createdChallenge}
      />
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
        keyboardShouldPersistTaps={'never'}
        ref={(e) => (this.CarouselRef = e)}
        scrollEnabled={false}
        data={data}
        renderItem={({ item }) => {
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

  // TODO: move
  renderItem = (item, index) => {

    const { challenge } = this.state;
    let stringVersion = "Version " + item.item.version + ".0"; // For setting version value

    return (
      <View style={{}}>
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}
          onPress={() => {

            for (let loopCount = 0; loopCount < challenge.type.planTypeData.length; loopCount++) {
              const element = challenge.type.planTypeData[loopCount];


              if (String(element.version) === String(item.item.version)) {
                element.isSelected = true;

                this.setState({ versionNum: item.item.version });

              } else {
                element.isSelected = false;
              }
              challenge.type.planTypeData[loopCount] = element;
            }
          }
          }
        >
          <Text style={styles.textVersion}>{stringVersion}</Text>

          <View style={{
            width: radioButtonSize,
            height: radioButtonSize,
            borderRadius: radioButtonSize / 2,
            borderColor: 'gray',
            borderWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
          >
            {(item.item.isSelected && item.item.isSelected) || (this.state.versionNum === String(item.item.version)) ? <View style={styles.viewSelected} />
              :
              <View style={styles.viewNotSelected} />}


          </View>
        </TouchableOpacity>

        <View style={styles.singleRow} />
      </View>
    )
  }
  render() {
    const { challenge } = this.state;
    return (
      <Modal
        ref={(e) => (this.CreateNewRef = e)}
        // popupHeight={height}
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

const mapStateToProps = state => {
  console.log(" state in proos ----->>", state);
  return {}
};


// export default connect(
//   mapStateToProps,
//   null,
//   { forwardRef: true },
// )(Component);


export default connect(
  ({ user }) => ({
    user,
  }),
  null,
  null,
  { forwardRef: true },
)(Component);


const styles = EStyleSheet.create({
  nextButtonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
  },
  singleRow: {
    backgroundColor: 'lightgray',
    width: '110%',
    alignSelf: 'center',
    height: 1
  },
  textVersion: {
    fontSize: 18,
    fontWeight: "400"
  },
  viewSelected: {
    width: radioButtonSize / 2,
    height: radioButtonSize / 2,
    borderRadius: radioButtonSize / 4,
    backgroundColor: 'rgb(24, 154, 201)',
  },
  viewNotSelected: {
    width: radioButtonSize / 2,
    height: radioButtonSize / 2,
    borderRadius: radioButtonSize / 4,
    backgroundColor: 'white',
  },
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
  nextButton: {
    position: 'absolute',
    paddingVertical: 15,
    backgroundColor: '$lightBlue',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    bottom: 0,
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
    color: "#96AAC6"
  },
  programPicture: {
    height: 200,
    width: "100%",
  },
  programPictureContainer: {
    width: "100%",
    borderRadius: 13,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: "#ffffff"
  },
  descriptionBody: {
    width: "100%",
    alignItems: "flex-start",
    paddingLeft: 25,
    paddingTop: 25,
  },
  bottomButtonContainer: {
    height: 60,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent'
  },
  bottomConfirmBox: {
    width: "100%",
    backgroundColor: "#1ca0ff",
    height: 56,
    alignItems: "center",
    justifyContent: "center"
  },
  confirmPlanText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  confirmButton: {
    backgroundColor: "#445533"
  },
  checkIcon: {
    position: "absolute",
    left: -35,
    top: 3
  },
  actionBox: {
    flexDirection: "row",
    marginBottom: 13
  },
  actionCancel: {
    flex: 1,
    marginLeft: 15
  },
  actionSet: {
    marginRight: 15
  },
  actionText: {
    color: "#62a3f7",
    fontWeight: "bold",
    fontSize: 17
  },
  backButton: { width: 40 },
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
    paddingBottom: 30,
    flexGrow: 1
  },
  titleContainer1: {
    alignItems: "flex-start",
    marginBottom: 22
  },
  titleContainer: {
    alignItems: "center",
  },
  titles: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Poppins-Bold',
    paddingHorizontal: 15,
    color: '#292E3A',
  },
  itemHeaderText: {
    fontSize: 16,
    marginBottom: 7,
    color: "#1AA0FF",
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
