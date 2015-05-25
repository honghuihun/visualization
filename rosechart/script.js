/*============================================================================================
Global Variables
============================================================================================*/

var issueColors = {
  "EHHI" : "#ff9600", // Health impacts
  "EHAIR" : "#f7c80b", // Air quality
  "EHWS" : "#ff6d24", // Water & Sanitation
  "EVWAT" : "#7993f2", // Water Resources
  "EVAG" : "#2e74ba", // Agriculture
  "EVFOR" : "#009bcc", // Forest 
  "EVFISH" : "#008c8c", // Fisheries
  "EVBH" : "#00ccaa", // Biodiversity
  "EVCLIM" : "#1cb85d", // Climate & Energy
};

jQuery(document).ready(function($) {

/*==================================================================
  Global
=================================================================*/

  $("select.style-dropdown").each(function(){
    $(this).select2({
      minimumResultsForSearch: -1,
      dropdownCssClass: "drop-style-dropdown",
      dropdownAutoWidth: true,
      width: 'element'
    });
  });
  
  $("select.style-input").each(function(){
    $(this).select2({
      dropdownCssClass: "drop-style-input"
    });
  });
  
  $("select.style-country").each(function(){
    $(this).select2({
      dropdownCssClass: "drop-style-country",
      dropdownAutoWidth: true,
      width: 'element'
    });
  });

/*==================================================================
  Infinite Scroll
=================================================================*/

if ($('.node-type-new-insights-sub-hub').length){
  var $content = '.view-content';
  var $nav_wrap = '.pager';
  var $anchor = '.pager-next a';
  var $anchorlabel = $('.pager-next a').text();
  var $next_href = $($anchor).attr('href'); // Get URL for the next set of posts
  
  $($nav_wrap).html('<a id="almc-load-more" href="' + $next_href + '">' + $anchorlabel + '</a>');
  
  $('#almc-load-more').after('<div class="loading" style="display: none;" ></div>');
  
  $('#almc-load-more').on('click', function(e) {
    e.preventDefault();
  
    $(this).fadeOut('fast');
    $('.loading').fadeIn('fast');
  
    $.get($(this).attr('href'), '', function(data) {
      var $new_content = $($content, data).html(); // Grab just the content
      var $next_href = $($anchor, data).attr('href'); // Get the new href
      
      if($next_href !== $(this).attr('href')) { //If not the last page of content:
        $('.view-content .row:last-child').after($new_content); // Append the new content 
        $('.loading').fadeOut('fast');
        $('#almc-load-more').fadeIn('fast');
        $('#almc-load-more').attr('href', $next_href);  // Change the next URL
        $('.item-list').not(':last-child').remove();
      }
      else {
        $('.view-content .row:last-child').after($new_content); // Append the new content 
        $('.item-list').remove(); 
        $(this).remove();
      }
    });
  });
}

/*==================================================================
  Share
=================================================================*/

  $('.share-content .twitter').each(function(){
    $(this).sharrre({
      share: {
        twitter: true
      },
      template: '<i class="icon-twitter"></i>',
      enableHover: false,
      enableTracking: true,
      buttons: { twitter: {via: 'YaleEnviro'}},
      click: function(api, options){
        api.simulateClick();
        api.openPopup('twitter');
      }
    });
  });
  
  $('.share-content .facebook').each(function(){
    $(this).sharrre({
      share: {
        facebook: true
      },
      template: '<i class="icon-facebook"></i>',
      enableHover: false,
      enableTracking: true,
      click: function(api, options){
        api.simulateClick();
        api.openPopup('facebook');
      }
    });
  });

    var shareTab = 0;
    $('.share-tab .twitter').each(function(){
        $(this).sharrre({
            share: {
                twitter: true
            },
            url: document.location.href.substr(0, (document.location.href.indexOf('#') > 0) ? document.location.href.indexOf('#'):document.location.href.length)
                + (shareTab > 0 ? '#tab-'+shareTab : ''),
            text: document.title + ' - ' + $('.info-tabs').find('.tab-'+shareTab).text(),
            template: '<i class="icon-twitter"></i>',
            enableHover: false,
            enableTracking: true,
            buttons: { twitter: {via: 'YaleEnviro'}},
            click: function(api, options){
                api.simulateClick();
                api.openPopup('twitter');
            }
        });
        shareTab++;
    });

    var shareTab = 0;
    $('.share-tab .facebook').each(function(){
        $(this).sharrre({
            share: {
                facebook: true
            },
//            url: document.location.href.substr(0, (document.location.href.indexOf('#') > 0) ? document.location.href.indexOf('#'):document.location.href.length)
//                + '#tab-'+shareTab,
            url: window.location.protocol + "//" + window.location.host + "/node/" + $('.info-tabs').find('.tab-'+shareTab).attr('id'),
            text: document.title + ' - ' + $('.info-tabs').find('.tab-'+shareTab).text(),
            template: '<i class="icon-facebook"></i>',
            enableHover: false,
            enableTracking: true,
            click: function(api, options){
                api.simulateClick();
                api.openPopup('facebook');
            }
        });
        shareTab++;
    });
/*
  $('.share-content .linkedin').each(function(){
    $(this).sharrre({
      share: {
        linkedin: true
      },
      enableHover: false,
      enableTracking: true,
      template: '<i class="icon-linkedin"></i>',
      click: function(api, options){
        api.simulateClick();
        api.openPopup('linkedin');
      }
    });
  });
*/
  
  $(function() {
    var smWidth = $('.share-links').outerWidth(); // measures the width of social media icons
  
    $('.social-share').hover(function(){ // on hover do this:
      $(this).find('.share-btn').animate({"right":smWidth}, 500);
      $(this).find('.sharrre').delay( 500 ).animate({"opacity":1}, 100);
    }, function(){ // on mouse out do this:
      $(this).find('.sharrre').stop().animate({"opacity":0}, 100);
      $(this).find('.share-btn').stop().delay( 100 ).animate({"right":0}, 250);
    });
  });

/*==================================================================
  Tables
=================================================================*/

  var orderAsc = null;
  
  $('#sort1 span').each(function(){
    orderAsc = "a"; // This tells the the page that Rank is already ascending
    $(this).addClass('asc'); // Adds class to indicate ascending
  });
  
  $('.btnSort span').each(function(){
  
    $(this).click(function(){
  
      var sortBy = $(this).parent().attr("id");
            var sortDiv = "." + sortBy; // css selector for sortable values
            // if this an indicator row (not one of the first 3)
            if (sortBy !== 'sort1' && sortBy !== 'sort2' && sortBy !== 'sort3') {
                // add the inner div for the active values to the css selector
                var innerCol = 'score';
                if ($('.raw-btn').hasClass('active')) {
                    innerCol = 'raw-value';
                }
                sortDiv += " ."+ innerCol;
            }

      if (orderAsc === null || orderAsc === "a" ){
  
        $('.table-row').tsort( sortDiv  ,{order: 'desc'});
        $(this).parents('.table-head-row ').find('.asc').removeClass('asc');
        $(this).addClass('desc');
        orderAsc = "d";
  
      } else {
  
        $('.table-row').tsort( sortDiv ,{order: 'asc'});
        $(this).parents('.table-head-row ').find('.desc').removeClass('desc');
        $(this).addClass('asc');
        orderAsc = "a";
      }
    });
  });
  
  var columnCount = $('.table-head-row div[class*="table-col"]:not(#sort1, #sort2)').length;
  
  $('#sort3, .sort3, #sort4, .sort4, #sort5, .sort5, #sort6, .sort6, #sort7, .sort7, #sort8, .sort8, #sort9, .sort9').css("width", (960 - 418)  / columnCount + "px");
  
  $(window).ready(function(){
    $('.table-header.sticky').each(function(){
      $(this).sticky({
        zIndex: 100,
        stopper: ".table-row:last-child"
      });
    });
  });


/*==================================================================
  Modals
=================================================================*/

  $(".change-page-link").click(function() {
    $("#change-page").reveal({
      animation: 'fade'
    });
  });
  
  $(".change-page-2-link").click(function() {
    $("#change-page-2").reveal({
      animation: 'fade',
    });
  });
  
  $(".change-page-3-link").click(function() {
    $("#change-page-3").reveal({
      animation: 'fade',
    });
  });

/*==================================================================
  Sliders
=================================================================*/

  if ($('#splash').length > 0 ){
        
    $(window).load(function(){
      
      $("#splash").fadeIn();
    
      $("#splash").zAccordion({
        //timeout: 4500,
        speed: 500,
        slideClass: 'slide',
        startingSlide: 0,
        //slideWidth: slideWidth,
        width: "100%",
        height: 580,
        invert: true,
        auto: false,
        errors: true,
        tabWidth: "8%",
        animationStart: function () {
          $('#splash').find('li.slide-previous div').fadeOut();
        },
        animationComplete: function () {
          $('#splash').find('li.slide-open div').fadeIn();
          $("#splash h2").each(function(){
            $(this).fitText(1,{
              minFontSize: '20px',
              maxFontSize: '64px'
            });
          });
        },
        buildComplete: function () {
          $('#splash').find('li.slide-closed div').css('display', 'none');
          $('#splash').find('li.slide-open div').fadeIn();
          $("#splash h2").each(function(){
            $(this).fitText(1,{
              minFontSize: '20px',
              maxFontSize: '64px'
            });
          });
          
        },
      });
    
      var sliderHeight = $("#splash li img").height(); // Measures height of the image 
      var slideText = $("#block-block-1").offset().left + 56; // easures the offset of the text from the left of the browser
        
      // Applies measured height to wrapper and slide 
      $("#splash, #splash li").css("height" , sliderHeight);
      
      
      // Counts slides, then adjusts the left position of the text based on slide count
      //var slidecount = 0;
      
      $("#splash li").each(function(){
        //slidecount = slidecount + 1;
        //var slideTextPosition = slideText / slidecount;
        $(this).find('.text').css("left" , slideText);
      });
    });
    
    

    $(window).resize(function(){
      
      var sliderHeight = $("#splash li img").height();
      var slideText = $("#block-block-1").offset().left + 56;
      var slidecount = 0;
    
      $("#splash").css("height", sliderHeight);
        
      $("#splash li").each(function(){
        slidecount = slidecount + 1;
        //var slideTextPosition = slideText / slidecount;
        //$(this).find('.text').css("left" , slideTextPosition);
        $(this).css("height", sliderHeight);
      });
      
      $("#splash li .text").css("left" , slideText);
    
    });
    
  
  }// End If splash exists
  
  $(window).load(function(){
    $('.horz-scroll .view').each(function(){
      var slidecount = $(this).children().length;
    
      if ( slidecount <= 4 ){
        $(this).parents('.wrapper').find('.slide-control a').addClass('disabled');
        $(this).parents('.horz-scroll').addClass('no-scroll');
      } else {
        $(this).carouFredSel({
          height: "variable",
          width: 960,
          items: {
            visible: 4,
            minimum: 1,
            width: 245,
            height: "variable"
          },
          scroll: {
            items: 4,
            duration: 1200
          },
          auto: false,
          prev: $(this).parents('.wrapper').find('a.btn-prev:not(.disabled)'),
          next: $(this).parents('.wrapper').find('a.btn-next:not(.disabled)')
        });
      }
    });
  });
  

/*==================================================================
  Font Size for news items
=================================================================*/

  $('.title-wrap').each(function(){
    $(this).textfill({
      maxFontPixels: 20,
      minFontPixel: 10
    });
  });
  
    $(document).ajaxComplete(function(){
        $('.title-wrap').each(function(){
      $(this).textfill({
        maxFontPixels: 20,
        minFontPixel: 10
      });
    });
    });

/*
  $('.horz-scroll h3').each(function(){
    $(this).textfill({
      maxFontPixels: 20,
      minFontPixel: 10,
      innerTag: $('a')
    });
  });
*/

/*============================================================================================
  Header
============================================================================================*/


  /* Pre-Header Search */

  $('.search-trigger').live('hover', function(){
    $('.search-wrapper').fadeIn('fast');
    $(this).addClass('hover');
  });


  $(document).mouseup(function (e){
    var container = $(".search-wrapper");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.fadeOut();
      $('.search-trigger').removeClass('hover');
      $('.search-trigger').bind('hover');
    }
  });
  
  var menuItem = 0;
  
  // Find menus with children, find child ul and wrap it in a div
  $('#block-system-main-menu li.expanded').each(function(){
  
    menuItem = menuItem + 1;
  
    $(this).find('ul').wrap(function() {
      return $("<div>").addClass("submenu submenu" + menuItem);
    });
  
  });
  
  // Moves submenus into #submenus div
  $('#submenus .content').append($('.submenu'));
  
  // Give the proper width to each menu item
  $('#submenus .submenu').each(function(){
    var linkCount = $(this).find('li').length;
    var linkWidth = 960 / linkCount;
    
    if( linkCount <= 5 ){
      $(this).find('li').css('width', linkWidth);
    } else {
      $(this).find('li').css('width', 192);
    }
    
  });
  
  // Menu hover functionality
  var nav_timer = null;
  var nav_open = false;
  var curElement = $('#block-system-main-menu li[class*="active"]');
  
  function close_nav() {
    nav_open = false;
    $('#submenus').animate({
      top: -50
      }, 400, function () {
    });
  
    $('#block-system-main-menu li.expanded.hover').removeClass('hover');
  }
  
  function open_nav() {
  
    cancel_close_nav_timer();
  
    nav_open = true;
    var open_to = 134;
  
    if ($('#submenus').position().top === open_to){
  
    } else {
      $('#submenus').animate({
        top: open_to
        }, 250, function () {
      });
    }
  }
  
  function start_close_nav_timer() {
    /* nav_timer = setTimeout('close_nav()', 100); */
    /*     $('#block-system-main-menu li.expanded.hover').removeClass('hover'); */
    nav_timer = setTimeout(function(){ close_nav(); }, 100);
  }
  
  function cancel_close_nav_timer() {
    clearTimeout(nav_timer);
  }
  
  $('#block-system-main-menu ul li.expanded').each(function(){
  
    $(this).hoverIntent(function() {
  
      var index = $('#block-system-main-menu ul li.expanded').index(this);
      var height = $('#submenus .content').children().eq(index).height();
  
      if (nav_open === true) {
  
        // Hide all content except that corresponding to the hovered link
        /* $('#submenus .content').children().fadeOut(200).eq(index).stop().fadeIn(200); */
        $('#submenus .content').children().removeClass('show').eq(index).addClass('show');
  
        $('#submenus .content').height(height).eq(index);
  
        // Remove active class from all links except that which was clicked
        $('#block-system-main-menu ul li').removeClass('hover');
        $(this).addClass('hover');
  
      } else {
  
        open_nav();
  
        // Hide all content except that corresponding to the hovered link
        /* $('#submenus .content').children().fadeOut(200).eq(index).stop().fadeIn(200); */
        $('#submenus .content').children().removeClass('show').eq(index).addClass('show');
  
        $('#submenus .content').height(height).eq(index);
  
        // Remove active class from all links except that which was clicked
        $('#block-system-main-menu ul li').removeClass('hover');
        $(this).addClass('hover');
  
      }
    });
  });
  
  /*
  $('#block-system-main-menu').hover(function () {
    cancel_close_nav_timer();
    }, function () {
    start_close_nav_timer();
  });
  */
  
  $('#submenus').hover(function(){
    cancel_close_nav_timer();
    $('#block-system-main-menu li[class*="active"]').removeClass('active-trail active-trail active');
  }, function() {
    start_close_nav_timer();
    $(curElement).addClass('active-trail');
  });
  
  
  $('#block-system-main-menu ul li.expanded').hover(function(){
    cancel_close_nav_timer();
    $(this).parent().find('[class*="active"]').removeClass('active-trail active-trail active');
  }, function() {
    start_close_nav_timer();
    $(curElement).addClass('active-trail');
  });
  
  
  /*
$('#block-system-main-menu li.no-drop').hover(function () {
    $(this).addClass('hover');
    $(this).parent().find('li[class*="active"]').removeClass('active-trail active-trail active');
    start_close_nav_timer();
  }, function() {
    $(this).removeClass('hover');
    $(curElement).addClass('active-trail');
  });
*/
  

/*============================================================================================
  Equal Heights
============================================================================================*/

  function equalHeight(group) {
    var tallest = 0;
    group.each(function() {
      var thisHeight = $(this).height();
      if(thisHeight > tallest) {
        tallest = thisHeight;
      }
    });

    group.height(tallest);
  }
  
  if ($('.node-type-epi-index .objectives').length) {
    equalHeight($(".node-type-epi-index .objectives"));
  }
  
  if ($('.info-tabs li').length) {
    equalHeight($(".info-tabs li"));
  }
  
  // Data Explorer
  if ($('#views-exposed-form-data-explorer-page-1 fieldset').length) {
    equalHeight($("#views-exposed-form-data-explorer-page-1 fieldset"));
  }
  
  if ($('.bottom-modules').length) {
    equalHeight($(".bottom-modules .region"));
  }
  
  /*
  var highestCol = Math.max($('.objectives').height(),$('#element2').height());
  $('.elements').height(highestCol);
  */
  
/*============================================================================================
  EPI Page Country Search
============================================================================================*/

  var country_search_timer = null;
  var country_search_open = false;
  
  function close_country_search() {
    country_search_open = false;
    $('#country-search-form .select2-container').fadeOut();
  }
  
  function open_country_search() {
  
    cancel_close_country_search();
  
    country_search_open = true;
    $('#country-search-form .select2-container').fadeIn();
  }
  
  function start_cancel_close_country_search() {
    country_search_timer = setTimeout(function(){ close_country_search(); }, 100);
  }
  
  function cancel_close_country_search() {
    clearTimeout(country_search_timer);
  }
  
  
  $('#country-search-form .trigger').hover(function(){
    open_country_search();
  }, function(){
    start_cancel_close_country_search();
  });
  
  $('#country-search-form .select2-container').hover(function(){
    cancel_close_country_search();
  }, function(){
    start_cancel_close_country_search();
  });

/*============================================================================================
  Issue Description
============================================================================================*/

  $('.node-type-issue-description .info-tabs ul').children().click(function() {
  
  // Get the index of the link that was clicked on
  var index = $('.node-type-issue-description .info-tabs ul').children().index(this);
  
  // Hide all content except that corresponding to the clicked link
  $('.tab-content').children().hide().eq(index).show();
  
  // Remove active class from all links except that which was clicked
        $('.node-type-issue-description .info-tabs ul').children().removeClass('selected');
        if ($(this).attr('class') === "tab-0") {
            window.location.hash = ""
        }
        else {
            window.location.hash = $(this).attr('class');
        }
        $(this).addClass('selected');

    });

    if($('body').hasClass('node-type-issue-description') && document.location.hash!='') {
        $('.node-type-issue-description .info-tabs ul li.'+document.location.hash.substr(1)).click();
    }

/*============================================================================================
  Country Page
============================================================================================*/

  // "Filters"
  
  //Visuals
  $('a.graphic').click(function(){
  
    if($('a.graphic').hasClass('active')){
      $('.country-tables .chart').show();
      $('.country-tables .number').hide();
    } else {
      $('.country-tables .chart').hide();
      $('.country-tables .number').show();
    }
  
    $('.country-tables .number').fadeOut(250);
    $('.country-tables .chart').delay(250).fadeIn();
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
  });
  
  $('a.numeric').click(function(){
  
    if($('a.graphic').hasClass('active')){
      $('.country-tables .chart').show();
      $('.country-tables .number').hide();
    } else {
      $('.country-tables .chart').hide();
      $('.country-tables .number').show();
    }
  
    $('.country-tables .number').delay(250).fadeIn();
    $('.country-tables .chart').fadeOut(250);
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
  });
  
  
  //types
  $('a.trend').click(function(){
    $('.visual').find('.active').trigger('click');
  
    $('.country-table.trend').show();
    $('.country-table.peer-set').hide();
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
  });
  
  $('a.peer-set').click(function(){
    $('.visual').find('.active').trigger('click');
  
    $('.country-table.trend').hide();
    $('.country-table.peer-set').show();
    $(this).parent().find('.active').removeClass('active');
    $(this).addClass('active');
  });
  
  
  // Main Toggle
  $('.table-row.EPI .parent').toggle(function(){
    $('.visual').find('.active').trigger('click');
  
    $(this).parent().parent().find('.indicators').slideDown();
    $(this).parent().parent().find('.arrow').addClass('collapsible');
  }, function(){
    $(this).parent().parent().find('.indicators').slideUp();
    $(this).parent().parent().find('.arrow').removeClass('collapsible');
  });
  
  // Indiviudal Issues Toggle
  $('.table-row:not(.EPI) .parent').click(function(){
    $('.visual').find('.active').trigger('click');
    $(this).parent().find('.indicators').slideToggle();
    $(this).find('.arrow').toggleClass('collapsible');
  });
  
  $('.node-type-country .reveal-modal ul').easyListSplitter({ colNumber: 5 });

/*============================================================================================
  Data Explorer
============================================================================================*/
  
  // Fades sides out to indicate which is the active side.
  function filter_by(){
    $('input#edit-country-select-type-custom').prop('checked', false);
    $('input#edit-country-select-type-filter').prop('checked', true);
    
    if ( $("#edit-secondary-wrapper").css('opacity') < 1 ){
      $("#edit-secondary-wrapper").fadeTo( "slow", 1 );
    }
    $("#edit-country-set").fadeTo( "slow", 0.33 );
  }
  
  function filter_custom(){
    $('input#edit-country-select-type-filter').prop('checked', false);
    $('input#edit-country-select-type-custom').prop('checked', true);
    if($("#edit-country-set").css('opacity') < 1 ){
      $("#edit-country-set").fadeTo( "slow", 1 );
    }
    $("#edit-secondary-wrapper").fadeTo( "slow", 0.33 );
  }
  
  // On Page load if the URL is normal, unselect radio buttons
  $(function() {
    
    var de_filter_by = $('#edit-secondary-wrapper');
    var de_custom_set = $("#edit-country-set");
    
    // Looks to see which filter was used to generate the bubble chart
    if ( document.location.href.indexOf('country-select-type=custom') > -1 ) { // A custom set has been chosen
      $(de_filter_by).css('opacity','0.33');
    } else if ( document.location.href.indexOf('country-select-type=filter') > -1 ) { // A filter by set has been chosen
      $(de_custom_set).css('opacity','0.33');
    } else { // No filter has been chosen yet.
      $("#edit-country-select-type input").prop('checked', false);
    }
    
    $(de_filter_by).click(function () { // left side clicked
      filter_by(this);
    });
    
    $(de_filter_by).find('select').each(function(){
      $(this).on('select2-focus' , function () { // left side clicked
        filter_by(this);
      });
    });
    
    $("#edit-select-countries").on('select2-focus' , function () { // right side clicked
      filter_custom(this);
    });

  });

      

  // Dropdown Options
  
  // This shows the option on page load, if the parents is selected
  $(".fieldset-wrapper > .form-wrapper .form-item:first-child select").each(function(){
    if ($(this).val() === ('ten_year_change') || $(this).val() === ('score') ) {
      $(this).parent().parent().find('.form-item  + .form-item').css('display','block');
    }
  });

  // This shows the secondary option if the parent is selected
  $(".fieldset-wrapper > .form-wrapper .form-item:first-child select").change(function(){
    if ($(this).val() === ('ten_year_change') || $(this).val() === ('score') ) {
      $(this).parent().parent().find('.form-item  + .form-item').fadeIn();
    } else {
      $(this).parent().parent().find('.form-item  + .form-item').fadeOut();
    }
  });
  
/*============================================================================================
  Downloads Page
============================================================================================*/

/*
  $('.node-type-downloads-page .views-row').each(function(){
    //var rowHeight = $(this).outerHeight() - 50;
    $(this).find('.description').delay(500).hide();
    
    $(this).find('.trigger').toggle(function () {
      //$(this).css('top',rowHeight);
      $(this).addClass('showing');
      $(this).closest('.views-row').find('.description').slideDown(500);
    }, function () {
      //$(this).css('top', 37);
      $(this).removeClass('showing');
      $(this).closest('.views-row').find('.description').slideUp(500);
    });
    
  });
*/
  
  $('.node-type-downloads-page .category-section').each(function(){
    $(this).find('.trigger.parent').click(function(){
      $(this).toggleClass('showing');
      $(this).parent().find('.items').slideToggle(500);
    });
    
    $(this).find('.items .trigger').click(function(){
      $(this).toggleClass('showing');
      $(this).closest('.views-row').find('.description').slideToggle(500);
    });
  });

/*============================================================================================
 Issue Page
 ============================================================================================*/
$('body.node-type-issue .table-body').css('height','500px').css('overflow','hidden');
$('body.node-type-issue .field-name-issue-table').after('<div class="show-more btn">Show More</div>');
$('.show-more').click(function() {
    // var stopRow = /row-(\d+)/.exec($('.table-row.sticky-stopper').attr('class'))[1];
    // $('.table-row.row-'+stopRow).removeClass('sticky-stopper');
    // stopRow = +stopRow + 10;
    // if ($('.table-row.row-'+(stopRow+1)).length) {
    //    $('.table-row.row-'+stopRow).addClass('sticky-stopper');
    //    $('body.node-type-issue .table-body').css('height',stopRow*50+"px");
    // }
    // else {
        $(this).hide();
        $('body.node-type-issue .table-body').css('height','auto');
        $('.table-row:last-child').addClass('sticky-stopper');
    // }
});

});/*==== End Document Ready */
