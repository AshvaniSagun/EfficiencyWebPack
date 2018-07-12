$(document).ready(function () {

    $('.pane-hScroll').scroll(function () {
        $('.pane-vScroll').width($('.pane-hScroll').width() + $('.pane-hScroll').scrollLeft());
    });

    $('.pane-formulahScroll').scroll(function () {
        $('.pane-formulavScroll').width($('.pane-formulahScroll').width() + $('.pane-formulahScroll').scrollLeft());
    });

    $(document).mouseup(function (e) {
        if ($(window).width() < 767) {
            var cv2 = $('#mobile-menu');
            var cv3 = $('.mainTabs-style');
            if (!cv2.is(e.target) && cv2.has(e.target).length === 0 && !cv3.is(e.target) && cv3.has(e.target).length === 0) {
                $('.mainTabs-style').hide();
            }

            else {
                $('.mainTabs-style').block();
            }
        }
    });


}); 
