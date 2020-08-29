import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import Plan from '../../components/Plan';
import * as plansActions from 'dash/src/actions/plans';

export default function Component(props) {
  const [loading, setLoading] = useState(false);
  const [array, setArray] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const data = await plansActions.getPlans();
        const planData = data.filter(data => data.status == "current");
        setArray(planData);
        setLoading(false);
      } catch (e) { }
    };
    init();
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={EStyleSheet.value('$lightBlue')}
        />
      ) : (
          array.map((value, index) => (
            <TouchableOpacity onPress={() => props.onPress(value)}>
              <Plan
                value={value}
                key={index}
                onPress={() => props.onPress(value)}
                useDefaultMargin
              />
            </TouchableOpacity>
          ))
        )
      }
    </>
  );
}
