import thumbnail_rest_inside_circuit from '../res/workout/rest_inside_circuit.png';
import thumbnail_note_card from '../res/workout/note_thumbnail.png';

const bgimage_rest_inside_circuit = require('../res/workoutimage.png');
const thumbnail_rest_outside_circuit = require('../res/workout/rest_outside_circuit.png');
const thumbnail_old = require('../res/list_image.png');

import { mediaHost } from 'dash/src/config';
import * as planActions from '../actions/plans';

function getCircuitThumbnailUrl(exercise) {
    let thumbnailUrl = '';
    if (exercise.flag === "note") {
        thumbnailUrl = thumbnail_note_card;
    } else if (exercise.flag === 'rest') {
        thumbnailUrl = thumbnail_rest_inside_circuit;
    } else if (exercise.flag === 'video' && exercise.thumbnailFileName && exercise.thumbnailFileName != "") {
        thumbnailUrl = { uri: `${mediaHost}${exercise.thumbnailFileName}` };
    } else if (exercise.flag === "exercise") {
        if (exercise.exercisesData) {
            const data = exercise.exercisesData.exercisesData[0];
            thumbnailUrl = { uri: `${mediaHost}${data.BaseThumbnail_fileName}` };
        }
    }

    return thumbnailUrl;
}

async function getExerciseInformation(cardId) {
    const arrayResponse = await planActions.getExerciseData(cardId)
    return arrayResponse;
}

