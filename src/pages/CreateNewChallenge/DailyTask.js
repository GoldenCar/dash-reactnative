import React, { useState, createRef } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Picker from 'react-native-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import VersionPicker from './VersionPicker';
import Video from './Video';

export default function Component(props) {
    const { challenge, versionNum, isVersionModalShow, showVersionModal, items, setVersionNum, onPress } = props;
    const item = challenge.type;

    //const Touch = onPress ? TouchableOpacity : View;
    const [play, setPlay] = useState(false);
    const [load, setLoad] = useState(false);
    const videoRef = createRef(null);

    const onEdit = () => {
        if (Platform.OS === 'android') {
            showVersionModal(true);
        } else {
            Picker.show()
        }
    }

    return (
        <View>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTextBlue}>30 Day Plan:</Text>
                    { /* TODO: add real title */}
                    <Text style={styles.headerTitle}>Yoga + Stretching</Text>

                    { /* TODO: add real description */}
                    <Text style={styles.headerDescription}>
                        Guided strength training circuit workouts. No equipment needed.
                    </Text>
                </View>


                {/* <Video
                    play={play}
                    load={load}
                    item={item}
                    videoRef={videoRef}
                    setLoad={setLoad}
                    setPlay={setPlay}
                    onPress={onPress}
                    nextTitle={'Confirm Plan'}
                />
                <TouchableOpacity style={styles.trailerBox} onPress={() => setPlay(true)}>
                    <FontAwesome
                        style={styles.arrowTrailer}
                        name={'play'}
                        color="#000000"
                        size={12}
                    />
                    <Text style={styles.trailerText}>
                        TRAILER
                    </Text>
                </TouchableOpacity> */}
            </View>
            { /* TODO: set this up  */}
            {/* <LinearGradient
                colors={['#E7EEF5', '#fff']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{ height: 500 }}
            /> */}
            {/* <View style={styles.challengeTypeMain}>
                <Text style={styles.typeName}>{item.title}</Text>
                <Text style={styles.typeDescription}>{item.description}</Text>
            </View>
            <View style={{ paddingHorizontal: 8, marginTop: 40 }}>
                <View style={styles.versionBox}>
                    <View style={styles.versionsTextBox}>
                        <Text
                            style={styles.versionText}
                            onPress={() => showVersionModal(true)}
                        >
                            Version {versionNum}.0
                    </Text>
                        <View style={styles.versionRecommendedBox}>
                            <Text style={styles.versionRecommended}>Recommended</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                        <MaterialIcon name={'edit'} color="#6F80A7" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <VersionPicker
                isVersionModalShow={isVersionModalShow}
                items={items}
                setVersionNum={setVersionNum}
                showVersionModal={showVersionModal}
                challenge={item}
                versionNum={versionNum}
            /> */}
        </View>
    );
}

const styles = EStyleSheet.create({
    header: {
        height: 500,
        //backgroundColor: 'orange',
        paddingHorizontal: 40,
        paddingTop: 77
    },
    headerTextBlue: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        color: '#1AA0FF',
        paddingBottom: 4
    },
    headerTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: '#3F434F',
        paddingBottom: 10
    },
    headerDescription: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 24,
        textAlign: 'center',
        color: '#859AB6'
    },

    trailerBox: {
        // flexDirection: "row",
        // backgroundColor: "#ffffff",
        // borderRadius: 15,
        // paddingLeft: 17,
        // paddingRight: 17,
        // paddingTop: 7,
        // paddingBottom: 7,
        // marginTop: -50,
        // alignSelf: "flex-end",
        // marginRight: 15
    },
    arrowTrailer: {
        //marginTop: 3
    },
    trailerText: {
        // marginLeft: 11,
        // fontSize: 10,
        // marginTop: 2,
        // fontFamily: 'Poppins-Bold',
        // letterSpacing: 2
    },

    typeDescription: {
        color: '#21293D',
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0.6,
    },
    typeName: {
        color: '#21293D',
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        lineHeight: 24,
    },
    challengeTypeMain: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 15,
        alignSelf: "flex-start",
        paddingVertical: 20,
    },
    versionBox: {
        width: "100%",
        flexDirection: "row",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: "#F0F5FA"
    },
    versionsTextBox: {
        flex: 1,
        flexDirection: "row"
    },
    versionText: {
        color: "#21293D",
        fontWeight: "bold",
        marginRight: 15,
        marginTop: 3
    },
    versionRecommendedBox: {
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        borderRadius: 10,
        backgroundColor: "#E9F6FF"
    },
    versionRecommended: {
        color: "#1AA0FF",
        fontSize: 12
    },
    editButton: {
        marginRight: 10
    }
});
