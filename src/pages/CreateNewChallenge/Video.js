import React from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { mediaHost } from '../../config';
const { height, width } = Dimensions.get('screen');

export default function Component(props) {
    const { play, load, item, videoRef, setLoad, setPlay, onPress, nextTitle } = props;

    const onLoad = () => videoRef.current.seek(0);

    if (!play) {
        return null;
    }

    return (
        <Modal isVisible={true} transparent={true}>
            {load &&
                <TouchableOpacity style={styles.closeBtn} onPress={() => setPlay(false)}>
                    <Image
                        style={styles.closeIcon}
                        source={require('../../res/close-video.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            }

            <View style={styles.videoBox}>
                {!load &&
                    <View style={styles.videoLoaded}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                }

                <Video
                    ref={videoRef}
                    useNativeDriver={false}
                    repeat={true}
                    paused={false}
                    source={{ uri: `${mediaHost}${item.planVideo}` }}
                    resizeMode={'cover'}
                    style={styles.challengeTypeVideo}
                    onReadyForDisplay={() => setLoad(true)}
                    onLoad={onLoad}
                />
            </View>

            {(load && nextTitle) &&
                <View style={styles.bottomBox}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <TouchableOpacity style={styles.selectPlanBox} onPress={onPress}>
                        <Text style={styles.selectText}>{nextTitle}</Text>
                        <Ionicon name={'md-arrow-forward'} color="#000000" size={20} />
                    </TouchableOpacity>
                </View>
            }
        </Modal>
    );
}

const styles = EStyleSheet.create({
    closeBtn: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 999
    },
    closeIcon: {
        width: 40,
        height: 40
    },
    bottomBox: {
        position: "absolute",
        left: -16,
        bottom: 30,
        width: width,
        alignItems: "center"
    },
    itemTitle: {
        color: "#ffffff",
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'Poppins-Bold',
        marginRight: 8
    },
    selectPlanBox: {
        flexDirection: "row",
        paddingTop: 12,
        width: 154,
        paddingBottom: 12,
        backgroundColor: "#ffffff",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    selectText: {
        marginRight: 15,
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    videoBox: {
        width: width,
        height: height,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'center'
    },
    videoLoaded: {
        position: "absolute",
        top: height / 2 - 50,
        width: width / 2,
        zIndex: 999,
        alignItems: "center",
        justifyContent: "center"
    },
    loadingText: {
        fontWeight: "bold",
        color: "#ffffff"
    },
    challengeTypeVideo: {
        width: "100%",
        height: "100%"
    },
});
