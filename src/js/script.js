$(document).ready(function () {

    // слайдер

    $('.presentation__carousel').slick({
        speed: 500,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="left"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="right"></button>',
        responsive: [
            {
                breakpoint: 767.98,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

    // табы

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // подробнеее

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.item__content').eq(i).toggleClass('item__content_active');
                $('.item__list').eq(i).toggleClass('item__list_active');
            })
        });
    };
    toggleSlide('.catalog__link');
    toggleSlide('.list__link');

    // modal

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    });

    $('.button_catalog').each(function(i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });

    // формы

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Будь ласка, вкажіть своє ім'я",
                phone: "Будь ласка, вкажіть свій номер телефону",
                email: {
                    required: "Нам потрібна ваша електронна адреса, щоб зв'язатися з вами",
                    email: "Ваша електронна адреса повинна бути у форматі name@domain.com"
                }
            }
        });
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    $('input[name=phone]').mask("+ 380 (99) 999-99-99");

    // отправка формы

    $('form').submit(function(e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
           $(this).find("input").val("");
           $('#consultation, #order').fadeOut();
           $('.overlay, #thanks').fadeIn();
           $('form').trigger('reset');
        });
        return false;
    });
});