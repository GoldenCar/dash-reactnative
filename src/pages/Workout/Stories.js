import * as React from 'react';
import { StyleSheet, Animated, Dimensions, View, StatusBar } from 'react-native';
import Story from './Story';
import SwiperAnimated from '../../components/CubeNavigation';
import { Actions } from 'react-native-router-flux';
import WorkoutTaskAction from './WorkoutTaskAction';
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('screen');
const height = Dimensions.get('screen').height - StatusBar.currentHeight;
export default class Stories extends React.Component {
  stories = [];
  currentStory = 0;
  totalTimeInterval = null;

  state = { timer: 0, descriptionHide: false };

  constructor(props) {
    super(props);
    this.swiperContainer = React.createRef();
    this.stories = props.stories.map(() => React.createRef());
    this.storiesItem = props.stories.map(() => React.createRef());
  }

  componentDidMount() {
    this.storiesItem[0]?.current.countDown();
    this.totalTime();
    this.validateSettingOption();
  }

  validateSettingOption = async () => {
    try {
      const data = await AsyncStorage.getItem('@taskDescHide');
      this.setState({ descriptionHide: data ? true : false });
    } catch (error) {
      console.log(error.message);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onReturnToBack();
  }

  onReturnToBack = async () => {
    if (this.props.stories[this.currentStory].videos.length > 0) {
      this.storiesItem[this.currentStory]?.current.onClickOverview(false);
    }
  }

  totalTime = (data = null) => {
    if (data == null) {
      clearInterval(this.totalTimeInterval);
      this.setState({ timer: 0 })
    };
    this.totalTimeInterval = setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000);
  }

  nextStory = () => {

    if (this.currentStory === this.stories.length - 1) {
      clearInterval(this.totalTimeInterval);
      Actions.Completed({ challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true })
      return;
    }

    this.currentStory = this.currentStory + 1;
    // If next video is empty 
    if (this.props.stories[this.currentStory].videos.length > 0) {
      this.storiesItem[this.currentStory]?.current.countDown();
      this.swipe.scrollTo(this.currentStory, true);
      this.storiesItem[this.currentStory - 1]?.current.stop();
    } else {
      clearInterval(this.totalTimeInterval);
      Actions.Completed({ challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true })
      return;
    }
  };

  prevStory = () => {

    if (this.currentStory === 0) return;
    this.currentStory = this.currentStory - 1;
    this.storiesItem[this.currentStory]?.current.countDown();
    this.swipe.scrollTo(this.currentStory, true);
    this.storiesItem[this.currentStory + 1]?.current.stop();
  };

  callBackAfterSwipe = (position, index) => {
    const prevStoryIndex = this.currentStory;
    const nextStory = index;
    if (nextStory !== prevStoryIndex) {
      this.currentStory = nextStory;
      this.storiesItem[nextStory]?.current.countDown();
      this.storiesItem[prevStoryIndex]?.current.stop();
    }
  }

  onPlayPause = (data) => {
    if (this.totalTimeInterval && data == true) {
      clearInterval(this.totalTimeInterval);
      this.totalTimeInterval = null;
    } else if (this.totalTimeInterval == null && data == false) {
      this.totalTime(true);
    }
  }

  onTaskOverView = () => {
    Actions.WorkoutOverView({ data: this.props, currentIndex: this.currentStory });
  }

  onTaskAction = async (data) => {
    const { descriptionHide, endTask, modalType } = data;
    if (modalType == "setting") {
      await this.setState({ descriptionHide: descriptionHide });
      // this.onDismissModal();
    } else {
      if (endTask) {
        Actions.Completed({ challenge: this.props.challenge, user: this.props.user, isTaskCompleted: true });
        return null;
      } else {
        // this.onDismissModal();
      }
    }
  }

  onDismissModal = async () => {
    if (this.props.stories[this.currentStory].videos.length > 0) {
      this.storiesItem[this.currentStory]?.current.onClickWorkoutTaskAction(null, false);
    }
  }

  render() {

    const { stories } = this.props;
    return (
      <View style={styles.container}>
        <SwiperAnimated
          ref={(data) => { this.swipe = data }}
          loop={false}
          callBackAfterSwipe={this.callBackAfterSwipe}
        >
          {stories
            .map((story, i) => (
              <Animated.View
                ref={this.stories[i]}
                style={{ ...StyleSheet.absoluteFillObject, width, height }}
                key={story.id}>
                <Story
                  ref={this.storiesItem[i]}
                  story={story}
                  isCircuit={story.flag === 'circuit' ? true : false}
                  dayTasks={this.props.dayTasks}
                  nextStory={this.nextStory}
                  onPlayPause={this.onPlayPause}
                  prevStory={this.prevStory}
                  totalTimer={this.state.timer}
                  activeIndex={this.currentStory === i}
                  activeIndex2={this.currentStory}
                  index={i}
                  onTaskOverView={this.onTaskOverView}
                  workoutTaskAction={(data) => this.workoutTaskAction.show(data)}
                  descriptionHide={this.state.descriptionHide}
                />
              </Animated.View>
            ))
          }
        </SwiperAnimated>
        <WorkoutTaskAction
          ref={(modal) => { this.workoutTaskAction = modal }}
          onClose={this.onTaskAction}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
