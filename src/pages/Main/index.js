import React from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Animated,
  Dimensions,
  FlatList,
  TouchableHighlight,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import WorkoutCell from '../../components/WorkoutCell';
import WorkoutCollapsedCell from '../../components/WorkoutCollapsedCell';
import WorkoutRestCell from '../../components/WorkoutRestCell';
import WorkoutIntroCell from '../../components/WorkoutIntroCell';
import WorkoutCompleteCell from '../../components/WorkoutCompleteCell';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_SCALE = Dimensions.get('window').scale;

export const DEFAULT_WINDOW_MULTIPLIER = 0.5;
export const DEFAULT_NAVBAR_HEIGHT = 65;

// const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      isSwitchOn: true,
      isCoolDownSwitchOn: true,
      showCoolDown: true,
      showReplaceExcercise: false,
      showPyramidSet: false,
      showDetail: false,
      showComplete: false,
      ReplaceExcerciseSelectedItem: 1,
      scrollY: new Animated.Value(0),
    };
  }
  scrollTo(where) {
    if (!this._scrollView) return;
    this._scrollView.scrollTo(where);
  }

  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({show: false});
    } else {
      this.setState({show: true});
    }
  };

  ChangeSwitch = () => {
    if (this.state.isSwitchOn == true) {
      this.setState({isSwitchOn: false});
    } else {
      this.setState({isSwitchOn: true});
    }
  };
  ShowCoolDownHideComponent = () => {
    if (this.state.showCoolDown == true) {
      this.setState({showCoolDown: false});
    } else {
      this.setState({showCoolDown: true});
    }
  };

  ChangeCoolDownSwitch = () => {
    if (this.state.isCoolDownSwitchOn == true) {
      this.setState({isCoolDownSwitchOn: false});
    } else {
      this.setState({isCoolDownSwitchOn: true});
    }
  };

  renderReplaceExcercise() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showReplaceExcercise}
        onRequestClose={() => this.setState({showReplaceExcercise: false})}
        transparent>
        <View style={styles.modalContainer}>
          <View
            style
            style={{
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginTop: 33,
            }}>
            <View
              style
              style={{
                marginTop: 26,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#25292E',
                  marginLeft: 16,
                  fontWeight: 'bold',
                  fontSize: 20,
                  lineHeight: 28,
                  fontWeight: '600',
                }}>
                Replace Excercise
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  height: 48,
                  width: 48,
                  justifyContent: 'center',
                  backgroundColor: '',
                }}
                onPress={() => {
                  this.setState({showReplaceExcercise: false});
                }}>
                <Image
                  source={require('../../res/close.png')}
                  style={{height: 13, width: 13, marginLeft: 16}}></Image>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: '#F0F5FA',
                borderBottomWidth: 1,
                marginTop: 31,
              }}
            />

            <View style={{marginTop: 26, marginLeft: 16, marginRight: 16}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ReplaceExcerciseSelectedItem: 1})
                }>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      style={{
                        width: 72,
                        height: 72,
                        marginLeft: 16,
                        marginTop: 11,
                      }}
                      source={require('../../res/list_image.png')}
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: 16,
                      flexDirection: 'column',
                      marginTop: 11,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#292E3A',
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                        fontWeight: '600',
                        lineHeight: 24,
                      }}>
                      Swiss Ball Torso Twist
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#1AA0FF',
                          fontSize: 15,
                          fontFamily: 'Poppins-Medium',
                          fontWeight: '600',
                          lineHeight: 24,
                        }}>
                        Base
                      </Text>
                    </View>
                  </View>

                  {this.state.ReplaceExcerciseSelectedItem == 1 ? (
                    <View
                      style={{
                        marginLeft: 16,
                        marginTop: 11,
                        height: 20,
                        flex: 1,
                        alignItems: 'flex-end',
                        marginRight: 16,
                        alignSelf: 'center',
                      }}>
                      <LinearGradient
                        colors={['rgba(0,123,255, 1)', 'rgba(0,161,255, 1)']}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        useAngle
                        angle={189.97}
                        style={{height: 26, width: 26, borderRadius: 13}}>
                        <Image
                          style={{height: 24, width: 24}}
                          source={require('../../res/tick.png')}
                          resizeMode="center"
                        />
                      </LinearGradient>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 1,
                  marginTop: 16,
                  marginBottom: 16,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ReplaceExcerciseSelectedItem: 2})
                }>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      style={{
                        width: 72,
                        height: 72,
                        marginLeft: 16,
                        marginTop: 11,
                      }}
                      source={require('../../res/list_image.png')}
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: 16,
                      flexDirection: 'column',
                      marginTop: 11,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#292E3A',
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                        fontWeight: '600',
                        lineHeight: 24,
                      }}>
                      Swiss Ball Torso Twist
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#96AAC6',
                          fontSize: 15,
                          fontFamily: 'Poppins-Medium',
                          fontWeight: '600',
                          lineHeight: 24,
                        }}>
                        Advanced
                      </Text>
                    </View>
                  </View>

                  {this.state.ReplaceExcerciseSelectedItem == 2 ? (
                    <View
                      style={{
                        marginLeft: 16,
                        marginTop: 11,
                        height: 20,
                        flex: 1,
                        alignItems: 'flex-end',
                        marginRight: 16,
                        alignSelf: 'center',
                      }}>
                      <LinearGradient
                        colors={['rgba(0,123,255, 1)', 'rgba(0,161,255, 1)']}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        useAngle
                        angle={189.97}
                        style={{height: 26, width: 26, borderRadius: 13}}>
                        <Image
                          style={{height: 24, width: 24}}
                          source={require('../../res/tick.png')}
                          resizeMode="center"
                        />
                      </LinearGradient>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 1,
                  marginTop: 16,
                  marginBottom: 16,
                }}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({ReplaceExcerciseSelectedItem: 3})
                }>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Image
                      style={{
                        width: 72,
                        height: 72,
                        marginLeft: 16,
                        marginTop: 11,
                      }}
                      source={require('../../res/list_image.png')}
                    />
                  </View>

                  <View
                    style={{
                      marginLeft: 16,
                      flexDirection: 'column',
                      marginTop: 11,
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#292E3A',
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                        fontWeight: '600',
                        lineHeight: 24,
                      }}>
                      Swiss Ball Torso Twist
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#96AAC6',
                          fontSize: 15,
                          fontFamily: 'Poppins-Medium',
                          fontWeight: '600',
                          lineHeight: 24,
                        }}>
                        Advanced
                      </Text>
                    </View>
                  </View>
                  {this.state.ReplaceExcerciseSelectedItem == 3 ? (
                    <View
                      style={{
                        marginLeft: 16,
                        marginTop: 11,
                        height: 20,
                        flex: 1,
                        alignItems: 'flex-end',
                        marginRight: 16,
                        alignSelf: 'center',
                      }}>
                      <LinearGradient
                        colors={['rgba(0,123,255, 1)', 'rgba(0,161,255, 1)']}
                        start={{x: 0, y: 1}}
                        end={{x: 1, y: 1}}
                        useAngle
                        angle={189.97}
                        style={{height: 26, width: 26, borderRadius: 13}}>
                        <Image
                          style={{height: 24, width: 24}}
                          source={require('../../res/tick.png')}
                          resizeMode="center"
                        />
                      </LinearGradient>
                    </View>
                  ) : null}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginLeft: 16,
                  marginRight: 16,
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 1,
                  marginTop: 16,
                  marginBottom: 16,
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderPyramidSet() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showPyramidSet}
        onRequestClose={() => this.setState({showPyramidSet: false})}
        transparent>
        <View style={styles.modalContainer}>
          <View
            style
            style={{
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              marginTop: 33,
            }}>
            <View
              style
              style={{
                marginTop: 26,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#25292E',
                  marginLeft: 16,
                  fontWeight: 'bold',
                  fontSize: 20,
                  lineHeight: 28,
                  fontWeight: '600',
                }}>
                What’s a Pyramid Set?
              </Text>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  height: 48,
                  width: 48,
                  justifyContent: 'center',
                  backgroundColor: '',
                }}
                onPress={() => {
                  this.setState({showPyramidSet: false});
                }}>
                <Image
                  source={require('../../res/close.png')}
                  style={{height: 13, width: 13, marginLeft: 16}}></Image>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomColor: '#F0F5FA',
                borderBottomWidth: 1,
                marginTop: 31,
              }}
            />
            <View
              style={{
                marginTop: 26,
                marginLeft: 16,
                marginRight: 16,
                height: 160,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  letterSpacing: 1.2,
                  color: '#6F80A7',
                  fontFamily: 'Poppins',
                  lineHeight: 22,
                }}>
                A treadmill can give you a great walking workout
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  letterSpacing: 1.2,
                  color: '#6F80A7',
                  fontFamily: 'Poppins',
                  lineHeight: 22,
                }}>
                in any weather. If you use the right walking form
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  letterSpacing: 1.2,
                  color: '#6F80A7',
                  fontFamily: 'Poppins',
                  lineHeight: 22,
                }}>
                and vary your workouts with intervals, hills, and{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  letterSpacing: 1.2,
                  color: '#6F80A7',
                  fontFamily: 'Poppins',
                  lineHeight: 22,
                }}>
                speed changes, you can keep yourself interested{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  letterSpacing: 1.2,
                  color: '#6F80A7',
                  fontFamily: 'Poppins',
                  lineHeight: 22,
                }}>
                and challenge your body in new ways.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  renderDetailWithScroll() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showDetail}
        onRequestClose={() => this.setState({showDetail: false})}
        transparent>
        <View style={styles.modalDetailContainer}>
          <View
            style={{
              height: 100,
              backgroundColor: '#FFFFFF',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 48,
                width: 48,
                backgroundColor: '#F0F5FA',
                marginLeft: 16,
                borderRadius: 24,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  height: 48,
                  width: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '',
                }}
                onPress={() => {
                  this.setState({showDetail: false});
                }}>
                <Image
                  source={require('../../res/close.png')}
                  style={{height: 13, width: 13}}></Image>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  color: '#00A1FF',
                  fontSize: 36,
                  lineHeight: 38,
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins',
                }}>
                12:45
              </Text>
              <Text
                style={{
                  color: '#96AAC6',
                  fontSize: 14,
                  lineHeight: 16,
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins',
                  letterSpacing: 1.6,
                  marginTop: 5,
                }}>
                PYRAMID SET 5/5{' '}
              </Text>
            </View>
            <View
              style={{
                height: 48,
                width: 48,
                backgroundColor: '#F0F5FA',
                marginRight: 18,
                borderRadius: 24,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  left: 0,
                  height: 48,
                  width: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '',
                }}
                onPress={() => {
                  this.setState({showDetail: false});
                }}>
                <Image
                  source={require('../../res/threeline.png')}
                  style={{height: 13, width: 18}}></Image>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <WorkoutIntroCell text="Great job on that last excercise, now lets step it up more for the following excercises." />
            <WorkoutCell exercise="Rear Dumbell Flies" time="00:22" />
            <WorkoutCell
              exercise="Rear Dumbell Flies"
              time="00:22"
              isVideo={true}
            />
            <WorkoutRestCell></WorkoutRestCell>
            <WorkoutCell
              exercise="Rear Dumbell Flies"
              time="00:22"
              isVideo={true}
            />
            <WorkoutCell exercise="Rear Dumbell Flies" time="00:22" />
            <WorkoutRestCell></WorkoutRestCell>
            <WorkoutCell exercise="Rear Dumbell Flies" time="00:22" />
            <WorkoutCell
              exercise="Rear Dumbell Flies"
              time="00:22"
              isVideo={true}
            />
            <WorkoutRestCell></WorkoutRestCell>
            {/* <WorkoutCompleteCell onPress={this.renderWorkoutComplete} /> */}
            <WorkoutCompleteCell
              onPress={() => {
                this.setState({showComplete: true});
              }}
            />
          </ScrollView>
        </View>
      </Modal>
    );
  }

  // renderWorkoutComplete() {
  //   console.log('Hello')
  //   return(
  //     <Modal animationType="slide" visible={this.state.showComplete} onRequestClose={() => this.setState({showComplete: false})} transparent>
  //       <View style={styles.modalDetailContainer}>
  //       <View style={{position: "absolute", width: "100%"}}>
  //       <View style={{width: "100%", height: 330}}>
  //             {/* <View style={styles.OvalShapeView}> */}
  //               <LinearGradient colors={["#007BFF", "#00A1FF"]} style={{flex:1, width:"100%", height:"100%"}}>
  //                 <Text style={{marginTop: 72, alignSelf:"center", fontFamily: "Poppins", fontStyle: "normal", fontWeight: "600", fontSize: 24, lineHeight: 32, textAlign: "center", color: "#FFFFFF"}}>Workout Complete!</Text>
  //                 <Text style={{marginTop: 13, alignSelf:"center", fontFamily: "Poppins", fontStyle: "normal", fontWeight: "bold", fontSize: 12, lineHeight: 16, textTransform:"uppercase", textAlign: "center", color: "#FFFFFF" }}>3/4 this week</Text>
  //                 <View style={{position: "absolute", bottom: 0, height: 121, width: "100%"}}>
  //                   <LinearGradient colors={["#007BFF", "#00A1FF"]} style={{flex:1, width: "100%", height: "100%", flexDirection: "row"}}>
  //                     <View style={{flex: 1, justifyContent: "center"}}>
  //                       <Text style={{fontFamily: "Poppins", fontStyle: "normal", fontWeight: "600", fontSize: 20, lineHeight: 28, textAlign: "center", color: "#FFFFFF"}}>670 kcal</Text>
  //                     </View>
  //                     <View style={{flex: 1, justifyContent: "center"}}>
  //                       <Text style={{fontFamily: "Poppins", fontStyle: "normal", fontWeight: "600", fontSize: 20, lineHeight: 28, textAlign: "center", color: "#FFFFFF"}}>44 Mins</Text>
  //                     </View>
  //                   </LinearGradient>
  //                 </View>
  //               </LinearGradient>
  //             </View>
  //             {/* <View style={{width: "100%", backgroundColor: "#FFFFFF"}}>
  //               <Text style={{marginTop: 45, marginLeft: 16, marginRight: 16, fontFamily: "Poppins", fontStyle: "normal", fontWeight: "600", fontSize: 24, lineHeight: 32, color: "#292E3A"}}>Share your Workout</Text>
  //             </View> */}
  //                   </View>
  //                   <ScrollView style={{marginTop:350}}>

  //             {/* <View style={{width: "100%", backgroundColor: "#FFFFFF"}}>
  //               <Text style={{marginTop: 45, marginLeft: 16, marginRight: 16, fontFamily: "Poppins", fontStyle: "normal", fontWeight: "600", fontSize: 24, lineHeight: 32, color: "#292E3A"}}>Share your Workout</Text> */}
  //             {/* <FlatList style={{marginTop: 45,  flex:1}} numColumns={2}  columnWrapperStyle={{height: 293}}
  //               data={[{title: '', key: 'item1'}, {title: '', key: 'item2'}, {title: '', key: 'item3'}]}
  //               renderItem={({item, index, separators}) => (
  //                 <TouchableHighlight
  //                   key={item.key}

  //                   onShowUnderlay={separators.highlight}
  //                   onHideUnderlay={separators.unhighlight} style={{ flex: 1}}>
  //                     <View alignItems="center">
  //                       <Image source={require('./res/shareWorkout.png')}/>
  //                     </View>
  //                 </TouchableHighlight>
  //               )}
  //             /> */}

  //             <View style={{flexDirection:"row",justifyContent:"space-around" ,marginLeft:16,marginRight:16,marginTop:6,marginBottom:6}}>
  //             <TouchableHighlight

  //                   //onShowUnderlay={separators.highlight}
  //                   //onHideUnderlay={separators.unhighlight}
  //                   style={{ flex: 1}}>
  //                     <View alignItems="center">
  //                       <Image source={require('./res/shareWorkout.png')}/>
  //                     </View>
  //                 </TouchableHighlight>
  //                 <TouchableHighlight

  //                   //onShowUnderlay={separators.highlight}
  //                   //onHideUnderlay={separators.unhighlight}
  //                   style={{ flex: 1}}>
  //                     <View alignItems="center">
  //                       <Image source={require('./res/shareWorkout.png')}/>
  //                     </View>
  //                 </TouchableHighlight>
  //             </View>
  //             <View style={{flexDirection:"row",justifyContent:"space-around" ,marginLeft:16,marginRight:16,marginTop:6,marginBottom:6}}>
  //             <TouchableHighlight

  //                   //onShowUnderlay={separators.highlight}
  //                   //onHideUnderlay={separators.unhighlight}
  //                   style={{ flex: 1}}>
  //                     <View alignItems="center">
  //                       <Image source={require('./res/shareWorkout.png')}/>
  //                     </View>
  //                 </TouchableHighlight>
  //                 <TouchableHighlight

  //                   //onShowUnderlay={separators.highlight}
  //                   //onHideUnderlay={separators.unhighlight}
  //                   style={{ flex: 1}}>
  //                     <View alignItems="center">
  //                       <Image source={require('./res/shareWorkout.png')}/>
  //                     </View>
  //                 </TouchableHighlight>
  //             </View>
  //             <View style={{flexDirection:"row",justifyContent:"space-around" ,marginLeft:16,marginRight:16,marginTop:6,marginBottom:6}}>
  //             <TouchableHighlight

  //                   //onShowUnderlay={separators.highlight}
  //                   //onHideUnderlay={separators.unhighlight}
  //                   style={{ flex: 1}}>
  //                     <View alignItems="center">
  //                       <Image source={require('./res/shareWorkout.png')}/>
  //                     </View>
  //                 </TouchableHighlight>
  //                 <TouchableHighlight

  //                   //onShowUnderlay={separators.highlight}
  //                   //onHideUnderlay={separators.unhighlight}
  //                   style={{ flex: 1}}>
  //                     <View alignItems="center">
  //                       <Image source={require('./res/shareWorkout.png')}/>
  //                     </View>
  //                 </TouchableHighlight>
  //             </View>
  //           </ScrollView>

  //       </View>
  //     </Modal>
  //   )
  // }
  renderDetail() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showDetail}
        onRequestClose={() => this.setState({showDetail: false})}
        transparent>
        <View style={styles.modalDetailContainer}>
          <Image
            source={require('../../res/workoutimage.png')}
            style={{
              width: '130%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 130,
            }}
            resizeMode="cover"></Image>

          <LinearGradient
            colors={['rgba(196,196,196, .70)', 'rgba(0,0,0, .50)']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            useAngle
            angle={270.07}
            style={{flex: 1}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: 48,
                  width: 48,
                  backgroundColor: '#F0F5FA',
                  marginLeft: 16,
                  borderRadius: 24,
                }}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    left: 0,
                    height: 48,
                    width: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '',
                  }}
                  onPress={() => {
                    this.setState({showDetail: false});
                  }}>
                  <Image
                    source={require('../../res/close.png')}
                    style={{height: 13, width: 13}}></Image>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: '#00A1FF',
                    fontSize: 36,
                    lineHeight: 38,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                  }}>
                  12:45
                </Text>
                <Text
                  style={{
                    color: '#96AAC6',
                    fontSize: 14,
                    lineHeight: 16,
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    letterSpacing: 1.6,
                    marginTop: 5,
                  }}>
                  PYRAMID SET 5/5{' '}
                </Text>
              </View>
              <View
                style={{
                  height: 48,
                  width: 48,
                  backgroundColor: '#F0F5FA',
                  marginRight: 18,
                  borderRadius: 24,
                }}>
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    left: 0,
                    height: 48,
                    width: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '',
                  }}
                  onPress={() => {
                    this.setState({showDetail: false});
                  }}>
                  <Image
                    source={require('../../res/threeline.png')}
                    style={{height: 13, width: 18}}></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 5}}>
              <LinearGradient
                colors={['rgba(0,123,255, 1)', 'rgba(0,161,255, 1)']}
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                useAngle
                angle={192.45}
                style={{
                  flex: 1,
                  borderBottomRightRadius: 40,
                  borderBottomLeftRadius: 40,
                }}>
                <WorkoutRestCell />
                {/* <WorkoutCell exercise="Rear Dumbell Flies" time="00:22"/> */}
              </LinearGradient>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              {/* <Text  style={{color:"#ffffff",fontSize:18,lineHeight:25,fontStyle:"normal",fontWeight:"bold",fontFamily:"Poppins"}}>Reverse Grip Pull Ups</Text>
                 <Text  style={{color:"#ffffff", marginTop:5,fontSize:18,lineHeight:25,fontStyle:"normal",fontWeight:"bold",fontFamily:"Poppins" }}>15 Reps</Text> */}
              <WorkoutCollapsedCell
                exercise="Reverse Grip Pull Ups"
                reps={15}
              />
            </View>
          </LinearGradient>
        </View>
      </Modal>
    );
  }

  render() {
    // console.disableYellowBox = true;
    const windowHeight = SCREEN_HEIGHT * DEFAULT_WINDOW_MULTIPLIER;
    var {scrollY} = this.state;
    return (
      <View style={styles.mainContainer}>
        {
 
        Platform.OS === 'android' &&        <StatusBar backgroundColor="#0183ff" barStyle="light-content" />
        }

        <View style={styles.header}>
          <Animated.Image
            style={[
              styles.header,
              {
                height: windowHeight,
                transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [-windowHeight, 0, windowHeight],
                      outputRange: [windowHeight / 3, 0, -windowHeight / 15],
                    }),
                  },
                  {
                    scale: scrollY.interpolate({
                      inputRange: [-windowHeight, 0, windowHeight],
                      outputRange: [2, 1, 1.5],
                    }),
                  },
                ],
              },
            ]}
            resizeMode="cover"
            source={require('../../res/header_img.png')}>
            {/* <Image source={require('./res/header_img.png')} style={styles.header} /> */}
          </Animated.Image>
          <TouchableOpacity style={styles.back} onPress={() => Actions.pop()}>
            <Image
              style={styles.backButton}
              source={require('../../res/back.png')}
            />
          </TouchableOpacity>
          <View style={styles.save}>
            <Image
              style={styles.saveButton}
              source={require('../../res/save.png')}
            />
          </View>
        </View>

        <ScrollView
          ref={(component) => {
            this._scrollView = component;
          }}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
          ])}
          scrollEventThrottle={16}
          style={{position: 'absolute', top: 0, bottom: 0, width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <View style={{flexDirection: 'column', flex: 1, paddingBottom: 116}}>
            <Animated.View
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [
                    -windowHeight,
                    0,
                    windowHeight * DEFAULT_WINDOW_MULTIPLIER,
                  ],
                  outputRange: [1, 1, 0],
                }),
              }}>
              <View style={{marginTop: 180}}>
                <Text
                  style={{
                    color: '#FDFDFD',
                    fontSize: 14,
                    fontStyle: 'normal',
                    letterSpacing: 1.6,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    marginLeft: 16,
                  }}>
                  TODAY'S WORKOUT
                </Text>
                <Text
                  style={{
                    color: '#FDFDFD',
                    fontSize: 35,
                    fontFamily: 'Poppins-Bold',
                    marginLeft: 16,
                    marginTop: 8,
                  }}>
                  Full Body Attack
                </Text>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: '600',
                      fontStyle: 'normal',
                      lineHeight: 30,
                      fontFamily: 'Poppins',
                      marginLeft: 16,
                      backgroundColor: 'rgba(11,11,11,.32)',
                      paddingLeft: 12,
                      paddingRight: 13,
                      textAlign: 'center',
                      borderRadius: 40,
                      paddingTop: 1,
                    }}>
                    25 Mins
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: '600',
                      fontStyle: 'normal',
                      lineHeight: 30,
                      fontFamily: 'Poppins',
                      marginLeft: 16,
                      backgroundColor: 'rgba(11,11,11,.32)',
                      paddingLeft: 12,
                      paddingRight: 13,
                      textAlign: 'center',
                      paddingTop: 1,
                      borderRadius: 40,
                    }}>
                    Intesity {'\u25cf'}
                    {'\u25cf'}
                    {'\u25cf'}
                  </Text>
                </View>
              </View>
            </Animated.View>
            <View
              style
              style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: 33,
              }}>
              <View style style={{marginTop: 31, flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    color: '#25292E',
                    marginLeft: 16,
                    fontWeight: 'bold',
                    fontSize: 22,
                    lineHeight: 28,
                  }}>
                  Warm Up
                </Text>

                <TouchableOpacity
                  style={{width: 22, height: 22, top: 5, left: 15}}
                  onPress={this.ShowHideComponent}>
                  {this.state.show ? (
                    <Image
                      style={{
                        tintColor: '#586178',
                        width: 22,
                        height: 22,
                        transform: [{rotate: '180deg'}],
                      }}
                      source={require('../../res/down.png')}
                    />
                  ) : (
                    <Image
                      style={{tintColor: '#586178', width: 22, height: 22}}
                      source={require('../../res/down.png')}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.ChangeSwitch}
                  style={{
                    alignContent: 'center',
                    width: 57,
                    height: 32,
                    borderRadius: 120,
                    right: 0,
                    position: 'absolute',
                    alignSelf: 'center',
                    marginRight: 16,
                  }}>
                  {this.state.isSwitchOn ? (
                    <View
                      style={{
                        backgroundColor: '#0181ff',
                        alignContent: 'center',
                        width: 57,
                        height: 32,
                        borderRadius: 120,
                        right: 0,
                        position: 'absolute',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 14,
                          alignSelf: 'flex-end',
                          marginRight: 2,
                          marginTop: 2,
                        }}></View>
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#BDBDBD',
                        alignContent: 'center',
                        width: 57,
                        height: 32,
                        borderRadius: 120,
                        right: 0,
                        position: 'absolute',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 14,
                          alignSelf: 'flex-start',
                          marginLeft: 2,
                          marginTop: 2,
                        }}></View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 1,
                  marginTop: 29,
                }}
              />

              {this.state.show ? (
                <View>
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}>
                    <View style={{flexDirection: 'row', marginTop: 16}}>
                      <View>
                        <Image
                          style={{
                            width: 72,
                            height: 72,
                            marginLeft: 16,
                            marginTop: 11,
                          }}
                          source={require('../../res/list_image.png')}
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          marginTop: 11,
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Swiss Ball Torso Twist
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: '#96AAC6',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              lineHeight: 24,
                            }}>
                            4 Rounds
                          </Text>
                          <Text
                            style={{
                              color: '#1AA0FF',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              marginLeft: 12,
                              lineHeight: 24,
                            }}>
                            15 Reps
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          marginTop: 11,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                      borderBottomColor: '#F0F5FA',
                      borderBottomWidth: 1,
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          style={{
                            width: 72,
                            height: 72,
                            marginLeft: 16,
                            marginTop: 11,
                          }}
                          source={require('../../res/list_image.png')}
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          marginTop: 11,
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Swiss Ball Torso Twist
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: '#96AAC6',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              lineHeight: 24,
                            }}>
                            4 Rounds
                          </Text>
                          <Text
                            style={{
                              color: '#1AA0FF',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              marginLeft: 12,
                              lineHeight: 24,
                            }}>
                            15 Reps
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          marginTop: 11,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                      borderBottomColor: '#F0F5FA',
                      borderBottomWidth: 1,
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          style={{
                            width: 72,
                            height: 72,
                            marginLeft: 16,
                            marginTop: 11,
                          }}
                          source={require('../../res/list_image.png')}
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          marginTop: 11,
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Swiss Ball Torso Twist
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: '#96AAC6',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              lineHeight: 24,
                            }}>
                            4 Rounds
                          </Text>
                          <Text
                            style={{
                              color: '#1AA0FF',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              marginLeft: 12,
                              lineHeight: 24,
                            }}>
                            15 Reps
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          marginTop: 11,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                      borderBottomColor: '#F0F5FA',
                      borderBottomWidth: 2,
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  />
                </View>
              ) : null}

              <View
                style={{
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 16,
                  marginTop: 16,
                  marginBottom: 16,
                }}
              />

              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{marginLeft: 16, marginTop: 15, resizeMode: 'stretch'}}
                  source={require('../../res/arrowline.png')}
                />
                <View style={{flexDirection: 'column', flex: 1}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        lineHeight: 28,
                        fontSize: 22,
                        fontStyle: 'normal',
                        marginLeft: 22,
                        marginTop: 15,
                      }}>
                      Pyramid Set
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setState({showPyramidSet: true})}>
                      <Text
                        style={{
                          fontFamily: 'Poppins',
                          color: '#1AA0FF',
                          textAlign: 'center',
                          paddingTop: 3,
                          width: 22,
                          height: 22,
                          borderRadius: 40,
                          marginLeft: 10,
                          fontSize: 12,
                          marginTop: 17,
                          backgroundColor: '#F0F5FA',
                        }}>
                        ?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      marginTop: 4,
                      lineHeight: 24,
                      color: '#6F80A7',
                      marginLeft: 22,
                      fontSize: 12,
                    }}>
                    5 Rounds
                  </Text>
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 6,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          style={{
                            width: 72,
                            height: 72,
                            marginLeft: 22,
                            marginTop: 11,
                          }}
                          source={require('../../res/list_image.png')}
                        />
                        <Text
                          style={{
                            fontFamily: 'Poppins',
                            position: 'absolute',
                            marginLeft: 14,
                            marginTop: 4,
                            fontWeight: 'bold',
                            color: '#292E3A',
                            textAlign: 'center',
                            paddingTop: 3,
                            width: 22,
                            height: 22,
                            borderRadius: 40,
                            fontSize: 12,
                            backgroundColor: '#FFFFFF',
                          }}>
                          1
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          marginTop: 11,
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Treadmill Walk 2
                        </Text>
                        <Text
                          style={{
                            color: '#1AA0FF',
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium',
                            lineHeight: 24,
                          }}>
                          12-15 Reps
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          marginTop: 11,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                      borderBottomColor: '#F0F5FA',
                      borderBottomWidth: 1,
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          style={{width: 72, height: 72, marginLeft: 22}}
                          source={require('../../res/list_image.png')}
                        />
                        <Text
                          style={{
                            fontFamily: 'Poppins',
                            position: 'absolute',
                            marginLeft: 14,
                            fontWeight: 'bold',
                            marginTop: -4,
                            color: '#292E3A',
                            textAlign: 'center',
                            paddingTop: 3,
                            width: 22,
                            height: 22,
                            borderRadius: 40,
                            fontSize: 12,
                            backgroundColor: '#FFFFFF',
                          }}>
                          2
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Reverse EZ-bar Curl
                        </Text>
                        <Text
                          style={{
                            color: '#1AA0FF',
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium',
                            lineHeight: 24,
                          }}>
                          12-15 Reps
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                      borderBottomColor: '#F0F5FA',
                      borderBottomWidth: 1,
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          style={{width: 72, height: 72, marginLeft: 22}}
                          source={require('../../res/list_image.png')}
                        />
                        <Text
                          style={{
                            fontFamily: 'Poppins',
                            position: 'absolute',
                            marginLeft: 14,
                            marginTop: -4,
                            fontWeight: 'bold',
                            color: '#292E3A',
                            textAlign: 'center',
                            paddingTop: 3,
                            width: 22,
                            height: 22,
                            borderRadius: 40,
                            fontSize: 12,
                            backgroundColor: '#FFFFFF',
                          }}>
                          3
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Swiss Ball Torso Twist
                        </Text>
                        <Text
                          style={{
                            color: '#1AA0FF',
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium',
                            lineHeight: 24,
                          }}>
                          12-15 Reps
                        </Text>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          marginTop: 11,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 16,
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 1,
                  marginTop: 16,
                }}
              />
              <View
                style={{
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 16,
                  marginTop: 16,
                  marginBottom: 16,
                }}
              />
              <View
                style
                style={{
                  marginTop: 31,
                  flexDirection: 'row',
                  alignContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#25292E',
                    marginLeft: 16,
                    fontWeight: 'bold',
                    fontSize: 22,
                    lineHeight: 28,
                  }}>
                  Cool Down
                </Text>

                <TouchableOpacity
                  style={{width: 28, height: 28, top: 3, left: 15}}
                  onPress={this.ShowCoolDownHideComponent}>
                  {this.state.showCoolDown ? (
                    <Image
                      style={{
                        tintColor: '#586178',
                        width: 22,
                        height: 22,
                        transform: [{rotate: '180deg'}],
                      }}
                      source={require('../../res/down.png')}
                    />
                  ) : (
                    <Image
                      style={{tintColor: '#586178', width: 22, height: 22}}
                      source={require('../../res/down.png')}
                    />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.ChangeCoolDownSwitch}
                  style={{
                    alignContent: 'center',
                    width: 57,
                    height: 32,
                    borderRadius: 120,
                    right: 0,
                    position: 'absolute',
                    alignSelf: 'center',
                    marginRight: 16,
                  }}>
                  {this.state.isCoolDownSwitchOn ? (
                    <View
                      style={{
                        backgroundColor: '#0181ff',
                        alignContent: 'center',
                        width: 57,
                        height: 32,
                        borderRadius: 120,
                        right: 0,
                        position: 'absolute',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 14,
                          alignSelf: 'flex-end',
                          marginRight: 2,
                          marginTop: 2,
                        }}></View>
                    </View>
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#BDBDBD',
                        alignContent: 'center',
                        width: 57,
                        height: 32,
                        borderRadius: 120,
                        right: 0,
                        position: 'absolute',
                        alignSelf: 'center',
                      }}>
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: '#FFFFFF',
                          borderRadius: 14,
                          alignSelf: 'flex-start',
                          marginLeft: 2,
                          marginTop: 2,
                        }}></View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={{
                  borderBottomColor: '#F0F5FA',
                  borderBottomWidth: 1,
                  marginTop: 29,
                }}
              />

              {this.state.showCoolDown ? (
                <View>
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}>
                    <View style={{flexDirection: 'row', marginTop: 16}}>
                      <View>
                        <Image
                          style={{
                            width: 72,
                            height: 72,
                            marginLeft: 16,
                            marginTop: 11,
                          }}
                          source={require('../../res/list_image.png')}
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          marginTop: 11,
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Swiss Ball Torso Twist
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: '#96AAC6',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              lineHeight: 24,
                            }}>
                            4 Rounds
                          </Text>
                          <Text
                            style={{
                              color: '#1AA0FF',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              marginLeft: 12,
                              lineHeight: 24,
                            }}>
                            15 Reps
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          marginTop: 11,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                      borderBottomColor: '#F0F5FA',
                      borderBottomWidth: 1,
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.setState({showReplaceExcercise: true})}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          style={{
                            width: 72,
                            height: 72,
                            marginLeft: 16,
                            marginTop: 11,
                          }}
                          source={require('../../res/list_image.png')}
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          flexDirection: 'column',
                          marginTop: 11,
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#292E3A',
                            fontSize: 16,
                            fontFamily: 'Poppins-Bold',
                            lineHeight: 24,
                          }}>
                          Swiss Ball Torso Twist
                        </Text>

                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              color: '#96AAC6',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              lineHeight: 24,
                            }}>
                            4 Rounds
                          </Text>
                          <Text
                            style={{
                              color: '#1AA0FF',
                              fontSize: 15,
                              fontFamily: 'Poppins-Medium',
                              marginLeft: 12,
                              lineHeight: 24,
                            }}>
                            15 Reps
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          marginLeft: 16,
                          marginTop: 11,
                          height: 20,
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 16,
                          alignSelf: 'center',
                        }}>
                        <Image
                          style={{height: 20, width: 20}}
                          source={require('../../res/setticon.png')}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      marginLeft: 16,
                      marginRight: 16,
                      borderBottomColor: '#F0F5FA',
                      borderBottomWidth: 1,
                      marginTop: 16,
                      marginBottom: 16,
                    }}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 1}}
          useAngle
          angle={180}
          style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({showDetail: true})}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 64,
            }}>
              <TouchableOpacity  style={{
                height: 64,
                alignItems: 'center',
                bottom: 26,
                width: '100%',
                paddingLeft: 16,
                paddingRight: 16,
              }} onPress={() => {
                Actions.Workout()
              }}>
              <LinearGradient
                colors={['#007BFF', '#00A1FF']}
                style={{
                  flex: 1,
                  width: '100%',
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'Poppins-Medium',
                    fontSize: 18,
                    lineHeight: 24,
                  }}>
                  Start Workout
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </TouchableOpacity>
        </LinearGradient>

        {/* new screen */}

        {this.renderReplaceExcercise()}
        {this.renderPyramidSet()}
        {/* {this.renderDetail()} */}
        {this.renderDetailWithScroll()}
        {
          //this.renderWorkoutComplete()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 400,
  },
  headerOverlay: {
    width: '100%',
    height: 400,
    position: 'absolute',
    backgroundColor: '#22B3FF',
    opacity: 0.7,
  },
  back: {
    backgroundColor: '#FFFFFF',
    width: 45,
    height: 45,
    position: 'absolute',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 16,
    zIndex: 100
  },
  backButton: {
    width: 30,
    height: 30,
    tintColor: '#22B3FF',
  },
  save: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    right: 0,
    width: 45,
    height: 45,
    position: 'absolute',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginRight: 16,
  },
  saveButton: {
    width: 30,
    height: 30,
    tintColor: '#FFFFFF',
  },
  headerBottom: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 150,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'column-reverse',
  },
  modalDetailContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  OvalShapeView: {
    //To make Oval Shape
    marginTop: 20,
    width: '100%',
    height: 330,
    // backgroundColor: '#ED2525',
    borderRadius: 37,
    // transform: [{ scaleX: 2 }],
  },
});
