import { per_page, page } from './index';
import { page } from './onLoad';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '16686655-4ef7ec615da889351893ebc22';

async function getImage(value, page = 1) {
  const resp = await fetch(
    `${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  if (!resp.ok) {
    throw new Error('RESP NOT OK!');
  }
  return await resp.json();
}

export { getImage, page };
