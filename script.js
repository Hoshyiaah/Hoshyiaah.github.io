const scrolldivs = document.querySelectorAll('.scrolled');

function checkVisibility() {
    scrolldivs.forEach(div => {
        const rect = div.getBoundingClientRect();

        if (rect.top < window.innerHeight) {
            div.classList.add('visible');
          } else {
            div.classList.remove('visible');
          }
    })
};

window.addEventListener('scroll', checkVisibility);

checkVisibility();

const imagesMenu = document.querySelectorAll('.imgMenu');

imagesMenu.forEach(function(img) {
  img.addEventListener('click', function() {

    const imgMenu = document.querySelector('.menu');
    const imgClose = document.querySelector('.close');
    const nav = document.querySelector('nav');

    if (imgMenu.style.display === 'block') {
      imgMenu.style.display = 'none';
      imgClose.style.display = 'block';
      nav.style.display = 'flex';
      nav.classList.add('animate');
    } else {
      imgClose.style.display = 'none';
      imgMenu.style.display = 'block';
      nav.style.display = 'none';
      nav.classList.remove('animate');
    }

  });
});

document.querySelectorAll('.example').forEach(div => {
  div.addEventListener('click', function () {
      
      const url = this.dataset.url;
      if (url) {
          window.location.href = url;
      }
  });
});