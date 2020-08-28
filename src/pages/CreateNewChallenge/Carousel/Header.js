import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import NavBar from 'dash/src/components/NavBar';
import {BackArrow} from 'dash/src/components/Icons';

export default class extends React.Component {
    state = {
        currentIndex: 0,
    };
    next = () => {
        this.setState({currentIndex: this.state.currentIndex + 1});
    };
    prev = () => {
        this.setState({currentIndex: this.state.currentIndex - 1});
    };
    onPressBack = () => {
        const {onPressBack} = this.props;
        onPressBack();
        this.prev();
    };

    render() {
        const {closeCreateNew} = this.props;
        const {currentIndex} = this.state;
        return (
            <NavBar
                title={currentIndex === 6 ? 'All Set!' : ''}
                iconRight={null}
                icon={
                    currentIndex === 0 ? (
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeCreateNew}>
                            <Icon name={'close'} color="#B6BCCA" size={20}/>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={this.onPressBack}>
                            <BackArrow/>
                        </TouchableOpacity>
                    )
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    backButton: {
        width: 40,
        alignItems: "center"
    },
    next: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: '#1AA0FF',
    },
});
