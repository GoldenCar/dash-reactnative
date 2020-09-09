import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LottieView from 'lottie-react-native';

import Trophy from './Lottie/trophy';

import * as userActions from '../../actions/user';

export default class Completed extends React.Component {
    render() {
        console.log(" Comleeted props =", this.props);

        const { currentDay, user, challenge } = this.props;

        const onPress = async () => {
            try {
                // TODO: refresh my challenge data
                const response = await userActions.setDayCompleted(challenge._id, user._id, currentDay - 1);
                console.log('DAY COMPLETE', response);
            } catch (e) {
                console.log(e);
            }

            Actions.ChallengeDetail({ challenge });
        }

        return (
            <View style={styles.container}>
                <LottieView
                    source={Trophy}
                    autoPlay
                    loop={false}
                    style={styles.trophy}
                />

                <Text style={styles.subtitle}>
                    Great Work!
                </Text>
                <Text style={styles.title}>
                    You've finished today's task.
                </Text>

                <View style={styles.info}>
                    <View style={styles.eyebrow}>
                        <Text style={styles.eyebrowText}>Todays Task</Text>
                    </View>

                    { /* TODO: add actual values here */}
                    <Text style={styles.infoTitle}>
                        Full Body Stretching
                    </Text>

                    <Text style={styles.infoSubtitle}>
                        Day {currentDay}
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>
                            Mark As Complete!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1AA0FF',
        paddingHorizontal: 29,
        paddingBottom: 38,
        alignItems: 'center'
    },
    trophy: {
        height: 201,
        width: 221,
        marginTop: 20
    },
    subtitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        marginTop: 60
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        color: '#FFFFFF',
        marginTop: 8,
        textAlign: 'center'
    },
    info: {
        width: 317,
        height: 194,
        backgroundColor: '#fff',
        //box-shadow: 0px 36px 100px rgba(70, 87, 121, 0.3);
        borderRadius: 24,
        marginTop: 56,
        paddingHorizontal: 31,
        paddingBottom: 24
    },
    infoTitle: {
        marginTop: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: 18,
        lineHeight: 24,
        color: '#3F434F',
        textAlign: 'center'
    },
    infoSubtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: '#859AB6',
        textAlign: 'center',
        marginBottom: 16
    },
    eyebrow: {
        width: 148,
        height: 37,
        marginTop: -5,
        backgroundColor: '#E9F6FF',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    eyebrowText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#1AA0FF'
    },
    button: {
        width: 255,
        height: 64,
        backgroundColor: '#1AA0FF',
        borderRadius: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#FFFFFF'
    }
});
