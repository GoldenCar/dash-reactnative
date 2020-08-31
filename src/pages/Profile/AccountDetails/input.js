import React from 'react';
import { Text, View, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Input(props) {
    const {label, textInputProps, onChangeText, field} = props
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput onChangeText={(e)=>onChangeText(e, field)} {...textInputProps} style={styles.input}/>
        </View>
    )
}

const styles = EStyleSheet.create({
    container:{
        marginBottom:26,
    },
    label:{
        color:'#21293D',
        marginBottom:8,
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
    },
    input:{
        fontSize:16,
        height:64,
        fontFamily: 'Poppins-Medium',
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#E0EAF3',
        borderRadius:8,
        paddingLeft:24
    }
});
