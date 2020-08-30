import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ArrowRight } from '../../../components/Icons';

export default function Component(props) {
  const { currentDay, dayData } = props;
  const day = dayData[currentDay] || {};

  console.log('day', day);

  return (
    <View style={styles.dayOverview}>
      <View style={styles.dayHeading}>
        <Text style={styles.dayHeadingText}>
          Todays task - Day {currentDay}
        </Text>
      </View>
      <View style={styles.dayContent}>
        <View>
          <Text style={styles.dayTitle}>
            {day.taskTitle}
          </Text>
          <Text style={styles.daySubtitle}>
            Friday Jan 24
          </Text>
        </View>
        <View style={styles.startButton}>
          <Text style={styles.startText}>Start</Text>
          <ArrowRight />
        </View>
      </View>
      <View style={styles.viewFullPlanButton}>
        <Text style={styles.viewFullPlanButtonText}>
          View Full Plan
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dayOverview: {
    borderTopWidth: 1,
    borderTopColor: '#E7EEF5',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  dayHeading: {
    width: 186,
    height: 37,
    backgroundColor: '#E9F6FF',
    justifyContent: 'center',
    marginBottom: 17
  },
  dayHeadingText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#1AA0FF'
  },
  dayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 21
  },
  dayTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    lineHeight: 24,
    color: '#3F434F'
  },
  daySubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 20,
    color: '#859AB6'
  },
  startButton: {
    width: 73,
    height: 40,
    backgroundColor: '#1AA0FF',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  startText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 20,
    color: '#FFFFFF',
    paddingRight: 8
  },
  viewFullPlanButton: {
    height: 56,
    backgroundColor: '#E9F6FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewFullPlanButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1AA0FF'
  }
});
