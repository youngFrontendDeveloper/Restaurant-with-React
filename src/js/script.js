$(function(){
  'use strict';


  //Функция для слик-слайдера

  $('.slick-slider').slick({
    slidesToShow: 1,   /*Показывает по 1 картинке*/
    slidesToScroll: 1,   //прокручивает по 1 картинке
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
  });


//Функция для плавного перехода по якорям

  $('a[href^="#"]').click(function(){
    var target = $(this).attr('href');
    $('html, body').animate(
      {
        scrollTop:$(target).offset().top
      },
      800
    );
  });


//Функция для добавления класса active 

  $('.link--menu').click(function(){
    $('.link--menu').removeClass('link--menu--active');
    $(this).addClass('link--menu--active');
    });



    //Функция для фильтрации элементов 

    $(function() {

      var newSelection = "";
    
      $(".filter-controls__item").click(function(){
    
          $(".filter-container").fadeTo(200, 0.10);
    
        $(".filter-controls__item").removeClass("filter-controls__item--active");
        $(this).addClass("filter-controls__item--active");
    
        newSelection = $(this).attr("rel");
    
        $(".filter-container__item").not("."+newSelection).slideUp();
        $("."+newSelection).slideDown();
    
          $(".filter-container").fadeTo(600, 1);
    
      });
    
    });



   //Функция для мобильного меню
   var navItems = document.querySelector('.nav__items');
   var nav = document.querySelector('.nav__menu-mobile');

   function openMobileMenu() {
    if (document.documentElement.clientWidth < 768) {
      navItems.classList.add('nav__items--closed');
      nav.addEventListener('click', function() {
        navItems.classList.toggle('nav__items--closed');
      });
    } else {
      navItems.classList.remove('nav__items--closed');
    }
    
   }

   openMobileMenu();







});   // Окончание главной функции




