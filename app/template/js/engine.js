$(document).ready(function(){

	$('#home-carousel').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Назад"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Вперед"></button>',
		autoplay: false,
		autoplaySpeed: 4000,
		adaptiveHeight: true
	});


	$('#brands-carousel').slick({
		slidesToShow: 17,
		slidesToScroll: 2,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Назад"></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Вперед"></button>',
		responsive: [
		    {
		      breakpoint: 1399,
		      settings: {
		        slidesToShow: 14,
		        slidesToScroll: 3
		      }
		    },
		    {
		      breakpoint: 991,
		      settings: {
		        slidesToShow: 11,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 9,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 650,
		      settings: {
		        slidesToShow: 5,
		        slidesToScroll: 2
		      }
		    },
		    {
		      breakpoint: 450,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 2
		      }
		    }
		  ]
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


	// mask
	$('input.tel').inputmask({
		mask: '+7(999)999-99-99',
		showMaskOnHover : false
	});


	$.validator.addMethod("validphone", function(value){
		if (Inputmask.isValid(value, { mask: '+7(999)999-99-99'})) return true
		else return false;
	},"");


	var thankcallback = '<div class="thank text-center"><p>В ближайщее время с вами свяжутся наши менеджеры для уточнения всех деталей</p></div>';
	// validation forms
	$('#callback-form').validate({
        rules : {
            tel:{validphone:true}           
        },
		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			// $(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');

			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					document.querySelector('.sending').remove();
					$(form).append(thankcallback);
					startClock('callback-form');
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
					$('.sending').remove();
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});



	$('#callback-form22').validate({
        rules : {
            tel:{validphone:true}           
        },

		submitHandler: function(form){
			var strSubmit=$(form).serialize();
			$(form).find('fieldset').hide();
			$(form).append('<div class="sending">Идет отправка ...</div>');
			$.ajax({
				type: "POST",
				url: $(form).attr('action'),
				data: strSubmit,
				success: function(){
					$(form).closest('.modal__body').html(thankcallback);
					startClock('callback-form');
				},
				error: function(){
					alert(errorTxt);
					$(form).find('fieldset').show();
					$('.sending').remove();
				}
			})
			.fail(function(error){
				alert(errorTxt);
			});
		}
	});

});


var timer,
	sec = 3;


function showTime(sendform){
	sec = sec-1;
	if (sec <=0) {
		stopClock();

		switch (sendform){
			case 'callback-form':
				modal = $("#" + sendform).closest('.modal');
				modal.modal('hide');
				modal.find('.thank').remove();
				modal.find('.form-control, textarea').val('');
				break;
			case 'feedback-form':
				$('.feedback .thank').fadeOut('normal',function(){
					$('.feedback .thank').remove();
					$('.feedback .form-control, .feedback textarea').val('');
					$('.feedback__form fieldset').show();
				});
				break;
			case 'cart-form':
				$('.cart .thank').fadeOut('normal',function(){
					$('.cart .thank').remove();
					// $('.cart .form-control, .cart textarea').val('');
					// $('.cart__form fieldset').show();
				});
				break;	
			default:
				modal = $("#" + sendform).closest('.modal');
				modal.fadeOut('normal',function(){
					modal.modal('hide');
				});
				break;
		}
	}
}
function stopClock(){
	window.clearInterval(timer);
	timer = null;
	sec = 3;
}

function startClock(sendform){
	if (!timer)
		timer = window.setInterval("showTime('" + sendform + "')",1000);
}



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



$(function(){
	$('.policy input').click(function(){
		var $this = $(this),
			$submit = $this.closest('.form-policy');

		if ($this.is(':checked')){
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').removeAttr('disabled');
		} else {
			$submit.addClass('disabled');
			$submit.find('.input, .form-control, .submit, textarea, input[type=radio]').attr('disabled', true);
		}
	})
});
