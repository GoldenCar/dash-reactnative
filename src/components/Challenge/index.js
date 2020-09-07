import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import moment from 'moment';

import { mediaHost } from 'dash/src/config';

import ViewedBy from './ViewedBy';

const { width } = Dimensions.get('window');

const GUTTER = 15;
const CARD_WIDTH = width - (GUTTER * 2);

// TODO - CLEAN UP

export default function Component(props) {
  const { explore, value, past, viewedBy, cardWidth } = props;

  const exploreContainerStyle = explore ? { width: cardWidth } : {};

  return (
    <View style={[styles.container, exploreContainerStyle]}>
      <View
        style={[
          styles.pictureContainer,
          past
            ? {
              height: width / 2,
            }
            : {},
          { width: cardWidth }
        ]}>
        <Image
          source={{ uri: `${mediaHost}${value.challengeBGImage}` }} // Chandni will enbale for uploaded images 
          resizeMode="cover"
          PlaceholderContent={<ActivityIndicator />}
          style={[
            styles.picture,
            ,
            past
              ? {
                height: width / 2 + 50,
              }
              : {},
            { width: cardWidth }
          ]}
        />
        {value.newPosts && (
          <View style={styles.newPostsContainer}>
            <View style={styles.postCircle}>
              <Text style={styles.postNumber}>2</Text>
            </View>
            <Text style={styles.post}>New Posts</Text>
          </View>
        )}
      </View>
      <View style={[styles.bottomContainer, explore && { alignItems: 'center' }]}>
        <Text style={[styles.title, explore && { textAlign: 'center' }]}>{value.title}</Text>
        {explore ? (
          <>
            <View style={styles.seperator} />
            <View>
              <Text style={styles.plan}>Plan: {value.Plan}</Text>
            </View>
          </>
        ) : moment(new Date()).diff(moment(new Date(value.startDate)), 'days') > 0 ? (
          <>
            {value.allStep && (
              <View style={styles.progress}>
                <View
                  style={[
                    styles.progressCompleted,
                    { width: `${(value.myStep * 100) / value.allStep}%` },
                  ]}></View>
              </View>
            )}
            {value.allStep && (
              <Text
                style={
                  styles.completed
                }>{`${value.myStep}/${value.allStep} Completed`}</Text>
            )}
          </>
        ) : (
              <View style={styles.bottom}>
                {past && <Text style={styles.date}>{value.date}</Text>}
                {value.startDate && (
                  <Text style={styles.completed}>
                    Starts in{' '}
                    {Math.abs(
                      moment(new Date()).diff(
                        moment(new Date(value.startDate)),
                        'days',
                      ),
                    )}{' '}
                    Days
                </Text>
                )}
                {viewedBy && <ViewedBy viewedBy={viewedBy} />}
              </View>
            )}
      </View>
    </View>
  );
}

Component.defaultProps = {
  value: {
    picture: '',
  },
};

const styles = StyleSheet.create({
  date: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#96AAC6',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  post: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#fff',
    marginLeft: 8,
    marginTop: 2,
  },
  postNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
    color: '#21293D',
  },
  postCircle: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  newPostsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completed: {
    color: '#00A1FF',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  progressCompleted: {
    backgroundColor: '#00A1FF',
    height: 5,
    borderRadius: 5,
  },
  progress: {
    height: 5,
    width: '100%',
    backgroundColor: '#E0EAF3',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  title: {
    color: '#21293D',
    fontSize: 18,
    fontFamily: 'Poppins-Bold'
  },
  bottomContainer: {
    padding: 25,
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 15,
    marginBottom: 25,
    elevation: 1,
    opacity: 0.99,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 12,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    width: CARD_WIDTH
  },
  pictureContainer: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    overflow: 'hidden',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  picture: {
    width: CARD_WIDTH,
    height: CARD_WIDTH
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7EEF5',
    marginVertical: 15
  },
  plan: {
    fontFamily: 'Poppins-Regular',
    color: '#859AB6'
  }
});
