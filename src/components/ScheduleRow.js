import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Component({ data, showSeperator, index, showEyebrow }) {
    const day = data.versionDay || (index + 1);

    const contentContainerStyles = [styles.contentContainer];
    if (showEyebrow) {
        contentContainerStyles.push({
            marginTop: 60,
            marginBottom: 16
        });
    };

    return (
        <>
            <View style={styles.row}>
                {showEyebrow && (
                    <View style={styles.eyebrow}>
                        <Text style={styles.eyebrowText}>
                            Todays Task
                        </Text>
                    </View>
                )}
                <View style={contentContainerStyles}>
                    <View style={styles.day}>
                        <Text style={styles.dayText}>{day}</Text>
                    </View>
                    <Text style={styles.taskTitle}>{data.taskTitle}</Text>
                </View>
            </View>
            {showSeperator && <View style={styles.seperator} />}
        </>
    );
}

const styles = EStyleSheet.create({
    row: {
        minHeight: 97,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    eyebrow: {
        width: 142,
        height: 37,
        backgroundColor: '#E9F6FF',
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eyebrowText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 10,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: '#1AA0FF'
    },
    seperator: {
        height: 1,
        backgroundColor: '#E7EEF5',
        borderRadius: 16,
    },
    day: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E7EEF5',
        //box-shadow: 0px 6px 13px rgba(133, 154, 182, 0.08);
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    dayText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 24,
        textAlign: 'center',
        color: '#1AA0FF'
    },
    taskTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        lineHeight: 24,
        color: '#3F434F'
    }
});
