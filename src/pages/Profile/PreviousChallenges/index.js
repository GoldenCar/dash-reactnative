import React, {useState, useEffect} from 'react';
import moment from "moment";
import {View, ScrollView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import NavBar from '../../../components/NavBar';
import Item from './Item';
import * as challengesActions from "../../../actions/challenges";

const PreviousChallenges = props => {
    const [list, setList] = useState([])

    const load = async () => {
        const response = await challengesActions.getAllChallengesOfDB()
        let list = []
        response.forEach((v) => {
            const data = new Date(v.ActiveDate)
            if (data.toString() !== 'Invalid Date' && v.allStep) {
                // if(!moment().isAfter(data) && v.myStep !== '0'){
                if (!moment().isAfter(data)) {
                    list = [...list, v]
                }
            }
        })
        setList(list)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <View style={styles.container}>
            <NavBar styleContainer={{backgroundColor: 'white'}}
                    shadow={false}
                    title="My Past Challenges"
            />
            <ScrollView contentContainerStyle={{backgroundColor: '#F0F5FA', paddingTop: 100, paddingHorizontal: 16}}
                        style={{marginBottom: 70}}>
                {list.map(value => {
                    return (
                        <Item challengeBGImage={value.challengeBGImage}
                              title={value.title}
                              plan={value.plan}
                              progress={15}
                              max={Number(value.allStep)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

const styles = EStyleSheet.create({
    containerGradiend: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    containerBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 350,
    },
    contentContainerStyle: {
        paddingTop: 280,
        paddingBottom: 75,
    },
    container: {
        flex: 1,
    },
});

export default PreviousChallenges
