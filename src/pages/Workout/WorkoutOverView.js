import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import NavBar from '../../components/NavBar';
const thumbnail_rest_inside_circuit = require('../../res/workout/rest_inside_circuit.png');
const thumbnail_rest_outside_circuit = require('../../res/workout/rest_outside_circuit.png');
const thumbnail_note_card = require('../../res/workout/note_thumbnail.png');
const thumbnail_old = require('../../res/list_image.png');
const checkEmpty = require('../../res/checkEmpty.png');
const checkFill = require('../../res/checkFill.png');
import { mediaHost } from '../../config';

export default class WorkoutOverView extends React.Component {

  state = { showPyramidSet: false };

  // render task items ---------
  renderItem = (item, isCircuit, index, taskComplete) => {
    const { exerciseCardArray } = this.props.data; 
    let thumbnailUrl = "";
    if (item.cardType === "note") {
      thumbnailUrl = thumbnail_note_card;
    } else if (item.cardType === 'rest' && isCircuit) {
      thumbnailUrl = thumbnail_rest_inside_circuit;
    } else if (item.cardType === 'rest') {
      thumbnailUrl = thumbnail_rest_outside_circuit;
    } else if (item.cardType === 'video' && item.thumbnailFileName && item.thumbnailFileName != "") {
      thumbnailUrl = { uri: mediaHost + item.thumbnailFileName }
    } else if (item.cardType === "exercise") {
      let cardData = exerciseCardArray.filter(data => data.id === item.id);  
      if (cardData.length) {
        thumbnailUrl = cardData[0].BaseThumbnail_fileName ? { uri: mediaHost + cardData[0].BaseThumbnail_fileName } : thumbnail_old;
      }
    } else {
      thumbnailUrl = thumbnail_old;
    }

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View>
            <ImageBackground
              style={styles.thumbnail}
              source={thumbnailUrl}
              imageStyle={{ borderRadius: 22 }}
              PlaceholderContent={<ActivityIndicator />} 
            >
              {isCircuit ?
                <View style={styles.itemNumber}>
                  <Text style={styles.itemNumberText}>{index + 1}</Text>
                </View>
                : null
              }
            </ImageBackground>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.repTextCount}>
              {item.RepsCount ? item.RepsCount + " " + item.Reps : ""}
            </Text>
          </View>
          {!isCircuit &&
            <View style={styles.statusContainer}>
              <Image style={{ height: 32, width: 32 }} source={taskComplete ? checkFill : checkEmpty} />
            </View>
          }
        </View>
        <View style={styles.bottomBorder} />
      </View >
    )
  }

  // render circuit type task ------------
  renderCircuit = (data, taskComplete) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: '20%' }}>
          <Image
            style={{ height: '96%', width: '80%' }}
            source={require('../../res/roundArrow.png')}
            resizeMode={'contain'}
          />
        </View>
        <View style={{ width: '80%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.circuitDesc}>{'Circuit'}</Text>
            <TouchableOpacity onPress={() => this.setState({ showPyramidSet: true })}>
              <Text style={styles.questionMarkContainer}>{'?'}</Text>
            </TouchableOpacity>
            <View style={styles.statusContainer}>
              <Image style={{ height: 32, width: 32 }} source={taskComplete ? checkFill : checkEmpty} />
            </View>
          </View>
          {data.Cycles && data.Cycles > 0 ?
            <Text style={styles.roundCountText}>{item.Cycles + " "}Rounds</Text>
            : null
          }
          {data.videos.map((item, index) => this.renderItem(item, true, index, taskComplete))}
        </View>
      </View>
    )
  }

  // render current task layout -------
  renderData = ({ item, index }) => {
    const { currentIndex } = this.props;
    const taskComplete = currentIndex > index ? true : false;
    return (
      <View style={{ flex: 1 }} key={index}>
        {item.flag == "circuit" ? this.renderCircuit(item, taskComplete) : this.renderItem(item.videos[0], false, false, taskComplete)}
      </View>
    );
  }

  renderPyramidSet() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showPyramidSet}
        onRequestClose={() => this.setState({ showPyramidSet: false })}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContentContainer}>
            <View
              style={styles.modalContent}>
              <Text style={styles.modalTopHeadingText}>{'What’s a Pyramid Set?'}</Text>
              <TouchableOpacity
                style={styles.modalCloseButtonContainer}
                onPress={() => this.setState({ showPyramidSet: false })}>
                <Image
                  source={require('../../res/close.png')}
                  style={styles.modalCloseButton}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalMiddleContainer} />
            <View
              style={styles.modalMiddleContainerContent}>
              <Text style={styles.modalMiddleText}>{`A treadmill can give you a great walking workout`}</Text>
              <Text style={styles.modalMiddleText}>{`in any weather. If you use the right walking form`}</Text>
              <Text style={styles.modalMiddleText}>{`and vary your workouts with intervals, hills, and  `}</Text>
              <Text style={styles.modalMiddleText}>{`speed changes, you can keep yourself interested  `}</Text>
              <Text style={styles.modalMiddleText}>{`and challenge your body in new ways.`}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.loaderContainer}>
        <NavBar title={'Task Overview'} styleContainer={styles.headerContainer} />
        <View style={styles.container}>
          {this.props.data && this.props.data.stories.length ?
            <FlatList
              data={this.props.data.stories}
              renderItem={this.renderData}
              keyExtractor={(index) => index.toString()}
              extraData={this.props}
            />
            :
            <ActivityIndicator size="large" color="#1AA0FF" />
          }
          {this.renderPyramidSet()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerContainer: {
    backgroundColor: '#FFFFFF'
  },
  thumbnail: {
    width: 72,
    height: 72,
    marginLeft: 16,
    marginTop: 11,
  },
  itemNumber: {
    backgroundColor: 'white',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  itemNumberText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'column',
    marginTop: 11,
    alignSelf: 'center',
    flexShrink: 1,
  },
  titleText: {
    color: '#292E3A',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    lineHeight: 24,
    paddingRight: '2%'
  },
  repTextCount: {
    color: '#1AA0FF',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    lineHeight: 24,
  },
  bottomBorder: {
    borderBottomColor: '#F0F5FA',
    borderBottomWidth: 1,
    marginTop: 29,
  },
  statusContainer: {
    marginLeft: 16,
    marginTop: 11,
    height: 20,
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 16,
    alignSelf: 'center',
  },
  circuitDesc: {
    fontFamily: 'Poppins-Bold',
    lineHeight: 28,
    fontSize: 22,
    fontStyle: 'normal',
    marginLeft: 22,
    marginTop: 15,
  },
  questionMarkContainer: {
    fontFamily: 'Poppins-Bold',
    color: '#1AA0FF',
    textAlign: 'center',
    paddingTop: 3,
    width: 28,
    height: 28,
    borderRadius: 40,
    marginLeft: 10,
    fontSize: 16,
    // fontWeight: 'bold',
    marginTop: 14,
    backgroundColor: '#F0F5FA',
  },
  roundCountText: {
    fontFamily: 'Poppins',
    fontSize: 17,
    fontStyle: 'normal',
    marginLeft: 22,
    color: '#6F80A7',
    fontWeight: 'bold'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'column-reverse',
  },
  modalContentContainer: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 33,
  },
  modalContent: {
    marginTop: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTopHeadingText: {
    fontFamily: 'Poppins-Medium',
    color: '#25292E',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  modalCloseButtonContainer: {
    position: 'absolute',
    left: 0,
    height: 48,
    width: 48,
    justifyContent: 'center',
  },
  modalCloseButton: {
    height: 13,
    width: 13,
    marginLeft: 16
  },
  modalMiddleContainer: {
    borderBottomColor: '#F0F5FA',
    borderBottomWidth: 1,
    marginTop: 31,
  },
  modalMiddleContainerContent: {
    marginTop: 26,
    marginLeft: 16,
    marginRight: 16,
    height: 160,
  },
  modalMiddleText: {
    fontSize: 14,
    letterSpacing: 1.2,
    color: '#6F80A7',
    fontFamily: 'Poppins',
    lineHeight: 22,
  }
});