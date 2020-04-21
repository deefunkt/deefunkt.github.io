
            var color_array = [];
            color_array.push(getComputedStyle(document.documentElement).getPropertyValue('--card-color4'));
            // color_array.push(getComputedStyle(document.documentElement).getPropertyValue('--card-color2'));
            // color_array.push(getComputedStyle(document.documentElement).getPropertyValue('--background-navbar-color'));
            color_array.push(getComputedStyle(document.documentElement).getPropertyValue('--card-color4'));
            var num_cards = $('.grid-item-card').length;
            AOS.init();
            // init Isotope
            var $skillgrid = $('#facts .grid');
            var $maingrid = $('.layout-grid');
            var previousSkill = '';

            // randomizeGridCardColors();


            
            function randomizeGridCardColors() {
                var num_color;
                for (var i = 0; i < num_cards; i++){
                    if (i%2 == 0){
                        num_color
                    }
                    num_color = Math.floor(Math.random() * color_array.length);
                    $('.grid-item-card')[i].style.backgroundColor = color_array[i%2];
                }
            }
            // assign item filter to isotope grid
            $skillgrid.isotope({
                itemSelector: "#facts .grid-item", 
                layoutMode: "fitRows" ,
                masonry: {
                    // use element for option
                    columnWidth: '.skill-grid-sizer'
                }
            });

            $maingrid.isotope({
                // set itemSelector so .grid-sizer is not used in layout
                itemSelector: '.layout-grid-item',
                percentPosition: true,
                masonry: {
                    // use element for option
                    columnWidth: '.layout-grid-sizer'
                }
            });
            // filter items on button click
            $('#facts .filters').on( 'click', '.type', function() {
                var filterValue = $(this).attr('data-filter');
                $('#facts .grid').isotope({ filter: filterValue });
                $maingrid.isotope('layout');
                AOS.refresh();
                // AOS.init();
            });
             // change is-checked class on buttons
            $('#facts .filters').each( function( i, typeGroup ) {
                var $typeGroup = $( typeGroup );
                $typeGroup.on( 'click', '.type', function() {
                    $typeGroup.find('.active').removeClass('active');
                    $( this ).addClass('active');
                });
            });
            
            // expand skillgrid items when clicked
            $skillgrid.on( 'click', '.grid-item-card', function() {

                var itemContent = this;
                setItemContentPixelSize( itemContent );

                var itemElem = itemContent.parentNode;
                if (previousSkill == ''){
                    //either the first, or its been clicked before
                    previousSkill = itemElem;
                } else if(previousSkill == itemElem){
                    previousSkill = '';
                } else{
                    $(previousSkill).toggleClass('is-expanded');
                    previousSkill = itemElem;
                }
                $( itemElem ).toggleClass('is-expanded');

                

                // force redraw
                var redraw = itemContent.offsetWidth;
                // renable default transition
                itemContent.style[ transitionProp ] = '';

                addTransitionListener( itemContent );
                setItemContentTransitionSize( itemContent, itemElem );

                $skillgrid.isotope('layout');
                $maingrid.isotope('layout');
            });

            var docElemStyle = document.documentElement.style;
            var transitionProp = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
            var transitionEndEvent = {
                WebkitTransition: 'webkitTransitionEnd',
                transition: 'transitionend'
            }[ transitionProp ];

            function setItemContentPixelSize( itemContent ) {
                var previousContentSize = getSize( itemContent );
                // disable transition
                itemContent.style[ transitionProp ] = 'none';
                // set current size in pixels
                itemContent.style.width = previousContentSize.width + 'px';
                itemContent.style.height = previousContentSize.height + 'px';
            }

            function addTransitionListener( itemContent ) {
                if ( !transitionProp ) {
                    return;
                }
                // reset 100%/100% sizing after transition end
                var onTransitionEnd = function() {
                    itemContent.style.width = '';
                    itemContent.style.height = '';
                    itemContent.removeEventListener( transitionEndEvent, onTransitionEnd );
                };
                itemContent.addEventListener( transitionEndEvent, onTransitionEnd );
            }

            function setItemContentTransitionSize( itemContent, itemElem ) {
                // set new size
                var size = getSize( itemElem );
                itemContent.style.width = size.width + 'px';
                itemContent.style.height = size.height + 'px';
            }


            // Smooth scroll for the navigation menu and links with .scrollto classes
            $(document).on('click', '.navbar-nav a, .scrollto', function(e) {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                e.preventDefault();
                var target = $(this.hash);
                if (target.length) {

                    var scrollto = target.offset().top;

                    $('html, body').animate({
                    scrollTop: scrollto
                    }, 1500, 'easeInOutExpo');

                    if ($(this).parents('.navbar-nav, .mobile-nav').length) {
                    $('.navbar-nav .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                    }

                    if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    }
                    return false;
                }
                }
            });

            $(document).on('click', '.mobile-nav-toggle', function(e) {
                $('body').toggleClass('mobile-nav-active');
                $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            });

            $(document).click(function(e) {
                var container = $(".mobile-nav-toggle");
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                }
                }
            });

            // Navigation active state on scroll
            var nav_sections = $('section');
            var main_nav = $('.nav-item, #mobile-nav');

            $(window).on('scroll', function() {
                var cur_pos = $(this).scrollTop() + 10;

                nav_sections.each(function() {
                var top = $(this).offset().top,
                    bottom = top + $(this).outerHeight();

                if (cur_pos >= top && cur_pos <= bottom) {
                    if (cur_pos <= bottom) {
                    main_nav.find('li').removeClass('active');
                    }
                    main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
                }
                });
            });