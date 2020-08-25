import * as React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    Platform,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    Text,
    PanResponder,
    Animated,
    Easing,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {mediaHost} from '../../config';
import Video from 'react-native-video';
import {CheckList, Swap, Pause, Play, ArrowNext} from 'dash/src/components/Icons';
import CountDownAnimation from './CountDownAnimation';
import RestAnimation from './RestAnimation';
import RestTime from './RestTime';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import testVideo from '../../res/video/Jump-Squat.mp4'
import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

export default class extends React.Component {

    translateY = new Animated.Value(0);
    position = new Animated.Value(0);
    pauseOpacity = new Animated.Value(0);
    opacityTimer;
    videoRef = React.createRef(null);
    scrollDescription = React.createRef(null);
    setTimeoutTimer;
    panSetTimeout;

    constructor(props) {
        super(props);
        this.state = {
            position: new Animated.Value(1),
            currentIndex: 0,
            pause: false,
            countDown: false,
            rest: false,
            descriptionScroll: null,
            descriptionScrollHeight: 0,
            timer: 0,
            VideoTimer: 0,
            totaltime: 0,
            cyclesCountCircuit: 0,
            isVideoLoadToPlay: false,
            videoPaused: true,
            showTimeLimit: false,
            videoLoading: false,
            exerciseSets: 1,
            restDuration: 0,
            numberOfTextLine: 3,
            completeTaskTime: false,
            restTimerPause: false,
            taskPaused: false,
            openDescription: false
        };
    }

