import React from 'react';
import {SafeAreaView} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';

import PlanExploration from './pages/PlanExploration';
import Main from './pages/Main';
import ScrollAnimation from './pages/ScrollAnimation';

export default () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Router>
        <Scene key="root" hideNavBar>
          <Scene
            initial={true}
            key="PlanExploration"
            type="reset"
            component={PlanExploration}
            hideNavBar
          />
          <Scene key="Main" component={Main} hideNavBar />
          <Scene key="ScrollAnimation" component={ScrollAnimation} hideNavBar />
        </Scene>
      </Router>
    </SafeAreaView>
  );
};
