$(document).ready(function(){

    /*** some codes to handling responsive layout  ***/

        var Width = $(window).width();
        var fullPageTop = 80;  // 80px from top, default in large size


    if (Width < 991 && Width > 768) {
        fullPageTop = 120;
    }
    /*** end responsive calculation ***/

    // make menu and logo dark when background is light, just put section anchor links in array
    var darkMenus = ['team','skills', 'portfolio'];

    // make home page (first page) content in center in all size of screens
    centerSet('.home_content');

    // skills section circle progress
    $('.pie_progress').asPieProgress({
        namespace: 'pie_progress',
        speed: 30,
        easing: 'easingBezier'
    });

    // enable isotope in portfolio items
    var $grid = $('.portfolioHolder').isotope({

        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    // custom javascript for create filter on portfolio types by clicking on filters link
    $('.portfoli-filter').on("click", 'a', function() {

        $('.portfoli-filter a').removeClass('active');  // remove all active classes from filters list
        $(this).addClass('active');                     // active clicked class
        var filterValue = $(this).attr('data-filter');  // get filter value
        $grid.isotope({ filter: filterValue });         // make filter
    });

    $('.loadMore').click(function(e) {

        e.preventDefault();
        e.stopPropagation();
        $('.portfolio-item').each(function(index, element) {

            var $item = $(element).clone();
            $grid.append( $item ).isotope( 'appended', $item );
        });

        $(this).remove(); // remove the load more button
    });

    $('.serviceItem').hover(function() {
        $(this).find('img').addClass('shake shake-slow');
    },function() {
        $(this).find('img').removeClass('shake shake-slow');
    });

    $('.toup').click(function() {

        $.fn.fullpage.moveTo('home');
    });

    var AnimationArray = [
        '#homeSection .slogan','#homeSection .btn',
        '#aboutSection .pageTitle','#aboutSection .pageDescription','#aboutSection .serviceItem',
        '#teamSection .pageTitle','#teamSection .pageDescription','#teamSection .teamMember',
        '#skillsSection .pageTitle','#skillsSection .pageDescription','#skillsSection .progress_area',
        '#portfolioSection .pageTitle','#portfolioSection .pageDescription','#portfolioSection .portfolioHolder',
        '#testimonialSection .pageTitle','#testimonialSection .pageDescription','#testimonialSection .client',
        '#contactSection .pageTitle', '#contactSection .pageDescription', '#contactSection .contact_form'];

    makeItHide(AnimationArray);



    $('#fullpage').fullpage({
        menu: '#menu',
        lockAnchors: false,
        anchors: ['home', 'about', 'team', 'skills', 'portfolio', 'testimonial', 'contact'],
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: [],
        showActiveTooltip: false,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '',
        scrollOverflow: true,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 7,

        //Accessibility
        keyboardScrolling: true,
        animateAnchor: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize : false,
        sectionsColor: ['#87509c', '#17c2a4', '#e7f1f8', '#ffffff', '#ffdd99', '#d74680', '#3c5499'],
        paddingTop: fullPageTop + 'px',
        paddingBottom: '0',
        fixedElements: '',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',

         //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){

            var menu        = $('.menuStyle');
            var removeit    = true;

            darkMenus.forEach(function(item) {
                console.log(item);
                if (anchorLink == item) { menu.addClass('darkStyle'); removeit = false;}
                if (anchorLink != 'home') {
                	$('.toup').addClass('toup-visible');
                }
                else {
                	$('.toup').removeClass('toup-visible');
                }
            });

            removeit ? menu.removeClass('darkStyle') : null;

            var animation = [];

            switch (anchorLink) {

                case 'home' :
                        setTimeout(function(){
                            animations = ['#homeSection .slogan,zoomIn', '#homeSection .btn,zoomIn'];
                            animateThese(animations);
                        },1000);
                    break;
                case 'about' :
                    animations = ['#aboutSection .pageTitle,slideInDown', '#aboutSection .pageDescription,slideInUp', '#aboutSection .serviceItem,rollIn'];
                    animateThese(animations);
                    break;
                case 'team' :
                    animations = ['#teamSection .pageTitle,slideInLeft', '#teamSection .pageDescription,slideInRight', '#teamSection .teamMember,slideInUp'];
                    animateThese(animations);
                    break;
                case 'skills' :
                    animations = ['#skillsSection .pageTitle,rotateIn', '#skillsSection .pageDescription,rotateIn', '#skillsSection .progress_area,rotateIn'];
                    animateThese(animations);
                    setTimeout( function(){ $('.pie_progress').asPieProgress('start'); }, 3000);
                    break;
                case 'portfolio' :
                    animations = ['#portfolioSection .pageTitle,zoomIn', '#portfolioSection .pageDescription,zoomIn', '#portfolioSection .portfolioHolder,zoomIn'];
                    animateThese(animations);
					setTimeout(function() {
						$grid.isotope('layout');
					},1750);
                    break;
                case 'testimonial' :
                    animations = ['#testimonialSection .pageTitle,bounceIn', '#testimonialSection .pageDescription,bounceIn', '#testimonialSection .client,bounceIn'];
                    animateThese(animations);
                    break;
                case 'contact' :
                    animations = ['#contactSection .pageTitle,fadeInUp', '#contactSection .pageDescription,fadeInUp', '#contactSection .contact_form,fadeInUp'];
                    animateThese(animations);
                    break;
            }

        },
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}

    });

    // portfolio modal scroll

    $('.modal-body').slimScroll({
        color: '#000',
        size: '8px',
        height: '100vh',
        alwaysVisible: false
    });


    // disable fullpage.js scrolling when modal is open
    var modal = $('.modal');

    modal.on('shown.bs.modal', function() {

        $.fn.fullpage.setMouseWheelScrolling(false);
        $.fn.fullpage.setAllowScrolling(false);
    });

    modal.on('hidden.bs.modal', function() {

        $.fn.fullpage.setMouseWheelScrolling(true);
        $.fn.fullpage.setAllowScrolling(true);
    });

});

function centerSet(element) {

    var e = $(element);
    var height = e.outerHeight();
    var viewHeight = $(window).height();
    e.css({'margin-top' : ( (viewHeight/2) - (height /2)) + 'px'});
}

/**
 * @description a function to hide chosen element for animation.css
 */
function makeItHide(array) {

    array.forEach(function(e) {

        $(e).css({'opacity' : 0.001});
    });
}


/**
 *
 * @param itemArray
 * @description make elemet animation one after one by adding animations.css cladd
 */
function animateThese(itemArray) {

    var time = 300;
    itemArray.forEach(function(item){

        var selector = item.split(',')[0];
        var animation = item.split(',')[1];

        $(selector).each(function(index, element){

            setTimeout( function(){ animateNext(element, animation); }, time);
            time += 300;
        });

    });

    function animateNext(selector, animation) {

        $(selector).css({'opacity' : 1}).addClass('animated ' + animation);
    }

}
