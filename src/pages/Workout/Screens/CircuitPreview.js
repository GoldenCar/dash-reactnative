import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
    render() {
        const { onPress } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Great Work!
                        </Text>
                        <Text style={styles.subtitle}>
                            Take a quick rest or water break before your workout continues.
                        </Text>
                    </View>
                    <View style={styles.rest}>

                    </View>
                </View>

                { /* TODO: add circuit details here */}

                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>
                        Start: Next Circuit
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        lineHeight: 32,
        color: '#3F434F',
        marginTop: 31
    },
    subtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 20,
        color: '#859AB6',
        marginTop: 8,
        flexWrap: 'wrap'
    },
    rest: {
        height: 64,
        width: 64,
        borderWidth: 4,
        borderColor: '#1AA0FF',
        marginLeft: 26,
    },
    button: {
        height: 72,
        position: 'absolute',
        bottom: 24,
        left: 16,
        right: 16,
        backgroundColor: '#1AA0FF',
        //box-shadow: 0px 20px 20px rgba(26, 160, 255, 0.13);
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: '#FFFFFF'
    }
});
