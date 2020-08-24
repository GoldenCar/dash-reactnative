import React, { useState, createRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform, Image } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

import VersionPicker from './VersionPicker';
import Video from './Video';

import { mediaHost } from '../../config';
import * as planActions from '../../actions/plans';


export default function Component(props) {
    const { challenge, versionNum, isVersionModalShow, showVersionModal, items, setVersionNum, onPress } = props;
    const item = challenge.type;

    const [play, setPlay] = useState(false);
    const [load, setLoad] = useState(false);
    const videoRef = createRef(null);

    useEffect(() => {
        const init = async () => {
            try {
                const arrayResponse = await planActions.getPlanTasks("5f21e92ef1a13b555fee2c5b");
                //const arrayResponse = await planActions.getPlanTasks('plan2020629218443234260564696');

                console.log('daily task', arrayResponse);

                // const getAllTasks = await planActions.getAllPlanTasks('plan2020629218443234260564696');
                //console.log('get all tasks', getAllTasks);
            } catch (e) {
                console.log(e);
            }
        };
        init();
    }, []);

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

                    <TouchableOpacity
                        style={styles.versionContainer}
                        onPress={() => showVersionModal(true)}
                    >
                        <Text style={styles.versionText}>
                            Version {versionNum}.0
                        </Text>
                        <MaterialIcon name='edit' color="#8A98B7" size={16} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <Video
                play={play}
                load={load}
                item={item}
                videoRef={videoRef}
                setLoad={setLoad}
                setPlay={setPlay}
                onPress={onPress}
                nextTitle={'Confirm Plan'}
            />
            <VersionPicker
                isVersionModalShow={isVersionModalShow}
                items={items}
                setVersionNum={setVersionNum}
                showVersionModal={showVersionModal}
                challenge={item}
                versionNum={versionNum}
            />
        </View>
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
        marginBottom: 10
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
    versionContainer: {
        height: 64,
        marginTop: 27,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7EEF5',
        //box-shadow: 0px 20px 52px rgba(0, 0, 0, 0.03);
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    versionText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        lineHeight: 24,
        color: '#21293D'
    }
});
