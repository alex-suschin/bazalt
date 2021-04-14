$(function() {

    jQuery("a.scrollto").click(function() {
        elementClick = jQuery(this).attr("href")
        destination = jQuery(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 700);
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
        variableWidth: true
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

    $(window).on('mousedown touchstart', dragStart);
    $(window).on('mouseup touchend', dragEnd);


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
        variableWidth: true
    });

});

$(window).on('load resize scroll', function() {

    var width = $(window).width();

    if ((width > '700') && (width < '1000')) {

    }

    if (width > '700') {

    }

    if (width < '700') {

    }

});