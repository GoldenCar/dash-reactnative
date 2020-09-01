import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Image } from 'react-native';

export default function Component(props) {
    const { visible, setCircuitModalVisible } = props;

    return (
        <Modal
            animationType="slide"
            ///visible={this.state.showPyramidSet}
            visible={visible}
            //onRequestClose={() => this.setState({ showPyramidSet: false })}
            onRequestClose={() => setCircuitModalVisible(false)}
            transparent>
            <View style={styles.modalContainer}>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: '#FFFFFF',
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        marginTop: 33,
                    }}>
                    <View
                        style={{
                            marginTop: 26,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: 'Poppins-Medium',
                                color: '#25292E',
                                marginLeft: 16,
                                fontWeight: 'bold',
                                fontSize: 20,
                                lineHeight: 28,
                                fontWeight: '600',
                            }}>
                            What’s a Circuit?
                        </Text>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                left: 0,
                                height: 48,
                                width: 48,
                                justifyContent: 'center',
                                backgroundColor: '',
                            }}
                            onPress={() =>
                                //{
                                //this.setState({ showPyramidSet: false });
                                setCircuitModalVisible(false)
                            }
                        //}
                        >
                            <Image
                                source={require('../../res/close.png')}
                                style={{ height: 13, width: 13, marginLeft: 16 }}></Image>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#F0F5FA',
                            borderBottomWidth: 1,
                            marginTop: 31,
                        }}
                    />
                    <View
                        style={{
                            marginTop: 28,
                            marginHorizontal: 24,
                            height: 120,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: '#6F80A7',
                                fontFamily: 'Poppins-Medium',
                                lineHeight: 28,
                            }}>
                            A circuit is a sequence of exercises that repeats itself for a set number of rounds.
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({

});
