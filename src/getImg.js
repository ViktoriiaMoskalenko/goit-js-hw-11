import Notiflix from 'notiflix';
import { per_page } from './index';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '16686655-4ef7ec615da889351893ebc22';

async function getImage(value, page = 1) {
  const resp = await fetch(
    `${BASE_URL}?key=${KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`
  );
  if (!resp.ok) {
    throw new Error('RESP NOT OK!');
  }
  const data = await resp.json();
  if (data.hits.length === 0) {
    gallery.innerHTML = '';
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return data;
}

export { getImage };