    toBottom = () => {
        this.setState({descriptionScroll: null, openDescription: false})
        this.scrollDescription.current.scrollTo(0)
        Animated.timing(this.translateY, {
            toValue: 0,
            duration: 50,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();

        this.translateY.flattenOffset();

        clearTimeout(this.panSetTimeout);
        this.panSetTimeout = setTimeout(() => {
            clearTimeout(this.setTimeoutTimer);
            this.setState({videoPaused: false, restTimerPause: false, taskPaused: false});
            this.timer();
            this.props.onPlayPause(false);
        }, 500);
    }


    panResponder = PanResponder.create({

        onMoveShouldSetResponderCapture: () => true,

        onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
            console.log(gestureState.dy, this.state.descriptionScroll)
            if (this.state.descriptionScroll === 0 && gestureState.dy > 0) {
                this.toBottom()
            } else {
                return Math.abs(gestureState.dy) > 5
            }
        },

        onPanResponderGrant: (e, gestureState) => {
            this.translateY.extractOffset();
        },

        onPanResponderMove: Animated.event([null, {dx: 0, dy: this.translateY}], {
            useNativeDriver: false,
        }),

        onPanResponderRelease: (e, gestureState) => {
            console.log(gestureState.dy)
            if (gestureState.dy < 0) {
                this.setState({openDescription: true, descriptionScroll: 0})
                Animated.timing(this.translateY, {
                    toValue: -(height),
                    easing: Easing.out(Easing.poly(4)),
                    timing: Animated.timing,
                    useNativeDriver: false,
                }).start();

                clearTimeout(this.panSetTimeout);
                this.panSetTimeout = setTimeout(() => {
                    clearTimeout(this.setTimeoutTimer);
                    this.setState({videoPaused: true, restTimerPause: true, taskPaused: true});
                    this.props.onPlayPause(true);

                }, 500);

            } else {
                this.toBottom()
            }
        },
    });


    countDown = () => {

        const {story: {videos}} = this.props;
        const {currentIndex} = this.state;
        const countDownHide = videos[currentIndex].cardType == "rest" || videos[currentIndex].cardType == "note" ? true : false;

        // if card is solo and exercise is Seconds type ---
        let timerValidate = false;
        let timeValue = 0;
        const repCountSeconds = videos[currentIndex].cardType == "exercise" && videos[currentIndex].Reps == "Seconds" ? true : false;
        if (repCountSeconds) {
            const dataExercise = videos[currentIndex].RepsCount;
            timerValidate = dataExercise && dataExercise != "" ? true : false;
            timeValue = dataExercise && dataExercise != "" ? videos[currentIndex].RepsCount : 0;
        }

        this.setState({
            timer: timeValue,
            pause: false,
            showTimeLimit: timerValidate,
            completeTaskTime: false,
            videoPaused: true,
            VideoTimer: 0,
            countDown: countDownHide ? false : true
        });

    };

    restEnd = () => {
        this.setState({rest: false, pause: false, countDown: true});
    };

    start = () => {
        if (!this.state.pause) {
            this.timer();
        }
    };

    timer = () => {
        const {completeTaskTime, countDown, rest, showTimeLimit} = this.state;
        clearTimeout(this.setTimeoutTimer);
        if (!countDown && !rest && showTimeLimit && !completeTaskTime) {
            this.setTimeoutTimer = setTimeout(() => {
                this.setState(
                    (prev) => {
                        return {
                            timer: prev.timer - 1,
                            totaltime: prev.totaltime + 1
                        };
                    },
                    () => {
                        if (this.state.timer === 0) {
                            const autoPlay = this.props.story.videos[this.state.currentIndex].AutoPlay;
                            this.setState({completeTaskTime: true});
                            this.next(autoPlay);
                        } else {
                            if (!this.state.pause) {
                                this.timer();
                            }
                        }
                    },
                );
            }, 1000);
        }
    }

    next = (autoPlay = false) => {

        const {isCircuit, story: {videos}} = this.props;
        const {currentIndex, exerciseSets} = this.state;
        const cardType = videos[currentIndex].cardType;
        const cardAutoPlay = videos[currentIndex].AutoPlay;
        const restTime = videos[currentIndex].RestTime ? videos[currentIndex].RestTime != "" ? true : false : false;
        const restDuration = restTime ? videos[currentIndex].RestTime : 0;

        // if autoplay is true ----
        if (autoPlay == false && cardAutoPlay == false) {
            const repCountSeconds = videos[currentIndex].cardType == "exercise" && videos[currentIndex].Reps == "Seconds" ? true : false;
            if (repCountSeconds) {
                this.videoRef.current.seek(0);
                this.setState({videoPaused: true});
            }
            return null;
        }

        // repeat exercise by sets ----
        if (!isCircuit && cardType == "exercise") {
            const sets = videos[currentIndex].Sets;
            if (sets > 1 && exerciseSets != sets) {

                let timerValidate = false;
                let timeValue = 0;
                const repCountSeconds = videos[currentIndex].cardType == "exercise" && videos[currentIndex].Reps == "Seconds" ? true : false;
                if (repCountSeconds) {
                    const dataExercise = this.props.story.videos[currentIndex].RepsCount;
                    timerValidate = dataExercise && dataExercise != "" ? true : false;
                    timeValue = dataExercise && dataExercise != "" ? this.props.story.videos[currentIndex].RepsCount : 0;
                }

                this.setState({
                    exerciseSets: exerciseSets + 1,
                    rest: restTime,
                    restDuration: restDuration,
                    timer: timeValue,
                    pause: false,
                    showTimeLimit: timerValidate,
                    completeTaskTime: false,
                    videoPaused: true,
                    count: true
                });

                this.videoRef.current.seek(0);
                this.setState({videoPaused: false});
                return null;
            }

        }

        // if complete items of cards then change to next story
        if (currentIndex === videos.length - 1) {
            this.nextStory();
            return null;
        }


        Animated.spring(this.state.position, {
            toValue: (this.state.currentIndex + 1) * ((width / videos.length) - 5),
        }).start()

        // validate circuit count
        this.setState(
            (prev) => {
                this.pauseOpacity.setValue(0);
                let timerValidate = false;
                let timeValue = 0;
                const flag = this.props.story.videos[prev.currentIndex].flag === "video" ? true : false;
                const repCountSeconds = videos[prev.currentIndex + 1].cardType == "exercise" && videos[prev.currentIndex + 1].Reps == "Seconds" ? true : false;

                if (repCountSeconds) {
                    const dataExercise = this.props.story.videos[prev.currentIndex + 1].RepsCount;
                    timerValidate = dataExercise && dataExercise != "" ? true : false;
                    timeValue = dataExercise && dataExercise != "" ? this.props.story.videos[prev.currentIndex + 1].RepsCount : 0;
                } else {
                    timerValidate = this.props.story.videos[prev.currentIndex + 1].timer;
                    timeValue = timerValidate ? this.props.story.videos[prev.currentIndex + 1].RestTime : 0;
                }
                const cardFlag = this.props.story.videos[prev.currentIndex].flag === "rest" ? true : false;
                const countDownHide = videos[prev.currentIndex + 1].cardType == "rest" || videos[prev.currentIndex + 1].cardType == "note" ? true : false;
                return {
                    currentIndex: prev.currentIndex + 1,
                    timer: timeValue,
                    pause: false,
                    showTimeLimit: timerValidate,
                    rest: cardFlag ? false : restTime,
                    restDuration: cardFlag ? 0 : restDuration,
                    countDown: countDownHide ? false : true,
                    completeTaskTime: false
                };
            },
            () => {
                if (this.setTimeoutTimer) {
                    clearTimeout(this.setTimeoutTimer);
                }
                this.timer();
            },
        );
    };

    prev = () => {
        const {isCircuit, story: {videos}} = this.props;
        const {currentIndex, exerciseSets} = this.state;

        const restTime = videos[currentIndex].RestTime ? videos[currentIndex].RestTime != "" ? true : false : false;
        const restDuration = restTime ? videos[currentIndex].RestTime : 0;

        Animated.spring(this.state.position, {
            toValue: (this.state.currentIndex - 1) * ((width / videos.length) - 5),
        }).start()

        this.setState(
            (prev) => {
                this.pauseOpacity.setValue(0);
                let timerValidate = false;
                let timeValue = 0;
                const flag = this.props.story.videos[prev.currentIndex].flag === "video" ? true : false;
                const repCountSeconds = videos[prev.currentIndex - 1].cardType == "exercise" && videos[prev.currentIndex - 1].Reps == "Seconds" ? true : false;

                if (repCountSeconds) {
                    const dataExercise = this.props.story.videos[prev.currentIndex - 1].RepsCount;
                    timerValidate = dataExercise && dataExercise != "" ? true : false;
                    timeValue = dataExercise && dataExercise != "" ? this.props.story.videos[prev.currentIndex - 1].RepsCount : 0;
                } else {
                    timerValidate = this.props.story.videos[prev.currentIndex - 1].timer;
                    timeValue = timerValidate ? this.props.story.videos[prev.currentIndex - 1].RestTime : 0;
                }

                const cardFlag = this.props.story.videos[prev.currentIndex].flag === "rest" ? true : false;
                const countDownHide = videos[prev.currentIndex - 1].cardType == "rest" || videos[prev.currentIndex - 1].cardType == "note" ? true : false;
                return {
                    currentIndex: prev.currentIndex - 1,
                    timer: timeValue,
                    pause: false,
                    showTimeLimit: timerValidate,
                    videoPaused: flag,
                    rest: cardFlag ? false : restTime,
                    restDuration: cardFlag ? 0 : restDuration,
                    countDown: countDownHide ? false : true,
                    completeTaskTime: false
                };
            },
            () => {
                if (this.setTimeoutTimer) {
                    clearTimeout(this.setTimeoutTimer);
                }
                this.timer();
            },
        );
    };

    nextStory = () => {

        Animated.spring(this.state.position, {
            toValue: 120,
        })

        // For managing cyclecount of circuit
        if (this.state.cyclesCountCircuit && this.state.cyclesCountCircuit > 0 && this.props.isCircuit) {
            const timerValidate = this.props.story.videos[0].timer;
            const timeValue = timerValidate ? this.props.story.videos[0].RestTime : 0;
            const countDownHide = this.props.story.videos[0].cardType == "rest" || this.props.story.videos[0].cardType == "note" ? true : false;
            Animated.spring(this.state.position, {
                toValue: 0,
            }).start()
            this.setState({
                cyclesCountCircuit: this.state.cyclesCountCircuit - 1,
                currentIndex: 0,
                pause: false,
                countDown: countDownHide ? false : true,
                rest: false,
                timer: timeValue,
                showTimeLimit: timerValidate,
                completeTaskTime: false
            })
            this.timer();
            return;
        }

        if (this.state.currentIndex === this.props.story.videos.length - 1) {
            if (this.props.story.videos[this.state.currentIndex].cardType == "exercise") {
                this.setState({exerciseSets: 1});
                this.videoRef.current.seek(0);
                this.setState({videoPaused: false});
            }

            this.props.nextStory();
        } else {
            this.next();
        }
    };

    prevStory = () => {
        if (this.state.currentIndex === 0) {
            this.props.prevStory();
        } else {
            this.prev();
        }
    };

    onPressPause = () => {
        this.setState((prev) => {

            if (this.opacityTimer) {
                clearTimeout(this.opacityTimer);
                this.opacityTimer = undefined;
            }

            Animated.timing(this.pauseOpacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: false,
            }).start();

            if (!!prev.pause) {
                this.opacityTimer = setTimeout(() => {
                    Animated.timing(this.pauseOpacity, {
                        toValue: 0,
                        duration: 250,
                        useNativeDriver: false,
                    }).start();
                }, 1000);
            }

            if (!prev.pause) {
                if (this.setTimeoutTimer) {
                    clearTimeout(this.setTimeoutTimer);
                }
                this.props.onPlayPause(true);
            } else {
                this.timer();
                this.props.onPlayPause(false);
            }
            return {
                pause: !prev.pause,
                videoPaused: !prev.videoPaused,
                restTimerPause: !prev.restTimerPause,
                taskPaused: !prev.taskPaused,
            };
        });
    };

