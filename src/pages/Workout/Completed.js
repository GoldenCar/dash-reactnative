import * as React from 'react';
import {
    Image,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

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
            <View style={{ flex: 1, backgroundColor: 'rgb(0, 154, 255)' }}>
                <View style={{
                    height: '100%', width: '100%'
                }}>
                    <View
                        style={{
                            backgroundColor: '#1AA0FF',
                            flex: 1,
                            width: '100%',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}>
                        <Image style={{
                            top: 84, position: 'absolute', alignSelf: 'center', width: 136,
                            height: 136
                        }} source={require('../../res/checkComplete.png')} />
                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins-Bold',
                                    fontSize: 24,
                                    lineHeight: 28,
                                }}
                            >Great Work!</Text>
                            <Text style={{
                                color: 'white',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 28,
                                lineHeight: 38,

                            }}>You have finished
                            </Text>
                            <Text style={{
                                color: 'white',
                                fontFamily: 'Poppins-Bold',
                                fontSize: 28,
                                lineHeight: 38,

                            }}>today's task.</Text>

                        </View>

                        <View style={{
                            bottom: 37,
                            position: 'absolute', width: '90%', alignSelf: 'center',
                        }}>
                            <View style={{
                                height: 194,
                                width: 317,
                                borderRadius: 24, paddingBottom: 26,
                                backgroundColor: '#FFFFFF',

                            }}>
                                <View style={{}}>
                                    <View>
                                        <Text
                                            style={{
                                                color: 'black',
                                                fontFamily: 'Poppins-Bold',
                                                fontSize: 24,
                                                paddingTop: 27,
                                                // lineHeight: 24,
                                                alignSelf: 'center',
                                            }}>Day {currentDay}</Text>
                                        <Text
                                            style={{
                                                color: '#8A98B7',
                                                fontFamily: 'Poppins-Medium',
                                                fontSize: 16,
                                                alignSelf: 'center',
                                                paddingTop: 5
                                            }}
                                        > Mediation Day</Text>
                                    </View>
                                    <View style={{}}>

                                        <TouchableOpacity style={{
                                            height: 64,
                                            alignItems: 'center',
                                            marginTop: 14,
                                            width: 255,
                                            alignSelf: 'center'

                                        }} onPress={onPress}>
                                            <View
                                                style={{
                                                    backgroundColor: '#1AA0FF',
                                                    flex: 1,
                                                    width: '100%',
                                                    borderRadius: 24,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Text
                                                    style={{
                                                        color: '#FFFFFF',
                                                        fontFamily: 'Poppins-Bold',
                                                        fontSize: 16,
                                                        lineHeight: 24,
                                                        padding: 2,
                                                    }}>
                                                    Mark As Complete!
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

}