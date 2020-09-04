import React from 'react';
import { View, Dimensions, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
import _ from 'lodash';
import { connect } from 'react-redux';

//import * as challengeActions from '../../../actions/challenges';

//import Modal from 'dash/src/components/Modal';
//import Header from './Header';

import PageOne from './Carousel/Children/PageOne';
import PageTwo from './Carousel/Children/PageTwo';
// import PageThree from './Children/PageThree';
// import PageFour from './Children/PageFour';
// import PageFive from './Children/PageFive';
// import PageSix from './Children/PageSix';
// import PageSeven from './Children/PageSeven';

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

    componentDidMount() {
        // if something in props, then navigate

        //  this.CarouselRef.snapToItem(2);

        const { plan } = this.props;
        let { challenge } = this.state;

        if (plan) {
            challenge.type = plan;
            this.setState({ challenge });
        }
    }

    render() {
        const { challenge } = this.state;

        const data = [
            <PageOne
            // CarouselRef={this.CarouselRef}
            // onChangeChallenge={this.onChangeChallenge}
            // onPressNext={this.onPressNext}
            />,
            <PageTwo
                challenge={challenge}
                // onPress={pageTwoOnPress}
                // isVersionModalShow={this.state.isVersionModalShow}
                CarouselRef={this.CarouselRef}
            // versionNum={this.state.versionNum}
            // isVersionModalShow={this.state.isVersionModalShow}
            // showVersionModal={(show) => this.setState({ isVersionModalShow: show })}
            //setVersionNum={(version) => this.setState({ versionNum: version })}
            />
        ]

        return (
            <Carousel
                //keyboardShouldPersistTaps={'never'}
                ref={(e) => (this.CarouselRef = e)}
                //scrollEnabled={false}
                data={data}
                renderItem={({ item }) => {
                    console.log(item);
                    return item;
                }}
                sliderWidth={width}
                sliderHeight={height - 100}
                itemWidth={width}
                itemHeight={height - 100}
                inactiveSlideScale={1}
                inactiveSlideOpacity={0.7}
                //onSnapToItem={this.onSnapItem}
                inactiveSlideShift={0}
            />
        );
    }
}

export default connect(({ user }) => ({
    user,
}))(Component);
