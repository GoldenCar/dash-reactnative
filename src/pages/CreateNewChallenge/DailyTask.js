import React from 'react';
import { View, TouchableOpacity, Text, PickerIOS, PickerItemIOS } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Picker from 'react-native-picker';
import EStyleSheet from 'react-native-extended-stylesheet';

import ChallengeTypeContainer from 'dash/src/components/ChallengeTypeContainer';
import Modal from 'react-native-modal';

export default function Component(props) {
    const { challenge, versionNum, isVersionModalShow, showVersionModal, items, setVersionNum } = props;

    return (
        <ChallengeTypeContainer
            item={challenge.type}
            // onPress={() => this.onPressNext({})}
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
                <TouchableOpacity style={styles.editButton} onPress={() => {
                if (Platform.OS === 'android') {
                    showVersionModal(true);
                } else {
                    Picker.show()
                }
                }}>
                <MaterialIcon name={'edit'} color="#6F80A7" size={20} />
                </TouchableOpacity>
            </View>

            </View>
            {isVersionModalShow &&
                <Modal
                    animationIn={Platform.OS === 'ios' ? 'fadeInUp' : 'fadeIn'}
                    animationOut={Platform.OS === 'ios' ? 'fadeInDown' : "fadeOut"}
                    isVisible={isVersionModalShow}
                    onBackdropPress={() => showVersionModal(false)}
                >
                    {Platform.OS === 'ios' ? (
                        <View style={{ backgroundColor: 'transparent' }}>
                            <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                                <Text style={styles.textPickerTitle}>Select Version</Text>
                                <View style={styles.singleRowIos} />
                                <PickerIOS
                                    selectedValue={versionNum}
                                    onValueChange={(version) => setVersionNum(version)}
                                >
                                    {items.map((selectedValue) => 
                                        <PickerItemIOS
                                            key={selectedValue}
                                            value={selectedValue}
                                            label={'Version ' + selectedValue + '.0'}
                                        />
                                    )}
                                </PickerIOS>
                                <View style={styles.singleRowIos} />
                                <TouchableOpacity onPress={() => {
                                    showVersionModal(false);
                                    setVersionNum(versionNum);
                                }}>
                                    <Text style={styles.textConfirmPicker}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 20, borderRadius: 5, backgroundColor: 'white' }}>
                                <TouchableOpacity onPress={() => showVersionModal(false)}>
                                <Text style={styles.textCancelPicker}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) :
                        <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
                            <FlatList
                                data={challenge.type.planTypeData ? challenge.type.planTypeData : []}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 10 }}>
                                {/* <TouchableOpacity onPress={() => {
                                showVersionModal(false);
                                }}>
                                <Text style={styles.textAlert}>Cancel</Text>
                                </TouchableOpacity > */}

                                <TouchableOpacity onPress={() => showVersionModal(false)}>
                                    <Text style={styles.textAlert}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </Modal>
            }
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
    versionsText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    editButton: {
        marginRight: 10
    },
    textAlert: {
        padding: 5,
        fontWeight: "700",
        fontSize: 18
    },
    textCancelPicker: {
        color: 'rgb(3, 132, 255)',
        alignSelf: 'center',
        padding: 15,
        fontWeight: '700',
        fontSize: 18,
    },
    textConfirmPicker: {
        color: 'rgb(3, 132, 255)',
        alignSelf: 'center',
        padding: 15,
        fontWeight: '500',
        fontSize: 18,
    },
    singleRowIos:{
        backgroundColor: 'lightgray',
        width: '100%',
        alignSelf: 'center',
        height: 1
    },
    textPickerTitle: {
        color: 'gray',
        fontSize: 16,
        alignSelf: 'center',
        padding: 15,
    },
});
