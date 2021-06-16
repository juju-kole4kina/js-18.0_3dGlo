window.addEventListener('DOMContentLoaded', () => {
   'use strict';

   // Timer

   const countTimer = (dedline) => {
      const timerHours = document.querySelector('#timer-hours'),
         timerMinutes = document.querySelector('#timer-minutes'),
         timerSecunds = document.querySelector('#timer-seconds');
      let idInterval = 0;

      const getTimeRemaining = () => {
         const dateStop = new Date(dedline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000;
         let seconds = 0,
            minutes = 0,
            hours = 0;
         if (timeRemaining > 0) {
            seconds = Math.floor(timeRemaining % 60);
            minutes = Math.floor((timeRemaining / 60) % 60);
            hours = Math.floor(timeRemaining / 60 / 60);
         }
         return { timeRemaining, hours, minutes, seconds };
      };

      const addZero = elem => {
         if (String(elem).length === 1) { return '0' + elem; } else { return String(elem); }
      };

      const updateClock = () => {
         let timer = getTimeRemaining();
         timerHours.textContent = addZero(timer.hours);
         timerMinutes.textContent = addZero(timer.minutes);
         timerSecunds.textContent = addZero(timer.seconds);

         if (timer.timeRemaining < 0) {
            clearInterval(idInterval);
         }
      };

      idInterval = setInterval(updateClock, 1000);
   };

   //Menu
   const toggleMenu = () => {
      const btnMenu = document.querySelector('.menu'),
         menu = document.querySelector('menu');

      const handlerMenu = (event) => {
         const target = event.target;
         if (target.closest('.menu')) {
            menu.classList.toggle('active-menu');
         } else if (target !== menu && target.closest('[href^="#"]')) {
            menu.classList.toggle('active-menu');
         }
      };

      btnMenu.addEventListener('click', handlerMenu);
      menu.addEventListener('click', handlerMenu);
   };

   //Popup

   const togglePopup = () => {
      const popup = document.querySelector('.popup'),
         popupBtn = document.querySelectorAll('.popup-btn'),
         popupContent = document.querySelector('.popup-content'),
         popupData = { count: -455, speed: 15, startPos: -455, endPos: 0 };

      const showPopup = () => {
         popupData.startPos > popupData.endPos ?
            popupData.count -= popupData.speed :
            popupData.count += popupData.speed;
         popupContent.style.transform = `translateY(${popupData.count}px)`;

         if (popupData.startPos > popupData.endPos ?
            popupData.count > popupData.endPos :
            popupData.count < popupData.endPos) {
            requestAnimationFrame(showPopup);
         }
      };

      popupBtn.forEach((elem) => {
         elem.addEventListener('click', () => {
            popup.style.display = 'block';
            if (screen.width > 786) {
               popupData.count = popupData.startPos;
               requestAnimationFrame(showPopup);
            }
         });
      });

      popup.addEventListener('click', (event) => {
         let target = event.target;

         if (target.classList.contains('popup-close')) {
            popup.style.display = 'none';
         } else {
            target = target.closest('.popup-content');
            if (!target) {
               popup.style.display = 'none';
            }
         }

      });
   };

   //tabs

   const tabs = () => {
      const tabHeader = document.querySelector('.service-header'),
         tab = tabHeader.querySelectorAll('.service-header-tab'),
         tabContent = document.querySelectorAll('.service-tab');

      const toggleTabContent = (index) => {
         for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
               tab[i].classList.add('active');
               tabContent[i].classList.remove('d-none');
            } else {
               tab[i].classList.remove('active');
               tabContent[i].classList.add('d-none');
            }
         }
      };

      tabHeader.addEventListener('click', (event) => {
         let target = event.target;
         target = target.closest('.service-header-tab');

         if (target) {
            tab.forEach((item, i) => {
               if (item === target) {
                  toggleTabContent(i);
               }
            });

         }

      });
   };

   //slider

   const slider = () => {
      const slide = document.querySelectorAll('.portfolio-item'),
         btn = document.querySelectorAll('.portfolio-btn'),
         dot = document.querySelectorAll('.dot'),
         slider = document.querySelector('.portfolio-content');

      let currentSlide = 0,
         interval;

      const prevSlide = (elem, index, strClass) => {
         elem[index].classList.remove(strClass);
      };

      const nextSlide = (elem, index, strClass) => {
         elem[index].classList.add(strClass);
      };

      const autoPlaySlide = () => {
         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');
         currentSlide++;
         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }
         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');

      };

      const startSlide = (time = 3000) => {
         interval = setInterval(autoPlaySlide, time);
      };

      const stopSlide = () => {
         clearInterval(interval);
      };

      slider.addEventListener('click', event => {
         event.preventDefault();

         let target = event.target;

         if (!target.matches('.portfolio-btn', '.dot')) {
            return;
         }

         prevSlide(slide, currentSlide, 'portfolio-item-active');
         prevSlide(dot, currentSlide, 'dot-active');

         if (target.matches('#arrow-right')) {
            currentSlide++;
         } else if (target.matches('#arrow-left')) {
            currentSlide--;
         } else if (target.matches('.dot')) {
            dot.forEach((elem, index) => {
               if (elem === target) {
                  currentSlide = index;
               }
            });
         }
         if (currentSlide >= slide.length) {
            currentSlide = 0;
         }
         if (currentSlide < 0) {
            currentSlide = slide.length - 1;
         }
         nextSlide(slide, currentSlide, 'portfolio-item-active');
         nextSlide(dot, currentSlide, 'dot-active');

      });

      slider.addEventListener('mouseover', (event) => {
         if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            stopSlide();
         }
      });

      slider.addEventListener('mouseout', (event) => {
         if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
            startSlide();
         }
      });

      startSlide(1500);
   };

   //add point

   const addDot = () => {
      const portfolioItem = document.querySelectorAll('.portfolio-item'),
         portfolioDots = document.querySelector('.portfolio-dots');

      portfolioItem.forEach(() => {
         const dot = document.createElement('li');
         dot.classList.add('dot');
         portfolioDots.appendChild(dot);
      });

      portfolioDots.children[0].classList.add('dot-active');
   };

   // Change Image

   const setCommandImg = () => {
      const command = document.querySelector('#command .row');

      const changingPhotos = (event) => {
         const target = event.target;

         if (target.classList.contains('command__photo')) {
            const lastSrc = target.src;

            target.src = target.dataset.img;
            target.dataset.img = lastSrc;
         }
      };

      command.addEventListener('mouseover', changingPhotos);
      command.addEventListener('mouseout', changingPhotos);
   };

   // Valid Input

   const checkInput = () => {
      const calcBlock = document.querySelector('.calc-block'),
         inputName = document.querySelector('#form2-name'),
         inputEmail = document.querySelector('#form2-email'),
         inputPhone = document.querySelector('#form2-phone'),
         inputMessage = document.querySelector('#form2-message');

      calcBlock.addEventListener('input', (event) => {
         event.target.value = event.target.value.replace(/[^\d\.]/g, '');
      });

      inputName.forEach((elem) => {
         elem.addEventListener('blur', (event) => {
            event.target.value = event.target.value.replace(/[^а-я ]/gi, '');
            event.target.value = event.target.value.replace(/\S/g, (b) => b.toLowerCase());
            event.target.value = event.target.value.replace(/(^|\s)\S/g, (a) => a.toUpperCase());
            event.target.value = event.target.value.replace(/ +/g, ' ').trim();
         });
      })

      inputPhone.addEventListener('blur', (event) => {
         event.target.value = event.target.value.replace(/[^()-\d]/g, '');
         event.target.value = event.target.value.replace(/-+/g, '-');
         event.target.value = event.target.value.replace(/ +/g, ' ').trim();
      });

      inputMessage.addEventListener('blur', (event) => {
         event.target.value = event.target.value.replace(/[^\dа-я-]/gi, '');
         event.target.value = event.target.value.replace(/-+/g, '-');
         event.target.value = event.target.value.replace(/ +/g, ' ').trim();
      });

      inputEmail.addEventListener('blur', (event) => {
         event.target.value = event.target.value.replace(/[^a-z0-9[@_.!~*'-]]/gi, '');
         event.target.value = event.target.value.replace(/-+/g, '-');
         event.target.value = event.target.value.replace(/ +/g, ' ').trim();

      });
   };

   //Calc

   const calc = (price = 100) => {
      const calckBlock = document.querySelector('.calc-block'),
         calcType = document.querySelector('.calc-type'),
         calcSquare = document.querySelector('.calc-square'),
         calcDay = document.querySelector('.calc-day'),
         calcCount = document.querySelector('.calc-count'),
         totalValue = document.getElementById('total');

      const countSum = () => {
         let total = 0,
            countValue = 1,
            dayValue = 1;
         const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

         if (calcCount.value > 1) {
            countValue += (calcCount.value - 1) / 10;
         }

         if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
         } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
         }

         if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
         }


         totalValue.textContent = total;
      };

      calckBlock.addEventListener('change', (event) => {
         const target = event.target;

         if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {
            countSum();
         }
      });
   };

   countTimer('10 july 2021');
   toggleMenu();
   togglePopup();
   tabs();
   addDot();
   setCommandImg();
   checkInput();
   calc(100);
   slider();
});



