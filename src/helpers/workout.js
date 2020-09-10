import thumbnail_note_card from '../res/workout/note_thumbnail.png';
import bgimage_rest_inside_circuit from '../res/workoutimage.png';

import NoteThumbnail from '../res/workout-new/note.png';
import RestThumbnail from '../res/workout-new/rest.png';

import { mediaHost } from 'dash/src/config';
import * as planActions from '../actions/plans';

function getCircuitThumbnail(exercise) {
    let image = '';
    if (exercise.flag === "note") {
        image = NoteThumbnail;
    } else if (exercise.flag === 'rest') {
        image = RestThumbnail;
    } else {
        if (exercise.thumbnailFileName && exercise.thumbnailFileName != "") {
            image = { uri: `${mediaHost}${exercise.thumbnailFileName}` };
        } else if (exercise.exerciseData) {
            image = { uri: `${mediaHost}${exercise.exerciseData.BaseThumbnail_fileName}` };
        }
    }
    // else if (exercise.flag === 'video' && exercise.thumbnailFileName && exercise.thumbnailFileName != "") {
    //   image = { uri: `${mediaHost}${exercise.thumbnailFileName}` };
    // }
    // else if ((exercise.flag === "exercise" || exercise.flag === 'video') && exercise.exerciseData) {
    //     image = { uri: `${mediaHost}${exercise.exerciseData.BaseThumbnail_fileName}` };
    // }

    return image;
}

// TODO: make circuit exercise request once
//       set isCircuit
//       set loopNum
//       set exerciseNum
async function parseCircuitData(circuit, index) {
    const data = [];

    let exercises = circuit.exeerciseCards;
    const loops = parseInt(circuit.Cycles);

    // push circuit preview card if circuit isn't first task
    if (index > 0) {
        data.push({ flag: 'circuitPreview' });
    }

    // get data for all circuit exercises
    for (let p = 0; p < exercises.length; p++) {
        const exerciseNum = p + 1;

        const taskData = await getTaskData(exercises[p]);

        taskData.isCircuit = true;
        taskData.exerciseNum = exerciseNum;

        exercises[p] = taskData;
    }

    // add loop num and exercises based on how many circuit loops
    for (let i = 0; i < loops; i++) {
        for (let p = 0; p < exercises.length; p++) {
            const loopNum = i + 1;
            const fullExercise = {
                ...exercises[p],
                loopNum,
                totalLoops: loops,
                totalExercises: exercises.length
            };

            data.push(fullExercise);
        }
    }

    // add circuit complete card
    data.push({ flag: 'circuitComplete' });

    return data;
}

async function getWorkoutData(day) {
    let cards = [];

    for (let i = 0; i < day.versionDayTaskCard.length; i++) {
        const exercise = day.versionDayTaskCard[i];

        if (exercise.flag === 'circuit') {
            const data = await parseCircuitData(exercise, i);
            cards = cards.concat(data);
        } else if (exercise.flag !== 'circuit') {
            const taskData = await getTaskData(exercise);
            cards.push(taskData);
        }
    }

    return cards;
}

async function getTaskData(exercise) {
    let data = {
        title: exercise.title,
        description: exercise.description,
        autoPlay: exercise.AutoPlay === 'checked',
        autoPlayShowFlag: exercise.AutoPlayShowFlag,
        flag: exercise.flag,
        timer: false,
        cardUUID: exercise.cardUUID,
        cardExerciseID: exercise.cardExerciseID
    };

    if (exercise.RestTime) {
        data.restTime = parseInt(exercise.RestTime);
    }

    if (exercise.flag === 'rest') {
        data.thumbnailImage = bgimage_rest_inside_circuit;
    }

    if (exercise.flag === 'video') {
        data.fileName = exercise.fileName;
    }

    if (exercise.flag === 'note') {
        data.thumbnailImage = thumbnail_note_card;
    }

    if (exercise.flag === 'exercise') {
        data.flag = 'video';
        data.cardType = 'exercise';
        data.reps = exercise.Reps;
        data.sets = exercise.Sets;
        data.repsCount = exercise.RepsCount;

        const cardID = exercise.cardUUID;
        const exerciseID = exercise.cardExerciseID;

        // TODO: why do i need to do this? this info should be on the exercise data already
        // TODO: this is erasing values 
        const response = await planActions.getExerciseData(cardID, exerciseID);
        if (response) {
            const { BaseVideo_fileName, exerciseName } = response;
            data.fileName = BaseVideo_fileName;
            data.title = exerciseName;
        }
    }

    return data;
}

export { getCircuitThumbnail, getWorkoutData }
