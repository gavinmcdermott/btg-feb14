$(function() {

    var slideOutOpen = false;

    $('.create-wallet').click(function() {
        if (slideOutOpen) {
            $('.slideout').removeClass('slideout-open');
            slideOutOpen = false;
        } else {
            var width = ( $('.container').width() / 12 ) * 5;
            var border = ( $('body').width() - $('.container').width() ) / 2;

            $('.slideout-inner').css('width', width - border + 25);
            $('.slideout').addClass('slideout-open');
            slideOutOpen = true;
        }
    });

    $('.transaction-detail').click(function() {
        $('.empty').addClass('hidden');
        $('.trans-full').removeClass('hidden');
    });

    var expanded = false;

    $('.group').click(function() {

        // $('.slideout-left').addClass('slideout-open');
        // $('.main-content-left .active').removeClass('active');
        // $(this).addClass('active');
        // if (!expanded) {
        //     expanded = true;
        //     shrinkMainContainer();
        // } else {
        //     expanded = false;
        //     expandMainContainer();
        // }
    });

    $('.wallet-tile-stable').click(function() {
        $('.wallet-tile-stable.active').removeClass('active');
        $(this).addClass('active');
    });

    $('#back').click(function() {
        $('.active').removeClass('active');
        $('.slideout-left').removeClass('slideout-open');
        setTimeout(function() {
            $('#bitgo').addClass('active');
        }, 330);
    });


    var expandMainContainer = function() {
        $('.main-content-left-container').addClass('main-left-reduced-width col-sm-offset-3 col-md-offset-3 col-lg-offset-3');
                             // .addClass('main-left-full-width col-sm-10 col-md-10 col-lg-10');

        $('.main-content-right-container').removeClass('main-right-full-width col-sm-6 col-md-6 col-lg-6')
                                          .addClass('hidden main-right-reduced-width col-sm-1 col-md-1 col-lg-1');
        $('.main-content-right-container').css('opacity', 0);

        $('.wallet-tile-full').removeClass('hidden');
        $('.wallet-tile-small').addClass('hidden');
    };

    var shrinkMainContainer = function() {
        $('.main-content-left-container').removeClass('main-left-full-width col-sm-offset-3 col-md-offset-3 col-lg-offset-3');
                             // .addClass('main-left-reduced-width col-sm-5 col-md-5 col-lg-5');

        $('.main-content-right-container').removeClass('hidden main-right-reduced-width hidden col-sm-1 col-md-1 col-lg-1')
                                          .addClass('main-right-full-width col-sm-6 col-md-6 col-lg-6');
        $('.main-content-right-container').css('opacity', 1);

        $('.wallet-tile-full').addClass('hidden');
        $('.wallet-tile-small').removeClass('hidden');
    };















































}());










