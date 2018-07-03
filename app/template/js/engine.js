$(document).ready(function(){

	$('#home-carousel').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Назад"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Вперед"></button>',
		autoplay: false,
		autoplaySpeed: 4000
	});

	// $('#inner-carousel').slick({
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	prevArrow: '',
	// 	nextArrow: '',
	// 	autoplay: true,
	// 	autoplaySpeed: 4000,
	// 	fade: true,
	// 	cssEase: 'linear',
	// 	lazyLoad: 'ondemand',
	// });


	// mobile-menu
	$('#navbar').each(function(){
		var $this = $(this),
			$link = $('.navbar-toggle'),
			$close = $('.close-menu'),

			init = function(){
				$link.on('click', openMenu);
				$close.on('click', closeMenu);
			},
			openMenu = function(e){
				e.preventDefault();
				$('body').addClass('o-menu');
			},
			closeMenu = function(e){
				e.preventDefault();
				$('body').removeClass('o-menu');
			};
		init();
	});	

	$('#totop').click(function (){
		$('body, html').animate({
			scrollTop:0
		}, 800);
		return false;
	});

	$('.fancybox-media, .fancybox').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {}
		}
	});



	/*  =product plus/minus */
	/* orders */
	$("#pcount").keydown(function(event) {
		// Разрешаем: backspace, delete, tab и escape
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
			 // Разрешаем: Ctrl+A
			(event.keyCode == 65 && event.ctrlKey === true) ||
			 // Разрешаем: home, end, влево, вправо
			(event.keyCode >= 35 && event.keyCode <= 39)) {
				 // Ничего не делаем
			 	$("#pcount").val("1");
				 return;
		}
		else {
			// Убеждаемся, что это цифра, и останавливаем событие keypress
			if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
				event.preventDefault();
			}  
		}
	});

	var quantity = $('#quantity');
	$('.count #plus').click(function(e){
		e.preventDefault();
		quantity.val(parseInt(quantity.val())+1);
		$('.disabled').removeClass('disabled');
		// подсчет общей суммы
	})

	$('#quantity').val('1');
	$('.count #minus').click(function(e){
		e.preventDefault();
		var count = parseInt(quantity.val())-1;
		if (count <= 1) {
			$(this).addClass('disabled');
			count = 1;
		};		
		quantity.val(count);
	})
	/*  =/product plus/minus */


});

// показываем второй  уровень меню
$(document).on('click', '.o-menu .folder > a, .o-menu .folder > span', function(e){
	e.preventDefault();
	var $this = $(this);
	$this.next('.subnav').slideToggle('normal', function(){
		$this.toggleClass('open')
	});
})


// card thumbs
// var thumbsurl = document.querySelectorAll('.card__thumbs a');
// for (index = 0; index < thumbsurl.length; index++) {
//     thumb = thumbsurl[index];
//     thumb.addEventListener('click', clickHandler);
// }

// function clickHandler(event) {
//     // let $newSrc = this.href;
//     // document.getElementById('mainImg').src = $newSrc;
//     // document.querySelector('.card__thumbs a.active').classList.remove('active');
//     // this.classList.add('active');
//     event.preventDefault();
// }
// =/card thumbs

