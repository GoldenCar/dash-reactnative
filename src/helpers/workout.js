import thumbnail_rest_inside_circuit from '../res/workout/rest_inside_circuit.png';
import thumbnail_note_card from '../res/workout/note_thumbnail.png';

import { mediaHost } from 'dash/src/config';

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

export { getCircuitThumbnailUrl }