    stop = () => {
        const {story: {videos}} = this.props;
        const {currentIndex} = this.state;
        const countDownHide = videos[currentIndex].cardType == "rest" || videos[currentIndex].cardType == "note" ? true : false;
        this.translateY.setValue(0);
        this.setState({videoPaused: true});
        if (this.setTimeoutTimer) {
            clearTimeout(this.setTimeoutTimer);
        }
        Animated.spring(this.state.position, {
            toValue: 0
        }).start()
        this.setState({
            currentIndex: 0,
            pause: false,
            countDown: countDownHide ? false : true,
            rest: false,
            timer: 0,
            showTimeLimit: false,
            completeTaskTime: false,
            exerciseSets: 1
        });
    };

    componentDidMount = () => {
        if (this.props.dayTasks.versionDayTaskCard && this.props.dayTasks.versionDayTaskCard.length > 0) {
            let array1 = this.props.dayTasks.versionDayTaskCard
            let dict = array1[0];
            this.setState({cyclesCountCircuit: dict.Cycles - 1})
        }
    }

    onCompleteRestTime(autoPlay) {
        const {countDown, rest} = this.state;
        if (autoPlay && !countDown && !rest) {
            this.next();
        }
    }

    renderComponent(data) {
        if (data.flag === "note") {
            return (
                <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>{data.title ? data.title : ""}</Text>
                    <Text style={styles.notesText}>{data.description ? data.description : ""}</Text>
                </View>
            );
        } else if (data.flag === "rest") {

            return (
                <RestTime
                    taskPaused={this.state.taskPaused}
                    duration={data.RestTime}
                    // duration={100}
                    autoplay={data.AutoPlay}
                    oncomplete={() => this.onCompleteRestTime(data.AutoPlayShowFlag)}
                    onPress={() => this.next(true)}
                    status={this.state.restTimerPause}
                />
            );
        }
    }

