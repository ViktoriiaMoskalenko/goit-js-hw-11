import { value } from './index';
import { per_page, gallery, createMarkup, galleryImg, guard } from './index';
import { getImage } from './getImg';

let page = 1;

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
      getImage(value, page).then(data => {
        gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        galleryImg.refresh();
        if (Number(page * per_page) >= data.totalHits) {
          observer.unobserve(guard);
        }
      });
    }
  });
}

export { observer, page, onLoad };
