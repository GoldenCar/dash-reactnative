import React from 'react';
import { View, Dimensions, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
import _ from 'lodash';
import { connect } from 'react-redux';

import * as challenegesActions from '../../../actions/challenges';

import Modal from 'dash/src/components/Modal';
import Header from './Header';

import PageOne from './Children/PageOne';
import PageTwo from './Children/PageTwo';
import PageThree from './Children/PageThree';
import PageFour from './Children/PageFour';
import PageFive from './Children/PageFive';
import PageSix from './Children/PageSix';
import PageSeven from './Children/PageSeven';

const { height, width } = Dimensions.get('screen');

const defaultChallenge = {
  type: null,
  public: null,
  title: '',
  description: '',
  startDate: null,
  graphic: null,
  version: '1'
};

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

  render() {
    const { challenge } = this.state;
    return (
      <Modal
        ref={(e) => (this.CreateNewRef = e)}
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
  ({ user }) => ({
    user,
  }),
  null,
  null,
  { forwardRef: true },
)(Component);
