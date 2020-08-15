import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Switch } from 'react-native';
import SwitchToggle from '../../components/SwitchToggle';
import AsyncStorage from '@react-native-community/async-storage';

export default class WorkoutOverView extends React.Component {

    state = {
        settingModal: false,
        endTaskModal: false,
        switchSetting: false,
        audioMute: false,
        audioNext: false,
        descriptionHide: false,
        modalType:null
    };

    show(data = null) {
        if (data == "setting") {
            this.setState({ settingModal: true,modalType:"setting" });
            this.validateOption();

        } else if (data == "endTask") {
            this.setState({ endTaskModal: true,modalType:"endTask" });
        }
    }

    validateOption = async () => {
        try {
            const data = await AsyncStorage.getItem('@taskDescHide');
            this.setState({ descriptionHide: data ? true : false })
        } catch (error) {
            console.log(error.message);
        }
    }

    async onPressSettingToggle(data) {
        const { audioMute, audioNext, descriptionHide } = this.state;
        if (data == 1) {
            this.setState({ audioMute: !audioMute });
        }
        else if (data == 2) {
            this.setState({ audioNext: !audioNext });
        }
        else if (data == 3) {
            this.setState({ descriptionHide: !descriptionHide });
            try {
                if(!descriptionHide){
                    await AsyncStorage.setItem('@taskDescHide','hide');
                } else {
                    await AsyncStorage.removeItem('@taskDescHide');
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    async onEndTask() { 
        await this.setState({ endTask: true, endTaskModal: false });
        this.props.onClose(this.state);
    }

    async onDismissEndTaskModal() {
        await this.setState({ endTaskModal: false });
        this.props.onClose(this.state);
    }

    async onDismissSettingModal() {
        await this.setState({ settingModal: false });
        this.props.onClose(this.state);
    }


    render() {
        const { settingModal, endTaskModal, audioMute, audioNext, descriptionHide } = this.state;
        return (
            <>
                {/*  modal for task setting ----------------- */}
                <Modal
                    animationType="slide"
                    visible={settingModal}
                    onRequestClose={() => this.setState({ settingModal: false })}
                    transparent
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContentContainer}>
                            <View
                                style={styles.modalContent}>
                                <Text style={styles.modalTopHeadingText}>{'Settings'}</Text>
                                <TouchableOpacity
                                    style={styles.modalCloseButtonContainer}
                                    onPress={() => this.onDismissSettingModal()}>
                                    <Image
                                        source={require('../../res/close.png')}
                                        style={styles.modalCloseButton}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalMiddleContainer} />
                            <View style={styles.modalMiddleContainerContent}>
                                <View style={{ width: '75%' }}>
                                    <Text style={styles.settingHeadText}>{`Audio Settings`}</Text>
                                    <Text style={styles.settingHeadTextSubHeadText}>{`Turn audio guidance on/off.`}</Text>
                                </View>
                                <View style={{ width: '25%', alignItems: 'center', }}>
                                    <SwitchToggle
                                        switchOn={audioMute}
                                        backgroundColorOn={'#1AA0FF'}
                                        backgroundColorOff={'#1AA0FF'}
                                        circleColorOff={'white'}
                                        onPress={() => this.onPressSettingToggle(1)}
                                    />
                                </View>
                            </View>

                            <View style={styles.modalMiddleContainer} />
                            <View style={styles.modalMiddleContainerContent}>
                                <View style={{ width: '75%' }}>
                                    <Text style={styles.settingHeadText}>{`Audio Next`}</Text>
                                    <Text style={styles.settingHeadTextSubHeadText}>{`Turn audio next cue on/off.`}</Text>
                                </View>
                                <View style={{ width: '25%', alignItems: 'center', }}>
                                    <SwitchToggle
                                        switchOn={audioNext}
                                        backgroundColorOn={'#1AA0FF'}
                                        backgroundColorOff={'#1AA0FF'}
                                        circleColorOff={'white'}
                                        onPress={() => this.onPressSettingToggle(2)}
                                    />
                                </View>
                            </View>

                            <View style={styles.modalMiddleContainer} />
                            <View style={styles.modalMiddleContainerContent}>
                                <View style={{ width: '75%' }}>
                                    <Text style={styles.settingHeadText}>{`Hide Descriptions`}</Text>
                                    <Text style={styles.settingHeadTextSubHeadText}>{`Applied to excercises and videos`}</Text>
                                </View>
                                <View style={{ width: '25%', alignItems: 'center', }}>
                                    <SwitchToggle
                                        switchOn={descriptionHide}
                                        backgroundColorOn={'#1AA0FF'}
                                        backgroundColorOff={'#1AA0FF'}
                                        circleColorOff={'white'}
                                        onPress={() => this.onPressSettingToggle(3)}
                                    />
                                </View>
                            </View>
                            <View style={styles.modalMiddleContainer} />
                            <View style={styles.modalMiddleContainer} />
                        </View>
                    </View>
                </Modal>

                {/*  modal for end task ----------------- */}
                <Modal
                    animationType="slide"
                    visible={endTaskModal}
                    onRequestClose={() => this.setState({ endTaskModal: false })}
                    transparent
                    onDismiss={() => this.props.onClose(this.state)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContentContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    style={styles.modalCloseButtonContainer}
                                    onPress={() => this.onDismissEndTaskModal()}
                                >
                                    <Image
                                        source={require('../../res/close.png')}
                                        style={styles.modalCloseButton}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalMiddleContainerContent}>
                                <Text style={styles.modalMiddleHeadText}>{`End Task? `}</Text>
                                <Text style={styles.modalMiddleSubHeadText}>{`Please note this task will not be \nmarked as complete.`}</Text>
                            </View>
                            <View style={styles.modalBottomContainerContent}>
                                <TouchableOpacity style={styles.buttonExitTextContainer} onPress={() =>  this.onDismissEndTaskModal()}>
                                    <Text style={styles.buttonExitText}>{`Yes, I will do it later`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCompleteTextContainer} onPress={() => this.onEndTask()}>
                                    <Text style={styles.buttonCompleteText}>{`I completed the task`}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCancelContainer} onPress={() =>  this.onDismissEndTaskModal()}>
                                    <Text style={styles.buttonCancelText}>{`Cancel`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

            </>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'column-reverse',
    },
    modalContentContainer: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 33,
    },
    modalContent: {
        marginTop: 26,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTopHeadingText: {
        fontFamily: 'Poppins-Medium',
        color: '#25292E',
        marginLeft: 16,
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '600',
    },
    modalCloseButtonContainer: {
        position: 'absolute',
        left: 10,
        top: -3,
        height: 48,
        width: 48,
        justifyContent: 'center',
    },
    modalCloseButton: {
        height: 13,
        width: 13,
        marginLeft: 16
    },
    modalMiddleContainer: {
        borderBottomColor: '#F0F5FA',
        borderBottomWidth: 1,
        marginTop: 25,
    },
    modalMiddleContainerContent: {
        marginTop: 26,
        marginLeft: 16,
        marginRight: 16,
        flexDirection: 'row'
    },
    modalMiddleHeadText: {
        fontSize: 24,
        letterSpacing: 1.2,
        color: '#292E3A',
        fontFamily: 'Poppins',
        lineHeight: 32,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    modalMiddleSubHeadText: {
        fontSize: 16,
        letterSpacing: 1.2,
        color: '#6F80A7',
        fontFamily: 'Poppins',
        lineHeight: 32,
        width: '100%',
        textAlign: 'center',
        fontWeight: '500'
    },
    modalBottomContainerContent: {
        marginLeft: 16,
        marginRight: 16,
        height: 250,
        justifyContent: 'space-around'
    },
    buttonExitTextContainer: {
        backgroundColor: '#FF2272',
        width: '100%',
        height: 72,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonExitText: {
        fontSize: 16,
        letterSpacing: 1.2,
        color: '#ffffff',
        fontFamily: 'Poppins',
        lineHeight: 32,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonCompleteText: {
        fontSize: 16,
        letterSpacing: 1.2,
        color: '#586178',
        fontFamily: 'Poppins',
        lineHeight: 32,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonCompleteTextContainer: {
        backgroundColor: '#ffff',
        width: '100%',
        height: 72,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#E0EAF3',
        borderWidth: 1
    },
    buttonCancelText: {
        fontSize: 16,
        letterSpacing: 1.2,
        color: '#859AB6',
        fontFamily: 'Poppins',
        lineHeight: 32,
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonCancelContainer: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center'
    },
    settingHeadText: {
        fontSize: 16,
        letterSpacing: 1.2,
        color: '#000000',
        fontFamily: 'Poppins',
        lineHeight: 28,
        width: '100%',
        fontWeight: 'bold'
    },
    settingHeadTextSubHeadText: {
        fontSize: 16,
        letterSpacing: 1.2,
        color: '#6F80A7',
        fontFamily: 'Poppins',
        lineHeight: 32,
        width: '100%',
        fontWeight: '500'
    },
})