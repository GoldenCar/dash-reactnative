import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { Router, Scene, Reducer } from 'react-native-router-flux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Provider } from 'react-redux';
import store from './store';

import AuthPopup from 'dash/src/components/AuthPopup';

import PlanOverview from './pages/PlanOverview';
import TaskOverview from './pages/TaskOverview';
import MyChallenges from './pages/MyChallenges';

import CameraRoll from './pages/CameraRoll';
import CustomTabBar from './pages/CustomTabBar';
import InviteFriendsToDash from './pages/InviteFriendsToDash';
import InviteToChallenge from './pages/InviteToChallenge';
import Notifications from './pages/Notifications';
import PastChallenges from './pages/PastChallenges';
import Explore from './pages/Explore';
import ExplorePost from './pages/Explore/ExplorePost';
import PickAUsername from './pages/PickAUsername';
import ChallengeDetail from './pages/ChallengeDetail';
import InviteFriends from 'dash/src/pages/ChallengeDetail/InviteFriends';
import Search from './pages/Search';

import PostPage from 'dash/src/pages/ChallengeDetail/Social/PostPage';
import CreatePost from 'dash/src/pages/ChallengeDetail/Social/CreatePost';
import Completed from './pages/Workout/Completed';
import WorkoutOverView from './pages/Workout/WorkoutOverView';

import Workout from 'dash/src/pages/Workout/index';

// Profile
import Profile from './pages/Profile';
import Friends from './pages/Profile/Friends';
import PreviousChallenges from './pages/Profile/PreviousChallenges';
import AccountDetails from './pages/Profile/AccountDetails';

import * as settingsActions from 'dash/src/actions/settings';
import * as userActions from 'dash/src/actions/user';

import CreateNewChallenge from './pages/CreateNewChallenge/CreateNewChallenge';

import themes from './themes';

EStyleSheet.build(themes.light);

export let AuthPopupRef;
export let InviteFriendsRef;

const createReducer = (params) => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        store.dispatch(action);
        return defaultReducer(state, action);
    };
};

export default () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const init = async () => {
            const data = await settingsActions.getStorage();
            if (data.user) {
                userActions.getCurrentUser();
            }
            setLoading(false);

        };
        init();
    }, []);
    return (
        <>
            <StatusBar translucent barStyle="light-content" />
            <View style={{ flex: 1, paddingTop: 20, }}>
                <Provider store={store}>
                    {!loading && (
                        <>
                            <Router createReducer={createReducer}>
                                <Scene key="root" hideNavBar>
                                    <Scene
                                        initial
                                        key="HomePage"
                                        tabs={true}
                                        tabBarComponent={CustomTabBar}
                                    >
                                        <Scene key="MyProfile">
                                            <Scene key="Profile" component={Profile} hideNavBar />
                                            <Scene key="Friends" component={Friends} hideNavBar />
                                            <Scene key="PreviousChallenges" component={PreviousChallenges} hideNavBar />
                                            <Scene key="AccountDetails" component={AccountDetails} hideNavBar />
                                            <Scene key="Notifications" component={Notifications} hideNavBar />
                                        </Scene>
                                        <Scene key="MyChallengesTab" initial>
                                            <Scene key="Challenges" component={MyChallenges} hideNavBar />
                                        </Scene>
                                        <Scene key="ExploreTab">
                                            <Scene key="Explore" component={Explore} hideNavBar />
                                        </Scene>
                                    </Scene>
                                    <Scene key="PlanOverview" component={PlanOverview} hideNavBar />
                                    <Scene key="InviteToChallenge" component={InviteToChallenge} hideNavBar />
                                    <Scene key="PastChallenges" component={PastChallenges} hideNavBar />
                                    <Scene key="TaskOverview" component={TaskOverview} hideNavBar />
                                    <Scene key="ExplorePost" component={ExplorePost} hideNavBar />
                                    <Scene key="PickAUsername" component={PickAUsername} hideNavBar />
                                    <Scene key="InviteFriendsToDash" component={InviteFriendsToDash} hideNavBar />
                                    <Scene key="CameraRoll" component={CameraRoll} hideNavBar />
                                    <Scene key="ChallengeDetail" component={ChallengeDetail} hideNavBar />
                                    <Scene key="PostPage" component={PostPage} hideNavBar />
                                    <Scene key="CreatePost" component={CreatePost} hideNavBar />
                                    <Scene key="Workout" component={Workout} hideNavBar />
                                    <Scene key="Completed" component={Completed} hideNavBar />
                                    <Scene key="WorkoutOverView" component={WorkoutOverView} hideNavBar />
                                    <Scene key="Search" component={Search} hideNavBar />

                                    <Scene key="CreateNewChallenge" component={CreateNewChallenge} hideNavBar />
                                </Scene>
                            </Router>
                            <AuthPopup ref={(e) => (AuthPopupRef = e)} />
                            <InviteFriends ref={(e) => (InviteFriendsRef = e)} />
                        </>
                    )}
                </Provider>
            </View>
        </>
    );
};
