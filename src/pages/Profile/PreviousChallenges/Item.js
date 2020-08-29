import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Item = props => {
    const {progress} = props
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.img}/>
                <View>
                    <Text style={styles.headerTitle}>Vlog Squad Challenge</Text>
                    <Text style={styles.headerSubTitle}>Plan: Yoga + Stretching</Text>
                </View>
            </View>
            <View style={styles.progressContainer}>
                <View style={[styles.progressDone, {width:`${progress}%`,}]}/>
            </View>
            <Text style={styles.bottom}>30 of 30 Days</Text>
        </View>
    );
}

const styles = EStyleSheet.create({
    progressContainer:{
        width:'100%',
        height: 6,
        position: 'relative',
        marginTop:13,
        backgroundColor:'#E0EAF3',
        borderRadius: 40,
    },
    progressDone:{
        height: 6,
        position: 'absolute',
        backgroundColor:'#1AA0FF',
        borderRadius: 40,
    },
    container:{
        marginBottom:8,
        padding:16,
        width: '100%',
        height: 126,
        backgroundColor:'#fff',
        borderWidth: 1,
        borderColor: '#E7EEF5',
        borderRadius: 8,
    },
    bottom:{
        marginTop:12,
        color: '#1AA0FF',
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle:{
        color: '#000',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
    headerSubTitle:{
        color: '#859AB6',
        fontSize: 12,
        fontFamily: 'Poppins',
    },
    img:{
        width: 48,
        height: 48,
        backgroundColor:'#000',
        borderRadius: 8,
        marginRight:13,
    },
});

Item.defaultProps = {
    progress:0
};

export default Item