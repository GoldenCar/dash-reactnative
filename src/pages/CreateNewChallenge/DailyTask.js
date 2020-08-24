import React, { useState, createRef } from 'react';
import { View, TouchableOpacity, Text, Platform, Image } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Picker from 'react-native-picker';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import VersionPicker from './VersionPicker';
import Video from './Video';

import { mediaHost } from '../../config';

export default function Component(props) {
    const { challenge, versionNum, isVersionModalShow, showVersionModal, items, setVersionNum, onPress } = props;
    const item = challenge.type;

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
        <View style={styles.container}>
            <View style={styles.header}>
                <LinearGradient
                    colors={['#E7EEF5', '#fff']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.headerBackground}
                >
                    <Text style={styles.headerTextBlue}>30 Day Plan:</Text>
                    <Text style={styles.headerTitle}>{item.title}</Text>
                    <Text style={styles.headerDescription}>{item.description}</Text>

                    <TouchableOpacity
                        style={styles.trailerButton}
                        onPress={() => setPlay(true)}
                    >
                        <FontAwesome
                            style={styles.arrow}
                            name='play'
                            color="#000000"
                            size={11}
                        />
                        <Text style={styles.trailerText}>
                            Trailer
                        </Text>
                    </TouchableOpacity>
                    <Image
                        source={{ uri: `${mediaHost}${item.planImage}` }}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </LinearGradient>

            </View>

            {/* TODO: clean up video player (don't need image)
            <Video
                    play={play}
                    load={load}
                    item={item}
                    videoRef={videoRef}
                    setLoad={setLoad}
                    setPlay={setPlay}
                    onPress={onPress}
                    nextTitle={'Confirm Plan'}
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
        </View >
    );
}

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 584
    },
    headerBackground: {
        flex: 1,
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
        color: '#859AB6',
        paddingBottom: 12
    },
    trailerButton: {
        width: 117,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderColor: '#E0EAF3',
        borderWidth: 1,
        borderRadius: 32,
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: 22,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    trailerText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        lineHeight: 16,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#3F434F'
    },
    image: {
        height: 222
    },






    // typeDescription: {
    //     color: '#21293D',
    //     fontFamily: 'Poppins-Medium',
    //     fontSize: 12,
    //     lineHeight: 20,
    //     letterSpacing: 0.6,
    // },
    // typeName: {
    //     color: '#21293D',
    //     fontFamily: 'Poppins-Bold',
    //     fontSize: 14,
    //     lineHeight: 24,
    // },
    // challengeTypeMain: {
    //     flex: 1,
    //     marginTop: 20,
    //     paddingHorizontal: 15,
    //     alignSelf: "flex-start",
    //     paddingVertical: 20,
    // },
    // versionBox: {
    //     width: "100%",
    //     flexDirection: "row",
    //     padding: 15,
    //     borderRadius: 12,
    //     alignItems: "center",
    //     marginBottom: 20,
    //     marginTop: 15,
    //     borderWidth: 1,
    //     borderColor: "#F0F5FA"
    // },
    // versionsTextBox: {
    //     flex: 1,
    //     flexDirection: "row"
    // },
    // versionText: {
    //     color: "#21293D",
    //     fontWeight: "bold",
    //     marginRight: 15,
    //     marginTop: 3
    // },
    // versionRecommendedBox: {
    //     paddingLeft: 8,
    //     paddingRight: 8,
    //     paddingTop: 4,
    //     paddingBottom: 4,
    //     borderRadius: 10,
    //     backgroundColor: "#E9F6FF"
    // },
    // versionRecommended: {
    //     color: "#1AA0FF",
    //     fontSize: 12
    // },
    // editButton: {
    //     marginRight: 10
    // }
});
