import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImage } from './getImg';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const guard = document.querySelector('.js-guard');
const loadBtn = document.querySelector('.load-more');

form.addEventListener('submit', onSearchImg);

let page = 1;
let per_page = 40;

export { page, per_page };

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      getImage(form.searchQuery.value, page).then(data => {
        gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        galleryImg.refresh();
        if (Number(page * per_page) >= data.totalHits) {
          observer.unobserve(guard);
        }
      });
    }
  });
}

function onSearchImg(e) {
  e.preventDefault();
  getImage(form.searchQuery.value)
    .then(data => {
      page = 1;
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
