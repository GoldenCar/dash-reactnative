import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

import LoadingScreen from './LoadingScreen';
import CountDownAnimation from './CountDownAnimation';
import { mediaHost } from '../../config';

export default class App extends React.Component {
    state = {
        loading: true
    }

    setLoading = (loading) => this.setState({ loading })

    render() {
        const { loading } = this.state;
        const { currentWorkout, paused } = this.props;

        const uri = encodeURI(`${mediaHost}${currentWorkout.fileName}`);
        const source = { uri };

        return (
            <>
                {/* {loading && <LoadingScreen />} */}

                {
                    !loading && (
                        <View style={styles.countDownContainer}>
                            <CountDownAnimation
                                onEnd={() => { }}
                            />
                        </View>
                    )
                }

                {/* <Video
                    source={source}
                    // ref={this.videoRef}
                    onLoadStart={() => this.setLoading(true)}
                    onReadyForDisplay={() => this.setLoading(false)}
                    resizeMode='cover'
                    style={styles.video}
                    repeat={true}
                    paused={paused}
                /> */}
            </>
        );
    }
}

const styles = StyleSheet.create({
    video: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    },
    countDownContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        //zIndex: 30,
    },
});
