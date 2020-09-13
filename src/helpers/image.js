import { mediaHost } from 'dash/src/config';

function getImageURL(image) {
    return `${mediaHost}${image}`;
}

export { getImageURL } 
