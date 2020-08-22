import React from 'react';
import { View, TouchableOpacity, Text, PickerIOS, PickerItemIOS, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from 'react-native-modal';

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
                        renderItem={this.renderItem}
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
});
