
AOS.init();
// init Isotope
var $skillgrid = $('#facts .grid');
var $maingrid = $('.layout-grid');
var previousSkill = '';
window.scrollTo(0,1);
// Generate skillcards goes here
generateSkillCards();
function initializeIsotopes(){
    
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

});

var docElemStyle = document.documentElement.style;
var transitionProp = typeof docElemStyle.transition == 'string' ? 'transition' : 'WebkitTransition';
var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    transition: 'transitionend'
}[ transitionProp ];


function addTransitionListener( itemContent ) {
    if ( !transitionProp ) {
        return;
    }
    // reset 100%/100% sizing after transition end
    var onTransitionEnd = function() {
        itemContent.style.width = '';
        itemContent.style.height = '';
        $skillgrid.isotope('layout');
        $maingrid.isotope('layout');
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


