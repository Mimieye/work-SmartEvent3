/*global $, window, jQuery*/
(function () {
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



    $(".option").on("click", function () {
        if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
        } else {
            $(this).addClass("selected");
        }
    });

    $(".goContent, .goTest").on("click", function () {
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

    $(".send").on("click", function () {
        var a = $(".group3.selected").length;
        var b = $(".group2.selected").length;
        var c = $(".group1.selected").length;

        $("#popout").show();
        if (a <= 1 && b <= 1 && c <= 1) {
            $(".type_4").show();
        }

        if (b >= 2) {
            $(".type_2").show();
        }

        if (c >= 2 && b <2) {
            $(".type_3").show();
        }

        if (a >= 2 && b <2 && c <2) {
            $(".type_1").show();
        }
    });

    function btnEffect() {
        if (jQuery.browser.mobile) {
            $("#nav .btnSection span, .optionList .option, .type .btnSection span, .type .btnSection a, .send").removeClass("notmobile");
        } else {
            $(".notmobile").removeClass("notmobile");
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
        var speed = 200;
        $(".intro .text").hide();
        $(".text_1").fadeIn(speed, function () {
            $(".text_2").fadeIn(speed, function () {
                $(".text_3").fadeIn(speed, function () {
                    $(".text_4").fadeIn(speed, function () {
                        $(".text_5").fadeIn(speed, function () {
                            $(".text_6").fadeIn(speed, function () {
                                $(".text_7").fadeIn(speed, function () {
                                    $(".text_8").fadeIn(speed, function () {
                                        $(".text_9").fadeIn(speed + 200, function () {
                                            $(".text_10").fadeIn(speed + 200, function () {
                                                $(".text_11").fadeIn(speed + 200, function () {
                                                    setTimeout(titleAnimation, 3000);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    titleAnimation();
    if (hash === "#join") {
        $(".openPopout").click();
    }
}());