    //
    renderNextButton = () => {
        const {isCircuit, story: {videos}} = this.props;
        const {currentIndex, rest, countDown, taskPaused} = this.state;
        const cardType = videos[currentIndex].cardType;

        if (taskPaused) {
            return null;
        }

        if (cardType == "rest" || rest == true || countDown == true) {
            return null;
        }

        if (!isCircuit && cardType != "exercise") {
            return null;
        }

        if (!isCircuit && cardType == "exercise") {
            const sets = videos[currentIndex].Sets;
            if (sets == "" || sets == 1) {
                return null;
            }
        }

        return (
            <TouchableWithoutFeedback onPress={() => this.next(true)}>
                <View style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>Next</Text><ArrowNext/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderTaskActionButton = () => {
        const {taskPaused} = this.state;

        if (taskPaused === false) {
            return null;
        }

        return (
            <View style={styles.endTaskButtonContainer}>
                <TouchableWithoutFeedback onPress={() => this.onClickWorkoutTaskAction("setting", true)}>
                    <View style={styles.endTaskButton}>
                        <Image source={require('../../res/settingButton.png')} style={{height: 50}}
                               resizeMode={"contain"}/>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.onClickWorkoutTaskAction("endTask", true)}>
                    <View style={styles.endTaskButton}>
                        <Image source={require('../../res/endTaskButton.png')} style={{height: 50}}
                               resizeMode={"contain"}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    // action on video end -------
    onEndVideo(data) {
        const {story: {videos}} = this.props;
        const {currentIndex} = this.state;
        const repCountRepeat = videos[currentIndex].cardType == "exercise" ? true : false;
        if (repCountRepeat) {
            return null;
        }
        if (data === "video" && videos[currentIndex].AutoPlay == true) {
            this.next();
        }
        return null;
    }

    // action on video ready to play -------
    onReadyForDisplay() {
        const {story: {videos}} = this.props;
        const {currentIndex} = this.state;
        const exerciseSeconds = videos[currentIndex].cardType == "exercise" && videos[currentIndex].Reps == "Seconds" ? true : false;
        if (exerciseSeconds) {
            this.timer();
        }
        this.setState({videoLoading: false, videoPaused: false})
    }

    // action on video loading for play -------
    onLoadStartVideo() {
        const {story: {videos}} = this.props;
        const {currentIndex} = this.state;
        const exerciseSeconds = videos[currentIndex].cardType == "exercise" && videos[currentIndex].Reps == "Seconds" ? true : false;
        if (exerciseSeconds) {
            if (this.setTimeoutTimer) {
                clearTimeout(this.setTimeoutTimer);
            }
        }
        this.setState({videoLoading: true, videoPaused: false});
        this.videoRef.current.seek(0);
    }

    // check video repeat play action
    checkVideoIsRepeat = (data) => {
        const cardExercise = data.cardType == "exercise" ? true : false;
        const cardVideo = data.cardType == "video" ? true : false;

        if (cardExercise == true) {
            return true;
        } else if (cardVideo == true && data.AutoPlay == false) {
            return true;
        }
        return false;
    }

    // get top-bottom linear gradient
    renderLinearGradient = (data) => {
        if (data.cardType == 'rest' || data.cardType == 'note') {
            return null;
        }

        return (
            <>
                <View style={styles.linearGradientContainer}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.0001)']}
                        style={styles.linearGradient}
                    />
                </View>
                <View style={styles.linearGradientContainerBottom}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.0001)', 'rgba(0,0,0,0.4)']}
                        style={styles.linearGradientBottom}
                        angle={-180}
                    />
                </View>
            </>
        );
    }

    onTextLayout = (e) => {
        this.setState({numberOfTextLine: e.nativeEvent.lines.length});
    }

    // get card description
    renderCardDescription = () => {
        const {story: {videos}, descriptionHide} = this.props;
        const {currentIndex, numberOfTextLine} = this.state;
        const {title, description, cardType, flag} = videos[currentIndex];

        if (descriptionHide == true && flag == "video") {
            return null;
        }

        if (cardType == "note") {
            return null;
        }


        return (
            <>
                <Text style={styles.storyTitle}>
                    {title ? title : ''}
                </Text>
                {/*{videos[currentIndex].cardType !== 'video' && (*/}
                {/*    <Text style={[*/}
                {/*        styles.storyDescription,*/}
                {/*    ]}*/}
                {/*          onTextLayout={this.onTextLayout}*/}
                {/*    >*/}
                {/*        {description ? description : ""}*/}
                {/*    </Text>*/}
                {/*)}*/}
                {videos[currentIndex].cardType !== 'video' && (
                    <Text style={[
                        styles.storyDescription,
                    ]}
                          onTextLayout={this.onTextLayout}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur at autem earum
                        fuga harum, hic, iusto magni minus nisi obcaecati perferendis quidem sunt veniam vero? Ab amet
                        beatae cumque, dolorem, dolorum eum laboriosam magnam minima modi nemo odio quod sit ut. Ad
                        architecto assumenda atque cum doloremque ducimus error, eveniet minus non officia omnis
                        perferendis porro quidem quo ratione repellendus, suscipit totam ullam unde vero vitae
                        voluptatem voluptatum. A ab, ad cumque explicabo fugiat libero nesciunt nisi odio officia
                        quaerat quam totam veniam, veritatis. Aliquid architecto ea earum, eum exercitationem harum
                        impedit ipsa, ipsum iure necessitatibus nisi obcaecati perspiciatis quisquam tempora temporibus
                        vero voluptas? A ab accusamus aliquam atque dolor dolore eos error explicabo fuga omnis
                        perspiciatis possimus praesentium quae quos reiciendis rem repellendus saepe tempora tempore,
                        ullam. At autem blanditiis dignissimos eligendi et labore quos recusandae reprehenderit, unde
                        veritatis. Cumque ipsa obcaecati quibusdam? Accusantium aperiam, cum dolor doloribus, eos error
                        ex expedita explicabo molestias obcaecati quas ratione veritatis vitae. Ab accusantium adipisci
                        aspernatur commodi dolore dolorum ducimus ea eius error exercitationem fuga illum iste iure,
                        iusto maxime minima nam necessitatibus non nostrum odio placeat porro possimus quae quaerat qui
                        ratione recusandae sit sunt temporibus tenetur totam veritatis voluptate.
                    </Text>
                )}
            </>
        );
    }

    // action for task overview screen ---
    overviewTimeout = null;
    onClickOverview = (data) => {
        if (data) {
            clearTimeout(this.overviewTimeout);
            this.overviewTimeout = setTimeout(() => {
                this.props.onTaskOverView();
            }, 500);
        }
        this.setState({videoPaused: data, restTimerPause: data, taskPaused: data});
        this.props.onPlayPause(data);
    }


    // action for taskAction screen ---
    taskActionTimeout = null;
    onClickWorkoutTaskAction = (type, data) => {
        if (data) {
            clearTimeout(this.taskActionTimeout);
            this.taskActionTimeout = setTimeout(() => {
                this.props.workoutTaskAction(type);
            }, 500);
        }
        // this.setState({ videoPaused: data, restTimerPause: data });
        // this.props.onPlayPause(data);
    }

    render() {
        const {story: {videos, timer}, totalTimer, index, activeIndex, isCircuit} = this.props;
        const {currentIndex, pause, countDown, rest, position, showTimeLimit, videoLoading, exerciseSets, videoPaused, VideoTimer, openDescription, descriptionScroll, descriptionScrollHeight} = this.state;
        const opacity = this.pauseOpacity.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
        });
        const minutes = showTimeLimit ? Math.floor(this.state.timer / 60) : 0;
        const seconds = showTimeLimit ? this.state.timer - minutes * 60 : 0;

