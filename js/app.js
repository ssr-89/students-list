"use strict"
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector('body');
  const wrapper = document.getElementById('wrapper');
  const header = document.getElementById('header');
  const main = document.getElementById('main');
  const footer = document.getElementById('footer');
  const lockPadding = document.querySelectorAll(".lock-padding");

  const timeout = 300;

  const headerHeight = header.getBoundingClientRect().height + 10;
  main.style.marginTop = headerHeight + "px";

  /*плавный скрол*/
  const anchors = document.querySelectorAll('.js-scroll-link')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  };

  const headerMenu = document.querySelector('.header-nav');
  const headerBurger = document.querySelector('.header-burger');
  const headerMenuLinks = document.querySelectorAll('.header-nav-menu-item-link ');

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - wrapper.offsetWidth + "px"; // разница между шириной всего viewport и шириной объекта, который находится внутри viewport. Т.е., получаем ширину скролла, который убирается при открытии popup. Это делается для того, чтобы при исчезновании/появлении скролла контент не двигался в стороны на ширину скролла.
    /*проверка наличие объектов lockPadding*/
    if (lockPadding.lenght > 0) {
      /*цикл для фиксированных объектов, чтобы не двигались при исчезновании/появлении скролла*/
      for (let index = 0; index < lockPadding.lenght; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");
  }
  function bodyUnLock() {
    setTimeout(function () {
      /*проверка наличие объектов lockPadding*/
      if (lockPadding.lenght > 0) {
        for (let index = 0; index < lockPadding.lenght; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);
  }
  function openHeaderMenu() {
    bodyLock();
    if (!headerBurger.classList.contains('open-menu') && !headerMenu.classList.contains('open-menu')) {
      headerBurger.classList.add('open-menu');
      headerMenu.classList.add('open-menu');
    }
  }
  function closeHeaderMenu() {
    bodyUnLock();
    if (headerBurger.classList.contains('open-menu') && headerMenu.classList.contains('open-menu')) {
      headerBurger.classList.remove('open-menu');
      headerMenu.classList.remove('open-menu');
    }
  }

  headerBurger.addEventListener("click", function () {
    if (!headerBurger.classList.contains('open-menu') && !headerMenu.classList.contains('open-menu')) {
      openHeaderMenu();
    } else if (headerBurger.classList.contains('open-menu') && headerMenu.classList.contains('open-menu')) {
      closeHeaderMenu();
    } else {
      closeHeaderMenu();
    }
  });
  headerMenuLinks.forEach(function (el) {
    el.addEventListener('click', () => {
      closeHeaderMenu();
    });
  });
});
