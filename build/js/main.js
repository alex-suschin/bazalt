$(function() {

    $(document).scroll(function() {
        let scroll = $(window).scrollTop();
        if (scroll >= 300) {
            $('.anchor-up').addClass('active');
        } else {
            $('.anchor-up').removeClass('active');
        }

    });

    $(window).on('load', function() {
        let phones = [
            { 'mask': '+7 \\ \\ ###-###-##-##' }
        ];

        $('input[type=tel]').inputmask({
            mask: phones,
            greedy: false,
            definitions: {
                '#': {
                    validator: '[0-9]',
                    cardinality: 1
                }
            }
        });
    });

    $('select').niceSelect();

    $("a.anchor-up").click(function() {
        elementClick = $(this).attr("href")
        destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 700);
        return false;
    });

    $('#hamburger-icon').click(function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.mobile-menu').addClass('active');
            $('html').addClass('ov-hidden');
        } else {
            $('.mobile-menu').removeClass('active');
            $('html').removeClass('ov-hidden');
        }
    });

    $('.mobile-menu .top-menu a').click(function() {
        $('#hamburger-icon').removeClass('active');
        $('.mobile-menu').removeClass('active');
        $('html').removeClass('ov-hidden');
    });

    $('.style-tab').click(function() {
        $('.style-tabs').find('.active').removeClass('active');
        $(this).addClass('active');
        $('.styles-elems').find('.styles-elem-item').hide();
        $('#' + $(this).data('switch')).show();
    });

    $('.top-slider').slick({
        infinite: false,
        slidesToShow: 1,
        arrows: true,
        dots: true,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [{
            breakpoint: 769,
            settings: {
                arrows: false
            }
        }]
    });

    let xPos = 0;

    gsap.timeline()
        .set('.ring', { rotationY: 180, cursor: 'grab' }) //set initial rotationY so the parallax jump happens off screen
        .set('.img', { // apply transform rotations to each image
            rotateY: (i) => i * -36,
            transformOrigin: '50% 50% 500px',
            z: -500,
            backgroundPosition: (i) => getBgPos(i),
            backfaceVisibility: 'hidden'
        })
        .from('.img', {
            duration: 1.5,
            y: 200,
            opacity: 0,
            stagger: 0.1,
            ease: 'expo'
        })
        .add(() => {
            $('.img').on('mouseenter', (e) => {
                let current = e.currentTarget;
                gsap.to('.img', { opacity: (i, t) => (t == current) ? 1 : 0.5, ease: 'power3' })
            })
            $('.img').on('mouseleave', (e) => {
                gsap.to('.img', { opacity: 1, ease: 'power2.inOut' })
            })
        }, '-=0.5')

    $('.stage').on('mousedown touchstart', dragStart);
    $('.stage').on('mouseup touchend', dragEnd);


    function dragStart(e) {
        if (e.touches) e.clientX = e.touches[0].clientX;
        xPos = Math.round(e.clientX);
        gsap.set('.ring', { cursor: 'grabbing' })
        $(window).on('mousemove touchmove', drag);
    }


    function drag(e) {
        if (e.touches) e.clientX = e.touches[0].clientX;

        gsap.to('.ring', {
            rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
            onUpdate: () => { gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) }) }
        });

        xPos = Math.round(e.clientX);
    }


    function dragEnd(e) {
        $(window).off('mousemove touchmove', drag);
        gsap.set('.ring', { cursor: 'grab' });
    }


    function getBgPos(i) { //returns the background-position string to create parallax movement in each image
        return (100 - gsap.utils.wrap(0, 360, gsap.getProperty('.ring', 'rotationY') - 180 - i * 36) / 360 * 500) + 'px 0px';
    }


    $('.rewiews-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipe: false,
        variableWidth: true,
        responsive: [{
                breakpoint: 1201,
                settings: {
                    centerMode: true
                },
            },
            {
                breakpoint: 601,
                settings: {
                    dots: true,
                    arrows: false,
                    swipe: true,
                    centerMode: true
                },
            }
        ]
    });



    $('.btn-close').click(function() {
        $('.mobile-menu').removeClass('active');
        $('#hamburger-icon').removeClass('active');
        $('html').removeClass('ov-hidden');
    });


    $('.js-address').click(function(e) {
        e.preventDefault();
        $('#popup-wrap-map').addClass('popup-active');
        $('#popup-map').addClass('popup-active');
    });

    $('.close-map').click(function(e) {
        e.preventDefault();
        $('#popup-wrap-map').removeClass('popup-active');
        $('#popup-map').removeClass('popup-active');
    });

    $(document).click(function(event) {
        if (!$(event.target).closest("#popup-map,.js-address").length) {
            $("body").find("#popup-wrap-map").removeClass("popup-active");
            $("body").find("#popup-map").removeClass("popup-active");
        }
    });

    $('.filter-name').click(function() {
        $(this).parents('.filter-box-item').toggleClass('active');
        $(this).siblings('.filter-inputs').slideToggle();
    });


    $(".js-range-slider").ionRangeSlider({
        type: "double",
        min: 0,
        max: 5000,
        from: 250,
        to: 1800,
        grid: false,
        onChange: function(data) {
            $('.start-price').val(data.from);
            $('.finish-price').val(data.to_pretty);
        }
    });

    $('.range-slider-input').keyup(function() {
        let inputId = $(this).attr('id');
        let inputValue = $(this).val();
        let my_range = $(".js-range-slider").data("ionRangeSlider");
        if (inputId === 'slider-input-from') {
            my_range.update({
                from: inputValue
            });
        } else {
            my_range.update({
                to: inputValue
            });
        }
    });

    $('.btn-filter').click(function() {
        $(this).siblings('.filter').slideToggle();
    });


    $('.filter-box-item input[type="checkbox"]').change(function() {
        var colCheked = $(this).parents('label').parents('.filter-inputs').find('input[type=checkbox]:checked').length;
        console.log(colCheked);
        if (colCheked > 0) {
            $(this).parents('label').parents('.filter-inputs').siblings('.filter-name').find('i').show();
            $(this).parents('label').parents('.filter-inputs').siblings('.filter-name').find('i').find('small').text(colCheked);
        } else {
            $(this).parents('label').parents('.filter-inputs').siblings('.filter-name').find('i').hide();
        }
    });

    $('#size').change(function() {
        var getPrice = $('#size option:selected').data('price');
        var price = $('.card-price i');
        price.text(getPrice)
    });



});

$(window).on('load', function() {
    if ($(window).width() < '992') {
        $('.menu .sub').click(function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).children('.sub-menu').slideUp();
                $(this).removeClass('active');
            } else {
                $('.menu .sub').removeClass('active');
                $(this).addClass('active');
                $('.sub-menu').slideUp();
                $(this).children('.sub-menu').slideDown();
            }


        });
    }
});

$(window).on('load resize', function() {

    var width = $(window).width();

    if (width < '992') {

        $('.menu').insertAfter($('.mobile-menu .logo'));
        $('.header-top__right').insertAfter($('.mobile-menu .menu'));
    }

    if (width > '993') {
        $('.sub').removeClass('sub-js');
        $('.mobile-menu  .menu').appendTo($('.header-bottom .container'));
    }

    if (width > '950') {
        $('.card-wrap__left h1').prependTo($('.card-wrap__right'))
    }

    if (width < '951') {
        $('.card-wrap__right h1').prependTo($('.card-wrap__left'))
    }

});
//# sourceMappingURL=../sourcemaps/main.js.map