async function getWorkoutData(day, user) {
    let stories = [];

    // return;

    //let dayTasks = this.arrayTasks;
    //let dataTask1 = dayTasks[0];
    //this.setState({ arrayVersionTask: dataTask1 });
    //let stories = [];
    let userDisplayName = user && user.displayname ? user.displayname : '';

    // TODO: put in helpers/workout

    // IMPORTANT

    //  Getting videos and set them in the story 
    for (let index = 0; index < day.versionDayTaskCard.length; index++) {

        const element = day.versionDayTaskCard[index];
        let arrayCircuitVideos = [];
        let arrayVideoTimerCircuit = []; // gett the original video time   
        let arrayNormalVideos = [];
        let arrayVideoTimerNormal = [];

        if (element.flag === "circuit") {
            for (let index = 0; index < element.exeerciseCards.length; index++) {
                const temp = element.exeerciseCards[index];

                if (temp.flag === "video" && temp.fileName) {
                    let dict = {
                        'title': temp.title,
                        'description': temp.description,
                        'fileName': temp.fileName ? temp.fileName : '',
                        'AutoPlay': temp.AutoPlay == 'checked' ? true : false,
                        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : true,
                        'flag': temp.flag,
                        'RestTime': temp.RestTime,
                        'timer': false,
                        "cardType": "video"
                    }
                    arrayCircuitVideos.push(dict);
                    // const timer = temp.RestTime != "" ? temp.RestTime : 15;
                    // arrayVideoTimerCircuit.push(timer);

                }
                else if (temp.flag === "rest") {
                    let dict = {
                        'title': temp.title,
                        'description': temp.description,
                        'flag': temp.flag,
                        'thumbnailImage': bgimage_rest_inside_circuit,
                        'RestTime': temp.RestTime,
                        'timer': false,
                        'cardType': 'rest',
                        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : '',
                        'AutoPlay': temp.AutoPlay == 'checked' ? true : false,
                    }
                    arrayCircuitVideos.push(dict);
                }
                else if (temp.flag === "note") {
                    let dict = {
                        'title': temp.title,
                        'description': temp.description,
                        'flag': temp.flag,
                        'thumbnailImage': thumbnail_note_card,
                        'RestTime': temp.RestTime,
                        'timer': false,
                        'cardType': 'note',
                        'AutoPlayShowFlag': temp.AutoPlayShowFlag ? temp.AutoPlayShowFlag : '',
                        'AutoPlay': false,
                    }
                    arrayCircuitVideos.push(dict);
                }
                else if (temp.flag === "exercise") {
                    await getExerciseInformation(temp.cardUUID).then((exResponse) => {
                        if (exResponse.exercisesData) {
                            const cardData = exResponse.exercisesData.filter(data => data.id === temp.cardExerciseID);
                            if (cardData.length) {
                                const {
                                    BaseVideo_fileName,
                                    exerciseDescription,
                                    exerciseName,
                                } = cardData[0];

                                let arrData = {
                                    'title': exerciseName ? exerciseName : '',
                                    'description': exerciseDescription ? exerciseDescription : '',
                                    'fileName': BaseVideo_fileName ? BaseVideo_fileName : '',
                                    'AutoPlayShowFlag': false,
                                    'flag': 'video',
                                    'RestTime': temp.RestTime,
                                    'cardType': 'exercise',
                                    'Reps': temp.Reps,
                                    "Sets": temp.Sets,
                                    'RepsCount': temp.RepsCount,
                                    'AutoPlay': temp.AutoPlay == 'checked' ? true : false,
                                }
                                arrayCircuitVideos.push(arrData);
                                //this.exerciseCardArray.push(cardData[0]);
                            }
                        }
                    });
                }
            }
            const pushData = {
                id: '2',
                source: require('dash/src/res/friends/friend1.png'),
                user: userDisplayName,
                avatar: require('dash/src/res/friends/friend1.png'),
                timer: arrayVideoTimerCircuit,
                videos: arrayCircuitVideos,
                flag: 'circuit'
            };
            stories.push(pushData);

        } else {

            if (element.flag === "exercise") {
                await getExerciseInformation(element.cardUUID).then((exResponse1) => {
                    if (exResponse1.exercisesData) {
                        const cardData = exResponse1.exercisesData.filter(data => data.id === element.cardExerciseID);
                        if (cardData.length) {
                            const {
                                BaseVideo_fileName,
                                exerciseDescription,
                                exerciseName,
                            } = cardData[0];

                            let arrData = {
                                'title': exerciseName ? exerciseName : '',
                                'description': exerciseDescription ? exerciseDescription : '',
                                'fileName': BaseVideo_fileName ? BaseVideo_fileName : '',
                                'AutoPlayShowFlag': false,
                                'flag': 'video',
                                'RestTime': element.RestTime,
                                'cardType': 'exercise',
                                'Reps': element.Reps,
                                'Sets': element.Sets,
                                'RepsCount': element.RepsCount,
                                'AutoPlay': element.AutoPlay == 'checked' ? true : false,
                            }
                            arrayNormalVideos.push(arrData);
                            //this.exerciseCardArray.push(cardData[0]);
                        }
                    }
                });
            }
            else if (element.flag === "video" && element.fileName) {
                let dict = {
                    'title': element.title,
                    'description': element.description,
                    'fileName': element.fileName ? element.fileName : '',
                    'AutoPlay': element.AutoPlay == 'checked' ? true : false,
                    'AutoPlayShowFlag': element.AutoPlayShowFlag ? element.AutoPlayShowFlag : '',
                    'RestTime': element.RestTime,
                    'timer': false,
                    'flag': element.flag,
                    'cardType': 'video'
                }

                arrayNormalVideos.push(dict);
            } else if (element.flag === 'note') {
                let dict = {
                    'title': element.title,
                    'description': element.description,
                    'flag': element.flag,
                    'thumbnailImage': thumbnail_note_card,
                    'RestTime': element.RestTime,
                    'timer': false,
                    'cardType': 'note',
                    'AutoPlayShowFlag': element.AutoPlayShowFlag ? element.AutoPlayShowFlag : '',
                    'AutoPlay': false,

                }
                arrayNormalVideos.push(dict);
            }
            else if (element.flag === "rest") {
                let dict = {
                    'title': element.title,
                    'description': element.description,
                    'flag': element.flag,
                    'thumbnailImage': thumbnail_rest_outside_circuit,
                    'RestTime': element.RestTime,
                    'title': element.title,
                    'timer': true,
                    "cardType": "rest",
                    'AutoPlayShowFlag': element.AutoPlayShowFlag ? element.AutoPlayShowFlag : '',
                    'AutoPlay': element.AutoPlay == 'checked' ? true : false,
                }
                arrayNormalVideos.push(dict);

                const timer = element.RestTime != "" ? element.RestTime : 15;
                arrayVideoTimerNormal.push(timer);

            }

            if (arrayNormalVideos.length) {
                const pushData = {
                    id: '4',
                    source: require('dash/src/res/friends/friend1.png'),
                    user: userDisplayName,
                    avatar: require('dash/src/res/friends/friend1.png'),
                    timer: arrayVideoTimerNormal,
                    videos: arrayNormalVideos,
                    flag: 'solo'
                };
                stories.push(pushData);
            }
        }

        return stories;
    }

    // clearTimeout(this.timeoutStories);
    // this.timeoutStories = setTimeout(() => {
    //   this.setState({
    //     storiesArray: stories,
    //     loading: false
    //   });
    // }, 2000);
}

export { getCircuitThumbnailUrl, getWorkoutData }