        let minutesVideo = VideoTimer.currentTime ? Math.floor(VideoTimer.currentTime / 60) : 0;
        let secondsVideo = VideoTimer.currentTime ? VideoTimer.currentTime - minutesVideo * 60 : 0;
        secondsVideo = secondsVideo.toFixed(0)
        minutesVideo = minutesVideo.toFixed(0)


        const minTotal = Math.floor(totalTimer / 60);
        const secTotal = totalTimer - minTotal * 60;

        const heightContainer = this.translateY.interpolate({
            inputRange: [-(height - 100), 0],
            outputRange: [(height - 200), 70],
            extrapolate: 'clamp',
        });

        const translateY = this.translateY.interpolate({
            inputRange: [-(height - 100), 0],
            outputRange: [-(height - 300), 0],
            extrapolate: 'clamp',
        });

        const backgroundColor = this.translateY.interpolate({
            inputRange: [-(height - 200), 0],
            outputRange: ['rgba(88, 97, 120, 0.7)', 'rgba(88, 97, 120, 0)'],
            extrapolate: 'clamp',
        });

        const repCount = videos[currentIndex].cardType == "exercise" && videos[currentIndex].Reps == "Rep Count" ? videos[currentIndex].RepsCount : "";

        const exerciseSeconds = videos[currentIndex].cardType == "exercise" && videos[currentIndex].Reps == "Seconds" ? true : false;

