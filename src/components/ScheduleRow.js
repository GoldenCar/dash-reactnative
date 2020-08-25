import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Component({ data, showSeperator }) {
    return (
        <>
            <View style={styles.row}>
                <View style={styles.day}>
                    <Text style={styles.dayText}>{data.versionDay}</Text>
                </View>
                <Text style={styles.taskTitle}>{data.taskTitle}</Text>
            </View>
            {showSeperator && <View style={styles.seperator} />}
        </>
    );
}

const styles = EStyleSheet.create({
    row: {
        height: 97,
        flexDirection: 'row',
        alignItems: 'center'
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
