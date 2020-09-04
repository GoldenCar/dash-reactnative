import React from 'react';
import {View, Text, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {mediaHost} from 'dash/src/config';

const Item = props => {
    const {progress, title, plan, max, challengeBGImage} = props
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {challengeBGImage ? (
                    <Image source={{uri: `${mediaHost}${challengeBGImage}`}} style={styles.img}/>
                ) : (
                    <View style={styles.img}/>

                )}
                <View>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <Text style={styles.headerSubTitle}>Plan: {plan}</Text>
                </View>
            </View>
            <View style={styles.progressContainer}>
                <View style={[styles.progressDone, {width: `${(progress / max) * 100}%`,}]}/>
            </View>
            <Text style={styles.bottom}>{progress} of {max} Days</Text>
        </View>
    );
}

const styles = EStyleSheet.create({
    progressContainer: {
        width: '100%',
        height: 6,
        position: 'relative',
        marginTop: 13,
        backgroundColor: '#E0EAF3',
        borderRadius: 40,
    },
    progressDone: {
        height: 6,
        position: 'absolute',
        backgroundColor: '#1AA0FF',
        borderRadius: 40,
    },
    container: {
        marginBottom: 8,
        padding: 16,
        width: '100%',
        height: 126,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7EEF5',
        borderRadius: 8,
    },
    bottom: {
        marginTop: 12,
        color: '#1AA0FF',
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
    headerSubTitle: {
        color: '#859AB6',
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    img: {
        width: 48,
        height: 48,
        backgroundColor: '#000',
        borderRadius: 8,
        marginRight: 13,
    },
});

Item.defaultProps = {
    progress: 0
};

export default Item