        const restCard = videos[currentIndex].cardType == "rest" ? true : false;

        const videoRepeat = this.checkVideoIsRepeat(videos[currentIndex]);

        const restVideo = videos[currentIndex].flag === 'rest'


        return (
            <SafeAreaView style={styles.container}>
                {videos && videos.length > 0 && !countDown && activeIndex &&
                <>
                    {videos[currentIndex].flag === 'video' && videos[currentIndex].fileName != "" ?
                        <Video
                            onProgress={(e) => this.setState({VideoTimer: e})}
                            onSeek={(e) => this.setState({VideoTimer: {...VideoTimer, currentTime: e.currentTime}})}
                            ref={this.videoRef}
                            useNativeDriver={false}
                            paused={videoPaused}
                            repeat={videoRepeat}
                            currentTime={VideoTimer.currentTime}
                            source={{uri: `${mediaHost}${videos[currentIndex].fileName}`}}
                            // source={testVideo}
                            onReadyForDisplay={() => this.onReadyForDisplay()}
                            resizeMode={'cover'}
                            style={styles.video}
                            onLoadStart={() => this.onLoadStartVideo()}
                            onEnd={() => this.onEndVideo(videos[currentIndex].flag)}
                        />
                        :
                        <View style={styles.video} ref={this.videoRef}>
                            {this.renderComponent(videos[currentIndex])}
                        </View>
                    }
                </>
                }
                <Animated.View style={[styles.backgroundDescriptionOpen,
                    !rest && {backgroundColor},
                    restCard && {zIndex: -2},
                    rest && {backgroundColor: "#586178", opacity: 0.7}
                ]}
                />

                {this.renderLinearGradient(videos[currentIndex])}

                {/* ************* Play pause container **************** */}
                <View style={styles.centerContainer}>
                    <TouchableWithoutFeedback onPress={this.onPressPause}>
                        <Animated.View style={[styles.pauseContainer, {opacity}]}>
                            {pause ? (
                                <Play height={30} width={30}/>
                            ) : (
                                <Pause height={25} width={25}/>
                            )}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>

                {/* ************* item position indicator **************** */}
                {videos && videos.length !== 1 && (
                    <View style={styles.linesContainer}>
                        {/*currentIndex === index ? 'white' :*/}
                        <Animated.View
                            style={[
                                styles.line,
                                styles.activeLine,
                                {
                                    width: (width / videos.length) - 5 * (videos.length - 1),
                                    left: position
                                }]}
                        />

                        {videos.map((v, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.line,
                                    {
                                        backgroundColor: 'rgba(255,2555,255,0.4)',
                                    },
                                ]}
                            />
                        ))}
                    </View>
                )}

                {/* ************* Swipe Controller buttons **************** */}
                <TouchableWithoutFeedback onPress={this.prevStory}>
                    <View style={styles.prev}></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.nextStory}>
                    <View style={styles.next}></View>
                </TouchableWithoutFeedback>

                {/* ************* TimerContainer view ******************* */}
                <View style={styles.topRow}>
                    {this.props.isCircuit ?
                        <View>
                            <Text style={styles.title}>Circuit</Text>
                            <Text style={styles.title}>{this.state.cyclesCountCircuit} Rounds Left</Text>
                        </View> : null
                    }

                    {!isCircuit && exerciseSeconds == true ?
                        <View>
                            <Text style={styles.title}>{exerciseSets} of {videos[currentIndex].Sets}</Text>
                        </View>
                        : null
                    }


                </View>

                {totalTimer > 0 ?
                    <TouchableOpacity onPress={this.onPressPause} style={styles.timeContainer}>
                        <View style={styles.totalTimerIcon}>
                            {pause ? <Play height={15} width={15}/> : <Pause/>}
                        </View>
                        <View style={styles.totalTimerNumber}>
                            <Text style={styles.time}>{`${minTotal < 10 ? '0' : ''}${minTotal}:${
                                secTotal < 10 ? '0' : ''
                            }${secTotal}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    :
                    null
                }

                {/* *************** Card description container ************ */}
                <Animated.View
                    style={[
                        styles.mainContainer,
                        {
                            height: heightContainer,
                            transform: [{translateY}],
                            top: height - 200,
                        }
                    ]}
                    {...this.panResponder.panHandlers}>
                    {repCount != "" && <>
                        <Text style={{...styles.storyTime, marginBottom: 5}}>{`${repCount} Reps`}</Text>
                    </>
                    }
                    {/*<MaskedView*/}
                    {/*    maskElement={*/}
                    {/*        <LinearGradient style={{flex: 1}}*/}
                    {/*                        colors={(openDescription && descriptionScroll >= 0) ? ['black', 'transparent'] : ['black', 'black']}*/}
                    {/*                        start={{x: 0, y: 0.8}} end={{x: 0, y: 1}}/>*/}
                    {/*    }*/}
                    {/*>*/}
                        <MaskedView
                            maskElement={
                                <LinearGradient style={{flex: 1}}
                                                colors={(openDescription && descriptionScroll > 0) ? ['transparent', 'black'] : ['black', 'black']}
                                                start={{x: 0, y: 0}} end={{x: 0, y: 0.2}}/>
                            }
                        >
                            <ScrollView fadingEdgeLength={openDescription ? 100 : 0} ref={this.scrollDescription}
                                        onScroll={(e) => this.setState({descriptionScroll: e.nativeEvent.contentOffset.y})}
                                        scrollEnabled={openDescription}>
                                {showTimeLimit && <>
                                    <Text style={styles.storyTime}>
                                        {showTimeLimit ?
                                            `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                                            : ""
                                        }
                                    </Text>
                                </>
                                }

                                {videos[currentIndex].cardType === 'video' && <>
                                    <Text style={styles.videoTime}>
                                        {VideoTimer.currentTime ? `${minutesVideo < 10 ? '0' : ''}${minutesVideo}:${secondsVideo < 10 ? '0' : ''}${secondsVideo}` : '00:00'}
                                    </Text>

                                    {VideoTimer.currentTime ? (<Slider
                                        onSlidingStart={() => {
                                            if (!pause && !videoPaused) this.setState({videoPaused: true})
                                        }}
                                        // onValueChange={(e) => this.videoRef.current.seek(e, 50)}
                                        onSlidingComplete={(e) => {
                                            this.videoRef.current.seek(e, 50)
                                            if (!pause && videoPaused) this.setState({videoPaused: false})
                                        }}
                                        value={VideoTimer.currentTime}
                                        style={{width: '105%', height: 20, marginLeft: -13}}
                                        minimumValue={0}
                                        maximumValue={VideoTimer.seekableDuration}
                                        thumbTintColor="#FFFFFF"
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="rgba(255,255,255,0.4)"
                                    />) : (<Slider
                                        value={0}
                                        style={{width: '105%', height: 20, marginLeft: -13}}
                                        minimumValue={0}
                                        thumbTintColor="#FFFFFF"
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="rgba(255,255,255,0.4)"
                                    />)}

                                </>
                                }


                                {this.renderCardDescription()}
                            </ScrollView>
                        </MaskedView>
                    {/*</MaskedView>*/}
                </Animated.View>


                {/* *************** Next buttons container ************ */}
                <View style={{...styles.bottomRow, width: restVideo && !this.state.taskPaused ? '50%' : 'auto',}}>
                    <TouchableWithoutFeedback onPress={() => this.onClickOverview(true)}>
                        <View style={styles.button}><CheckList/></View>
                    </TouchableWithoutFeedback>
                    {this.renderNextButton()}
                    {this.renderTaskActionButton()}
                </View>

                {/* *************** CountDown Container ************ */}
                {countDown && !rest && activeIndex && (
                    <View style={styles.countDownContainer}>
                        <CountDownAnimation onEnd={() => this.setState({countDown: false})}/>
                    </View>
                )}

                {/* *************** Rest Container ************ */}
                {rest && activeIndex && (
                    <View style={styles.restContainer}>
                        <RestAnimation
                            onEnd={this.restEnd}
                            duration={this.state.restDuration}
                            onPress={this.restEnd}
                        />
                    </View>
                )}

                {/* *************** Video loading Container ************ */}
                {videos[currentIndex].flag === 'video' && videoLoading && !countDown &&
                <View style={[styles.videoLoading]}>
                    <ActivityIndicator color={'#fff'} size={'large'}/>
                </View>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    backgroundDescriptionOpen: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    },
    linearGradientContainerBottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 100,
        bottom: 0,
        zIndex: 19
    },
    linearGradientBottom: {
        width: '100%',
        height: 100,
    },
    linearGradientContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 300,
        top: 0,
    },
    linearGradient: {
        width: '100%',
        height: 300,
    },
    countDownContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
    },
    restContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 18,
    },
    videoLoading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 17
    },
    centerContainer: {
        position: 'absolute',
        width,
        height: height - 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pauseContainer: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(33, 41, 61, 0.4)',
        borderRadius: 50,
    },
    storyDescription: {
        fontSize: 14,
        lineHeight: 24,
        fontFamily: 'Poppins-Medium',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
    },
    storyTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        marginBottom: 10,
    },
    storyTime: {
        fontSize: 28,
        lineHeight: 38,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
    },
    videoTime: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
    },
    mainContainer: {
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        paddingHorizontal: 15,
        zIndex: 19.9,
    },
    time: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        lineHeight: 24,
        width: '100%',
        marginTop: 2,
        // marginLeft: 5
    },
    timeContainer: {
        top: 40,
        zIndex: 100,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        // padding: 10,
        borderRadius: 40,
        backgroundColor: 'rgba(63,67,79, 0.4)',
        position: 'absolute',
        right: 15,
        width: 112,
        height: 48,
    },
    totalTimerIcon: {
        marginRight: 14,
        marginLeft: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    totalTimerNumber: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: -0.5, height: 0.5},
        textShadowRadius: 1,
        fontSize: 18,
        lineHeight: 24,
    },
    prev: {
        position: 'absolute',
        width: 50,
        top: 20,
        left: 0,
        height,
        backgroundColor: 'transparent',
        zIndex: 15
    },
    next: {
        position: 'absolute',
        right: 0,
        width: 50,
        top: 20,
        height,
        backgroundColor: 'transparent',
        zIndex: 15
    },
    topRow: {
        top: 40,
        left: 15,
        right: 15,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        minHeight: 50,
    },
    button: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(33, 41, 61, 0.4)',
        marginRight: 15,
    },
    nextButton: {
        height: 48,
        width: 97,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 25,
        position: 'absolute',
        right: 0
    },
    endTaskButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        right: 0
    },
    endTaskButton: {
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    nextButtonText: {
        marginTop: -2,
        marginRight: 11,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        fontSize: 16,
        lineHeight: 28,
        color: '#000000'
    },

    bottomRow: {
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        flexDirection: 'row',
        zIndex: 100,
        height: 80,
        marginBottom: 10,
        marginHorizontal: 15,
    },

    line: {
        flex: 1,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeLine: {
        backgroundColor: '#fff',
        position: 'absolute'
    },
    linesContainer: {
        position: 'relative',
        top: Platform.OS === 'ios' ? 25 : 15,
        left: 0,
        right: 0,
        height: 20,
        flexDirection: 'row',
        marginHorizontal: 10,
        zIndex: 100
    },
    video: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
    },
    container: {
        flex: 1,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        width: null,
        height: null,
        borderRadius: 5,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    input: {
        borderWidth: 2,
        borderColor: 'white',
        height: 28,
        width: 250,
        borderRadius: Platform.OS === 'android' ? 0 : 10,
    },
    notesContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#6c82a4",
        justifyContent: "center",
        alignItems: "center"
    },
    notesText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff",
        width: "80%",
        textAlign: 'center'
    },
    skip: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'Poppins-Bold',
        color: 'black',
    },
    skipContainer: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        borderRadius: 50,
        position: 'absolute',
        width: responsiveWidth(50),
        alignSelf: 'center',
        bottom: responsiveHeight(32)
    },

});
