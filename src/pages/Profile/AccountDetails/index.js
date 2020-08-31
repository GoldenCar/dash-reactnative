import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Text,
} from 'react-native';
import {connect} from "react-redux";
import {Actions} from 'react-native-router-flux';

import _ from 'lodash';
import NavBar from '../../../components/NavBar';
import Input from './input';
import * as UserActions from '../../../actions/user';


const {height, width} = Dimensions.get('screen');

const defaultState = {
    user: {},
    loading: false,
};

class AccountDetails extends React.Component {
    state = _.cloneDeep({...defaultState, user:this.props.user});

    onChangeText = (value, text) => {
        const data = {
            ...this.state.user,
            [text]: value,
        };
        this.setState({user: data});
    };

    saveChanges = async () => {
        try {
            this.setState({loading: true});
            await UserActions.editUser(this.state.user);
            this.setState({loading: false}, () => {
                Actions.pop()
            });
        } catch (e) {
            this.setState({loading: false});
        }
    };

    render() {
        const {displayname, username, email} = this.state.user
        console.log(this.state.user)
        return (
            <>
                <NavBar titleStyle={{marginRight: -35}} iconRightStyle={{width: 75}}
                        iconRight={<TouchableOpacity onPress={this.saveChanges}><Text
                            style={styles.save}>Save</Text></TouchableOpacity>}
                        styleContainer={{backgroundColor: 'white'}} shadow={false} title="Account Details "/>
                <ScrollView contentContainerStyle={{height:height - 126,}} behavior="padding">
                    <View style={styles.container}>
                        <Input onChangeText={this.onChangeText}  field={'displayname'}  textInputProps={{
                            value:displayname,
                            textContentType: 'name',
                        }} label={'Name'}/>
                        <Input onChangeText={this.onChangeText} field={'username'}  textInputProps={{
                            value:username,
                            textContentType: 'nickname',
                        }} label={'Username'}/>
                        <Input onChangeText={this.onChangeText} field={'email'}  textInputProps={{
                            value:email,
                            textContentType: 'emailAddress',
                            keyboardType: 'email-address'
                        }} label={'Email'}/>
                    </View>
                </ScrollView>

            </>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1
    },
    save: {
        color: '#1AA0FF',
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
    },
    container: {
        paddingHorizontal: 16,
        paddingTop: 116,
        flex: 1,
        backgroundColor: '#F0F5FA'
    }
});


export default connect(({user}) => ({
    user,
}))(AccountDetails);

