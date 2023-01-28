window.addEventListener('scroll', function (e) {
  var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  var background_blur = document.getElementById('menu-blur');
  background_blur.style.opacity = (scroll / 300);
});
