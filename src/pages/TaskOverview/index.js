import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

import { mediaHost } from 'dash/src/config';
import { getWorkoutData } from '../../helpers/workout';
import { getCurrentDay } from '../../helpers/date';

import { BackArrow } from '../../components/Icons';

import Circuit from './Circuit';
import TaskCell from './TaskCell';

function Component(props) {
    const { challenge, user, day, currentDay, plan } = props;
    console.log(challenge, user, day, currentDay, plan);

    const imageURL = `${mediaHost}${plan.planImage}`;

    console.log('DAY INFO', day);

    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getWorkout = async () => {
            setLoading(true);
            const workoutData = await getWorkoutData(day);
            console.log('NEW WORKOUT DATA', workoutData);
            setStories(workoutData);
            setLoading(false);
        }

        getWorkout();
    }, []);

    // TODO: this needs to be put in store
    const onPress = () => {
        Actions.Workout({
            data: stories,
            currentDay,
            challenge,
            plan,
            day
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <LinearGradient
                    style={styles.overview}
                    colors={['#FFFFFF', '#E7EEF5']}
                    start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }}
                >
                    <View style={styles.overviewText}>
                        <Text style={styles.dayText}>
                            Day {currentDay}
                        </Text>
                        <Text style={styles.dayBlueText}>
                            {getCurrentDay()}
                        </Text>
                    </View>
                    <Image
                        source={{ uri: imageURL }}
                        style={styles.overviewImage}
                        resizeMode='contain'
                    />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => Actions.pop()}
                    >
                        <BackArrow />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.blueBox}>
                            <Text style={styles.blueBoxText}>
                                Todays Task
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.taskTitle}>
                                {day.taskTitle}
                            </Text>
                            <Text style={styles.taskDescription}>
                                {day.taskDescription}
                            </Text>
                        </View>
                    </View>
                    {day && day.versionDayTaskCard && day.versionDayTaskCard.length > 0 && (
                        day.versionDayTaskCard.map((task) => {
                            if (task.flag === 'circuit') {
                                return <Circuit task={task} />
                            } else {
                                return <TaskCell task={task} />
                            }
                        })
                    )}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={[styles.button, loading && styles.disabled]}
                onPress={onPress}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    Start Day
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 96
    },
    backButton: {
        height: 40,
        width: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        position: 'absolute',
        top: 19,
        left: 19,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overview: {
        height: 233,
    },
    overviewText: {
        position: 'absolute',
        top: 98,
        left: 20
    },
    dayText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 32,
        lineHeight: 39,
        color: '#3F434F',
        marginBottom: 8
    },
    dayBlueText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        lineHeight: 16,
        textAlign: 'center',
        letterSpacing: 1.6,
        textTransform: 'uppercase',
        color: '#1AA0FF'
    },
    overviewImage: {
        width: 191,
        height: 208,
        position: 'absolute',
        top: 44,
        right: 10
    },
    content: {
        flex: 1,
        marginLeft: 20,
        marginRight: 15,
        position: 'relative'
    },
    header: {
        paddingBottom: 36,
        marginBottom: 22,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F5FA'
    },
    blueBox: {
        width: 142,
        height: 37,
        backgroundColor: '#1AA0FF',
        justifyContent: 'center',
        marginTop: -8,
        marginBottom: 24
    },
    blueBoxText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        lineHeight: 16,
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#FFFFFF'
    },
    taskTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 32,
        color: '#3F434F',
        marginBottom: 8
    },
    taskDescription: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 24,
        color: '#859AB6',
    },

    button: {
        height: 72,
        // background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
        backgroundColor: '#218FDE',
        //box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.13);
        borderRadius: 8,
        position: 'absolute',
        bottom: 13,
        left: 16,
        right: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    disabled: {
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 24,
        color: '#FFFFFF'
    }
});

export default connect(({ user }) => ({
    // user
}))(Component);
