import React from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Picker from 'react-native-picker';
import EStyleSheet from 'react-native-extended-stylesheet';

import ChallengeTypeContainer from 'dash/src/components/ChallengeTypeContainer';
import VersionPicker from './VersionPicker';

export default function Component(props) {
    const { challenge, versionNum, isVersionModalShow, showVersionModal, items, setVersionNum } = props;

    const onEdit = () => {
        if (Platform.OS === 'android') {
            showVersionModal(true);
        } else {
            Picker.show()
        }
    }

    return (
        <ChallengeTypeContainer
            item={challenge.type}
            nextTitle={'Confirm Plan'}
            containerStyle={{ marginBottom: 20 }}
        >
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
                challenge={challenge}
                versionNum={versionNum}
            />
        </ChallengeTypeContainer>
    );
}

const styles = EStyleSheet.create({
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
