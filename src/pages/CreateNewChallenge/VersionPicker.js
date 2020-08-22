import React from 'react';
import { View, TouchableOpacity, Text, PickerIOS, PickerItemIOS, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

const RADIO_BUTTON_SIZE = 24;

// TODO: need to test this on android
renderItem = (item, index) => {
    const { challenge, setVersionNum } = this.props;
    let stringVersion = "Version " + item.item.version + ".0"; // For setting version value

    const itemOnPress = () => {
        for (let loopCount = 0; loopCount < challenge.type.planTypeData.length; loopCount++) {
            const element = challenge.type.planTypeData[loopCount];

            if (String(element.version) === String(item.item.version)) {
                element.isSelected = true;
                setVersionNum(item.item.version);
            } else {
                element.isSelected = false;
            }

            challenge.type.planTypeData[loopCount] = element;
        }
    }

    return (
        <View>
            <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}
                onPress={itemOnPress}
            >
                <Text style={styles.textVersion}>{stringVersion}</Text>

                <View
                    style={{
                        width: RADIO_BUTTON_SIZE,
                        height: RADIO_BUTTON_SIZE,
                        borderRadius: RADIO_BUTTON_SIZE / 2,
                        borderColor: 'gray',
                        borderWidth: 0.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {(item.item.isSelected && item.item.isSelected) || (this.state.versionNum === String(item.item.version)) ?
                        <View style={styles.viewSelected} /> :
                        <View style={styles.viewNotSelected} />}


                </View>
            </TouchableOpacity>

            <View style={styles.singleRow} />
        </View>
    )
}

export default function Component(props) {
    const { challenge, versionNum, isVersionModalShow, showVersionModal, items, setVersionNum } = props;

    if (!isVersionModalShow) {
        return null;
    }

    const onConfirm = () => {
        showVersionModal(false);
        setVersionNum(versionNum);
    };

    return (
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
                        <TouchableOpacity onPress={onConfirm}>
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
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 10 }}>
                        <TouchableOpacity onPress={() => showVersionModal(false)}>
                            <Text style={styles.textAlert}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </Modal>
    );
}

const styles = EStyleSheet.create({
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
    singleRowIos: {
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
        width: RADIO_BUTTON_SIZE / 2,
        height: RADIO_BUTTON_SIZE / 2,
        borderRadius: RADIO_BUTTON_SIZE / 4,
        backgroundColor: 'rgb(24, 154, 201)',
    },
    viewNotSelected: {
        width: RADIO_BUTTON_SIZE / 2,
        height: RADIO_BUTTON_SIZE / 2,
        borderRadius: RADIO_BUTTON_SIZE / 4,
        backgroundColor: 'white',
    }
});
