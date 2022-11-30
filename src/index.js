import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImage } from './getImg';
import { observer, onLoad } from './onLoad';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const btn = document.querySelector('.search-form > button');
const guard = document.querySelector('.js-guard');

form.addEventListener('submit', onSearchImg);

let per_page = 100;
let value = '';

export { per_page, value, gallery, createMarkup, galleryImg, guard };

btn.onclick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });
};

function onSearchImg(e) {
  e.preventDefault();
  value = form.searchQuery.value;
  getImage(value)
    .then(data => {
      if (data.hits.length === 0) {
        gallery.innerHTML = '';
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      gallery.innerHTML = '';
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
      gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
      galleryImg.refresh();
      observer.observe(guard);
    })
    .catch(error => console.log(error));
}

function createMarkup(obj) {
  return obj
    .map(
      el => `<div class="photo-card">
  <a href = "${el.largeImageURL}" class = "link">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" class = "gallery-img"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b></br>
      <span>${el.likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b></br>
      <span>${el.views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b></br>
      <span>${el.comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b></br>
      <span>${el.downloads}</span>
    </p>
  </div>
  </a>
</div>`
    )
    .join('');
}

let galleryImg = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
galleryImg.refresh();
