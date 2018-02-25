/*global $, window, jQuery, ga*/
( function () {
    'use strict';
    var $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html, body');


    var hash = window.location.hash;

    function scrollPosition() {
        var n = $(window).scrollTop();
        var H = parseInt($("#content").css("margin-top"), 10);

        if (n > 300) {
            $("#header").css({
                transform: 'translateY(' + H + 'px)',
                MozTransform: 'translateY(' + H + 'px)',
                WebkitTransform: 'translateY(' + H + 'px)',
                msTransform: 'translateY(' + H + 'px)'
            });
        } else {
            $("#header").css({
                transform: 'translateY(' + H * n / 300 + 'px)',
                MozTransform: 'translateY(' + H * n / 300 + 'px)',
                WebkitTransform: 'translateY(' + H * n / 300 + 'px)',
                msTransform: 'translateY(' + H * n / 300 + 'px)'
            });
        }
    }
    $(window).on('scroll load resize', scrollPosition);


    var rdmArray = [], exist, rdm;
    randomNum();
    $('.questionWrap').eq(rdmArray[0]).css('display', 'block');

    function randomNum() {

        for (var i = 0; i <= 6; i++) {
            do {
                exist = false; //檢查此亂數是否已存在
                rdm = Math.floor(Math.random() * 7);    //取得亂數
                //檢查陣列中是否存在該亂數，若存在則重新產生亂數；若不存在則寫入陣列
                if ($.inArray(rdm, rdmArray) !== -1) {
                    exist = true;　 //若亂數不存在，跳出while迴圈並寫入陣列
                }
            } while (exist);
            rdmArray[i] = rdm;
        }
        return rdmArray;
    }

    var i = 0;
    $('.nextQuestion').on('click', function () {
        $('.answerBtn').show();
        $('.answerWrap').hide();
        $('.questionWrap').css('display', 'none');
        $('.questionWrap').eq(rdmArray[i + 1] ).css('display', 'block');
        i++;
        if (i > 6) {
            i = 0;
            rdmArray = []; //清空陣列
            randomNum(); //再亂數產生陣列
            $('.questionWrap').css('display', 'none');
            $('.questionWrap').eq(rdmArray[i] ).css('display', 'block');
        }
    } );

    $('.answerBtn').on('click', function () {
        $('.answerBtn').hide();
        $('.answerWrap').show();
    });




    $(".option").on("click", function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    } );

    $(".goContent, .goTest, .intTest").on("click", function () {
        var target = $("#content").offset().top;
        $body.animate({scrollTop: target}, 500);
    });

    $(".close").on("click", function () {
        $("#popout, .type, .discount").hide();
    });

    // $(".openPopout").on("click", function () {
    //     $(".type").hide();
    //     $("#popout").show();
    //     $(".discount").show();
    // });



    function btnEffect() {
        if (jQuery.browser.mobile) {
            $("#nav .btnSection span, .optionList span, .type .btnSection span, .type .btnSection a, .send").removeClass("notmobile");
        } else {
            $("notmobile").removeClass("notmobile");
            if ($(window).width() <= 640) {
                $("#nav .btnSection span, .type .btnSection span, .type .btnSection a").addClass("notmobile");
            } else {
                $("#nav .btnSection span, .optionList .option, .type .btnSection span, .type .btnSection a, .send").addClass("notmobile");
            }
        }
    }
    btnEffect();

    $(window).resize(btnEffect);

    function titleAnimation() {
        var i = 0,
            speed = 500;
        $('.intro .title').css('background-image', 'url(Images/knowledge/title_body_y.png)');
        $('.titleBody_h').css('background-image', 'url(Images/knowledge/title_body_h_y.png)');
        $('.titleBody_b').css('background-image', 'url(Images/knowledge/title_body_b_y.png)');
        $('.titleBody_f').css('background-image', 'url(Images/knowledge/title_body_f_y.png)');
        $('.boy span').css('transform', 'rotate(0)');
        $('.titleHeader, .titleBody_h, .titleBody_b, .titleBody_f').hide();
        $('.titleBody_h').fadeIn(speed, function () {
            $('.titleBody_b').fadeIn(speed, function () {
                $('.titleBody_f').fadeIn(speed, function () {
                    function titleText() {
                        $('.titleHeader').hide();
                        $('.intro .title').css('background-image', 'url(Images/knowledge/title_body_y.png)');
                        $('.titleBody_h').css('background-image', 'url(Images/knowledge/title_body_h_y.png)');
                        $('.titleBody_b').css('background-image', 'url(Images/knowledge/title_body_b_y.png)');
                        $('.titleBody_f').css('background-image', 'url(Images/knowledge/title_body_f_y.png)');
                        $('.boy span').css('transform', 'rotate(0)');
                        setTimeout( function () {
                            $('.titleHeader').show();
                            $('.intro .title').css('background-image', 'url(Images/knowledge/title_body_b.png)');
                            $('.titleBody_h').css('background-image', 'url(Images/knowledge/title_body_h_b.png)');
                            $('.titleBody_b').css('background-image', 'url(Images/knowledge/title_body_b_b.png)');
                            $('.titleBody_f').css('background-image', 'url(Images/knowledge/title_body_f_b.png)');
                            $('.boy span').css('transform', 'rotate(-20deg)');
                        }, 550 );
                        i++;
                        if (i < 3) {
                            setTimeout(titleText, 1100);
                        }
                    }
                    titleText();
                    setTimeout(titleAnimation, 3600);
                });
            });
        });
    }
    titleAnimation();
    if (hash === "#join") {
        $(".openPopout").click();
    }


    $('body').on('click', '.ga-tracking', function () {
        var thisCategory = $(this).attr('category');
        var thisAction = $(this).attr('action');
        var thisLabel = $(this).attr('label');
        ga('send', 'event', thisCategory, thisAction, thisLabel);
    });
}());

