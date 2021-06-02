// ----------------------------------------------------------COLLECTIONS ARRAY, OBJECTS AND VARIABLES --ir
  $(document).ready(function() {
    // CALL SERVICE WORKER IF AVAIBLE --ir
    if ("serviceWorker" in navigator) {
     window.addEventListener("load", function() {
       navigator.serviceWorker
         .register(window.location.origin + "/invoice/serviceWorker.js")
         .then(res => console.log("service worker registered"))
         .catch(err => console.log("service worker not registered", err));
     });
    }
    
    // CALL MY MAIN CONTENTS --ir
    $('#mySlideBar').load(urlOrigin + "/mySlideBar.html")

    $('#myHeader').load(urlOrigin + "/myHeader.html", function() {
      // CHANGE ICON WHEN HOVER INTO COLLAPSE SIDEBAR ICON --ir
      $("#collapse-sidebar-icon").hover(function(){
        $(this).find('i').removeClass('fa fa-align-left').addClass('fa fa-align-justify')
        }, function(){
        $(this).find('i').removeClass('fa fa-align-justify').addClass('fa fa-align-left')
      });
    })

    $.getJSON(urlOrigin + "/data/sub-menu.json", function(result) {
      menus = result['menus']
      $('#mySidebar').empty().append('<section class="logo"></section>')
      $('#mySidebar section').append('<a href="#" class="nav-logo"></a>')
      $('#mySidebar section a').append('<img src="assets/logo/logo.png" class="img-logo">')
      $('#mySidebar').append('<ul class="nav-bar">')
      $.each(menus, function(key, value) {
        activeNav = ''
        if(key == "dashboard"){
          activeNav = "active-nav"
          $.ajax({
            beforeSend  : function() {
              $('#myContent').empty().append('<section class="loading-content">Loading</section>')
            },complete   : function() {
              $('#myContent').empty()
              addStylesheet("stylesheet-"+key, urlOrigin + "/content/" + key + "/" + key + ".css", "menu")
              addScripts("script-"+key, urlOrigin + "/content/" + key + "/" + key + ".js", "menu")
              $('#myContent').load(urlOrigin + "/content/" + key + "/" + key + ".html")
            }
          })
          $('title').html(firstUppercase(value['name']))
          $('#mySubMenu').css('top', '-8rem')
          $('#myContent').css('margin-top', '-2.6rem')
        } 
        $('#mySidebar ul').append('<li class="nav-item ' + activeNav + '"></li>')
        $('#mySidebar ul li:last').append('<a href="#" class="nav-link" id="nav-' + key + '"></a>')
        $('#mySidebar ul li:last a').append('<i class="fa fa-' + value['icon'] + ' fa-lg"></i>')
        $('#mySidebar ul li:last a').append('<span class="txt-item">' + value['name'] + '</span>')
      })

      $('#mySubMenu').append('<nav id="sub-menu-list"><ul class="myFlex"></ul></nav>')
      $('#mySubMenu').append('<button id="hide-sub-menu" class="button-xs" onclick="hideSubMenu(this)">Show</button>')
      
      $(".nav-item").on("click", function() {
        // REMOVE ACTIVE CLASS NAV AND STYLESHEET AND SCRIPT ON MODULES BEFORE --ir
        menuBefore = $(this).parent().find('.active-nav a').attr('id').replace('nav-','')
        // $('#stylesheet-'+menuBefore).remove()
        // $('#script-'+menuBefore).remove()
        $('.stylesheet-menu').remove()
        $('.script-menu').remove()
        $('.nav-item').removeClass('active-nav')
        
        // CHANGE TITLE AND ADD CLASS ACTIVE NAV --ir
        $(this).addClass('active-nav')
        menu = $(this).find('a').attr('id').replace('nav-','')
        $('title').html(firstUppercase(menu))

        // IF MENU HAVE SUB MENU THEN PROCCED TO GET SUB MENU, IF ELSE, JUST SLIDE UP NAVIGATION SUB MENU AND GET CONTENT FROM MAIN MENU --ir
        if(menu == "logout"){alert("LOG OUT!"); return false}
        else if(!menus[menu]['sub-menus']){
          // REMOVE ACTIVE CLASS SUB MENU AND STYLESHEET AND SCRIPT ON MODULES BEFORE --ir
          subMenuBefore = $('.active-sub-menu a').attr('id').replace('sub-menu-','')
          // $('#stylesheet-' + subMenuBefore).remove()
          // $('#script-' + subMenuBefore).remove()
          $('.stylesheet-menu').remove()
          $('.script-menu').remove()

          // SET ACTIVE CLASS, MODULES STYLESHEET AND SCRIPT ON SELECTED MENU--ir
          $.ajax({
            beforeSend  : function() {
              $('#myContent').empty().append('<section class="loading-content">Loading</section>')
            },complete   : function() {
              $('#myContent').empty()
              addStylesheet("stylesheet-"+menu, urlOrigin + "/content/" + menu + "/" + menu + ".css", "menu")
              addScripts("script-"+menu, urlOrigin + "/content/" + menu + "/" + menu + ".js", "menu")
              $('#myContent').load(urlOrigin + "/content/" + menu + "/" + menu + ".html")
            }
          })

          $('#mySubMenu').animate({top: '-8rem'},200,function() {
            $('#myContent').css('margin-top', '-2.6rem')
          })
        }else{
          $.ajax({
            // SLIDE UP FIRST AND EMPTY ALL SUB MENU --ir
            beforeSend    : function() {
              $('#mySubMenu').animate({top: '-8rem'}, 300, function() {
                $('#mySubMenu nav ul').empty()
              })
              $('#myContent').empty().append('<section class="loading-content">Loading</section>')
            // AND SMOOTHLY SLIDE DOWN AND APPEND ALL SUB MENU --ir
            },complete    : function() {
              $('#mySubMenu').animate({top: '0'}, 200, function() {
                $('#myContent').css('margin-top', '0')
                $.each(menus[menu]['sub-menus'], function(key, value) {
                  $('#mySubMenu nav ul').append('<li class="sub-menu"></li>')
                  $('#mySubMenu ul li:last').append('<a href="#" class="sub-menu-link" id="sub-menu-' + key + '"></a>')
                  $('#mySubMenu ul li:last a').append('<i class="fa fa-' + value['icon'] + ' fa-sm"></i>')
                  $('#mySubMenu ul li:last a').append('<span class="txt-sub-menu">' + value['name'] + '</span>')
                })

                // SET SUB MENUS BASED ON SELECTED MENU --ir
                $('.sub-menu:first').addClass('active-sub-menu')
                $(".sub-menu").on("click", function() {
                  // REMOVE ACTIVE CLASS SUB MENU AND STYLESHEET AND SCRIPT ON MODULES BEFORE --ir
                  subMenuBefore = $(this).parent().find('.active-sub-menu a').attr('id').replace('sub-menu-','')
                  // $('#stylesheet-' + subMenuBefore).remove()
                  // $('#script-' + subMenuBefore).remove()
                  $('.stylesheet-menu').remove()
                  $('.script-menu').remove()
                  $('.sub-menu').removeClass('active-sub-menu')
                  
                  // SET ACTIVE CLASS, MODULES STYLESHEET AND SCRIPT ON SELECTED MENU--ir
                  $(this).addClass('active-sub-menu')
                  subMenu = $(this).find('a').attr('id').replace('sub-menu-','')
                  $.ajax({
                    beforeSend  : function() {
                      $('#myContent').empty().append('<section class="loading-content">Loading</section>')
                    },complete   : function() {
                      $('#myContent').empty()
                      $('#myContent').load(urlOrigin + "/content/" + subMenu + "/" + subMenu + ".html")
                      addStylesheet("stylesheet-"+subMenu, urlOrigin + "/content/" + subMenu + "/" + subMenu + ".css", "menu")
                      addScripts("script-"+subMenu, urlOrigin + "/content/" + subMenu + "/" + subMenu + ".js", "menu")
                    }
                  })
                })
                $('.sub-menu:first').trigger('click')
              })
            }
          })
        }
      })
    })
  })

  // VARIABLES --ir
  var urlOrigin = window.location.origin + "/invoice"

  // STYLESHEETS --ir 
  allTheStylesheets = {
   "styleesheets-favicon"     : urlOrigin + "" + '/assets/logo/favicon.ico',
   "styleesheets-myCss"       : urlOrigin + "" + '/css/myCss.css',
   "styleesheets-sweetalert"  : urlOrigin + "" + '/css/plugins/sweetalert.css',
   "styleesheets-fa"          : urlOrigin + "" + '/css/plugins/fontawesome-free-5/css/all.min.css',
   "styleesheets-nunito-sans" : 'https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,600,700,800',
   "styleesheets-open-sans"   : 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700&display=swap',
   "styleesheets-poppins"     : 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Roboto:wght@100;300;400;500;700;900&display=swap',
  }
  
  // SCRIPTS --ir
  allTheScripts = {
    "script-sweetalert" : urlOrigin + "" + '/js/plugins/sweetalert.min.js',
  }

// ----------------------------------------------------------ON READY FUNCTIONS --ir
  // CALL HEADER AND ITS STYLESHEETS --ir
  $.each(allTheStylesheets, function(key, value) {
    addStylesheet(key, value)
  })
  
  // CALL FOOTER AND ITS SCRIPTS --ir
  $.each(allTheScripts, function(key, value) {
    addScripts(key, value)
  })

// ----------------------------------------------------------GENERAL FUNCTIONS --ir
  function collapseSidebar(el) {
    if(el.checked == true){
      $('#collapse-sidebar-icon i').removeClass('fa fa-align-left').addClass('fa fa-arrow-right')
      $('.txt-item').css('display', 'none')
      $('#mySidebar').css('width', '4rem')
      $('#mySidebar section a').empty('<img src="assets/logo/logo.png" class="img-logo">').append('<img src="assets/logo/favicon.ico" class="img-logo">')
      $('.nav-item').css('width', '3rem')
      $('.nav-link').css('grid-template-columns', 'auto')
    }else{
      $('#mySidebar section a').empty('<img src="assets/logo/favicon.ico" class="img-logo">').append('<img src="assets/logo/logo.png" class="img-logo">')
      $('#collapse-sidebar-icon i').removeClass('fa fa-arrow-right').addClass('fa fa-align-left')
      $('.txt-item').css('display', 'block')
      $('#mySidebar').css('width', '12rem')
      $('.nav-item').css('width', 'unset')
      $('.nav-link').css('grid-template-columns', '3rem auto')
    }
  }

  function checkSlideBar(el) {
    if(el.checked == true){
      $('#mySlideBar').css('right', '0px')
    }else{
      $('#mySlideBar').css('right', '-250px')
    }
  }

  function closeSlideBar() {
    $('#mySlideBar').css('right', '-250px')
  }

  function hideSubMenu(el) {
    if($(el).hasClass('button-active')){
      // $('#mySubMenu nav').show()
      $('#mySubMenu').css('top', '0')
      $('#myContent').css('margin-top', '0')
      // $('#mySubMenu').css('grid-template-rows', 'auto auto')
      $(el).removeClass('button-active')
    }else{
      // $('#mySubMenu nav').hide()
      $('#myContent').css('margin-top', '-2.6rem')
      $('#mySubMenu').css('top', '-2.6rem')
      // $('#mySubMenu').css('grid-template-rows', 'auto')
      $(el).addClass('button-active')
    }
    
  }

  // DYNAMICALLY ADDING STYLESHEETS TO MY HTML (JAVASCRIPT STYLE) --ir
  function addStylesheet(key,url,menu) {
    var link  = document.createElement('link')
    link.href = url
    link.rel  = 'stylesheet'
    link.id   = key
    link.className = ''
    if(menu) link.className = "stylesheet-menu"
    document.getElementsByTagName('head')[0].appendChild(link)
  }
  
  // DYNAMICALLY ADDING SCRIPTS TO MY HTML (JQUERY STYLE) --ir
  function addScripts(key,url,menu) {
    className = ""
    if(menu) className = "class='script-menu'"
    $("<script id='"+key+"' src='" + url + "' " + className + "></script>").insertAfter('script:last')
  }

  // START TIME --ir
  function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('.realTimeRun').html(h + ":" + m + ":" + s)
    var t = setTimeout(startTime, 500);
    // alert(h)
  }

  // CHECKING IF TIME IS LESS THEN ZERO --ir
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  // SET PLUGIN SELECT 2 --ir
  function setSelectOnCol(elSelect, width) {
    $(elSelect).select2();
    $(elSelect).parent().find('.select2').css('width', width);      
  }

  // SET GENERAL SEARCH --ir
  function setSearch(el, idTable) {
    el.append('<label for="search-' + idTable + '">&nbsp;</label>')
    el.append('<input id="search-' + idTable + '" placeholder="Search here..." type="text">')
    el.append('<i class="fa fa-search"></i>')

    el.find("#search-" + idTable).bind('keyup', function(){
      filter = this.value.toUpperCase()
      console.log(filter)
      return showSearchResult(idTable, filter)
    });
  }

  // SHOW TABLE RESULT BASED ON SEARCH FILTER --ir
  function showSearchResult(idTable, filter) {
    table = $('#' + idTable)
    table.find('tbody tr').hide()

    table.find('tbody th input, tbody td input, tbody td select :selected, tbody th, tbody td').each(function name(i, obj) {
      if($(obj).is('input')) valueField = $(obj).val()
      else valueField = $(obj).text()
      row = $(obj).closest('tr')
      if(valueField.toUpperCase().indexOf(filter) > -1) {row.show();}
    })
  }


  // SET BUTTONS FILTER COUNT --ir
  function setButtonFilterCount(el, data, func) {
    el.append('<span></span>')
    el.append('<section class="myFlex"></section>')
    $.each(data, function(key, value) {
      active = ''
      if(key == "all") active = "button-active"
      el.find('section').append('<button value="' + key + '" class="button-sm ' + active + '">' + value + '</button>')
    })

    // BUTTON FILTER COUNT ROW ON CLICK --ir
    filterButtons = el.find('section button')
    filterButtons.on('click', function() {
      filterButtons.removeClass('button-active')
      $(this).addClass('button-active')
      params = [$(this).val()]
      setTableLists(func, params)
    })

    // SET TABLE ON DEFAULT FILTER BY TRIGGERING SELECTED BUTTON ON CLICK --ir
    el.find('section .button-active').trigger('click')
  }

  // SET ROWS PER PAGE FOR SELECTED TABLE --ir
  function setRowsPerPage(el, idTable) {
    el.append('<select id = "rpp-' + idTable + '"></select><span>rows per page</span>');
    noRow = [5, 10, 25, 50, 75, 100]
    for(i = 0;i < noRow.length; i++) {
      if(i == 0) selected = "selected"; else selected = '';
      el.find('select').append('<option value = "'+noRow[i]+'" '+selected+'>'+noRow[i]+'</option>')
    }

    elFooter = el.closest('.myCard').find('.myCard-footer .pagination')
    el.find('select').on('change', function(){
      rowsShown = $(this).find(':selected').val()
      setPagination(elFooter, rowsShown, idTable)
    });

    // TRIGGER FOR FIRST LOAD --ir
    el.find('select').trigger('change')
  }

  // SET PAGINATIONS BASED ON SELECTED ROWS ON PAGE ABOVE --ir
  function setPagination(el, rowsShown, idTable) {
    el.empty(); table = $('#' + idTable)
    var rowsTotal = table.find('tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
      var pageNum = i + 1;
      el.append('<a class="button button-xs" rel="'+i+'">'+pageNum+'</a> ');
    }
    table.find('tbody tr').hide();
    table.find('tbody tr').slice(0, rowsShown).show();
    
    el.find('a:first').addClass('active');
    el.find('a').on('click', function(){
      el.find('a').removeClass('active');
      $(this).addClass('active');
      var currPage  = $(this).attr('rel');
      var startItem = parseInt(currPage)  * parseInt(rowsShown);
      var endItem   = parseInt(startItem) + parseInt(rowsShown);
      table.find('tbody tr').css('opacity','0.0')
                            .hide()
                            .slice(startItem, endItem)
                            .css('display','table-row')
                            .animate({opacity:1}, 300);
       
      // INFO SHOWING OF DATA COUNT ON FOOTER --ir
      if(endItem > rowsTotal) endItem = rowsTotal
      el.closest('.myCard-footer').find('.info-table-data-count').empty().append("Showing " + (startItem+1) + " to " + endItem + " of " + rowsTotal + " GRN")
    });
    
    // TRIGGER FOR FIRST LOAD --ir
    el.parent().find('.active').trigger('click')
  }

  // SET BASIC HEADER FOR TABLE --ir
  function setBasicHeaderFooterTable(el, data, sect) {
    el.append('<tr></tr>');
    $.each(data, function(key, value) {
      el.append('<th class="' + sect + '-' + key + '">' + value + '</th>')
    })
  }
  
  // LISTS OF ALL FUNCTION FOR SET TABLE --ir
  function setTableLists(func, params) {
    if(func == "event") setTableEvents(params[0])
  }

  // SHOW AND HIDE PASS --ir
  $("#showPass").mousedown(function(){
    $(this).removeClass('button-default').addClass('button-info').find('i').removeClass('fa-eye-slash').addClass('fa-eye')
    $('#newPass, #newPassCheck').prop('type', 'text')
  }).mouseup(function(){
    $(this).removeClass('button-info').addClass('button-default').find('i').removeClass('fa-eye').addClass('fa-eye-slash')
    $('#newPass, #newPassCheck').prop('type', 'password')
  }).mouseout(function(){
    $(this).removeClass('button-info').addClass('button-default').find('i').removeClass('fa-eye').addClass('fa-eye-slash')
    $('#newPass, #newPassCheck').prop('type', 'password')
  });

  // PAD TWO INTO INT --it
  function padTwo(n) {
    if(n.toString().length == 1) n = ("0" + n)
    return n
  }

  // PAD THREE INTO INT --it
  function padThree(n) {
    if(n.toString().length == 2) n = ("0" + n)
    else if(n.toString().length == 1) n = ("00" + n)
    return n
  }

  // CONVERT STRING INTO TITLE CASE --ir
  function firstUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  // CONVERT INT INTO CHAR --ir
  function intToChar(no) {
    return String.fromCharCode(65 + no)
  }

  // CHECK PARAM IS LETTER OR NOT --ir
  function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase()
  }

  // CONVERT UNDEFINED INTO BLANK --ir
  function undefinedToBlank(value) {
    if(value) return value
    else return ""
  }

  // CONVERT UNDEFINED INTO ZERO --ir
  function undefinedToZero(value) {
    if(value) return value
    else return 0
  }

  // CONVERT NULL INTO DASH --ir
  function nullToDash(value) {
    if(value) return value
    else return "-"
  }

  // CONVERT INTO RP FORMAT --ir
  function rpFormat(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // FUNCTION WAIT --ir
  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  // CONVERT FORMAT DATE INTO YMD FORMAT --ir
  function formatDateYMD(date) {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    seconds = '' + d.getSeconds(),
    minutes = '' + d.getMinutes(),
    hour = '' + d.getHours();
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;

    date = [year, month, day].join('-');
    time = [hour, minutes, seconds].join(':');
    
    return [date, time].join(' ')
  }

  // GET DAYS IN MONTH --ir
  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  // GET NUMBER OF DAYS --ir
  function getNumberOfDays(fullDate) {
    currentDate = new Date()
    if(currentDate.getMonth() == fullDate.getMonth() && currentDate.getFullYear() == fullDate.getFullYear()) numberOfDays = fullDate.getDate()
    else numberOfDays = daysInMonth((fullDate.getMonth()+1), fullDate.getFullYear())
    return numberOfDays
  }

  // GET PERIODE BEFORE --ir
  function getPeriodeBefore(fullDate) {
    if(fullDate.getMonth() == 0) periodeBefore = "12-"+(parseInt(fullDate.getFullYear())-1)
    else periodeBefore = padTwo((fullDate.getMonth()))+"-"+(parseInt(fullDate.getFullYear()))

    return periodeBefore
  }

  // GET STYLES ICON BASED ON COLOR --ir
  function getIcon(icon) {
    if(icon == "check")               style='<i class="fa fa-check-circle fa-lg"       style="color:dodgerblue"></i>'
    else if(icon == "check2")         style='<i class="fa fa-check-circle fa-lg"       style="color:var(--btn-warning)"></i>'
    else if(icon == "wrench")         style='<i class="fa fa-wrench fa-lg"             style="color:var(--btn-info)"></i>'
    else if(icon == "wrench2")        style='<i class="fa fa-wrench fa-lg"             style="color:var(--btn-warning)"></i>'
    else if(icon == "warning")        style='<i class="fa fa-exclamation-circle fa-lg" style="color:yellow"></i>'
    else if(icon == "times")          style='<i class="fa fa-times-circle fa-lg"       style="color:tomato"></i>'
    else if(icon == "times2")         style='<i class="fa fa-times-circle"             style="color:white"></i>'
    else if(icon == "upRed")          style='<i class="fa fa-arrow-circle-up fa-lg"    style="color:tomato"></i>'
    else if(icon == "downGreen")      style='<i class="fa fa-arrow-circle-down fa-lg"  style="color:green"></i>'
    else if(icon == "lock")           style='<i class="fa fa-lock"  ></i>'
    else if(icon == "unlock")         style='<i class="fa fa-unlock"></i>'
    else style=''
  
    return style
  }

  // GET BACKGROUND AND TEXT COLOR --ir
  function getStyle(color) {
    if(color == "blue") style='style = "background:blue; color:white;"'
    else if(color == "orange") style='style = "background:orange; color:white;"'
    else if(color == "red") style='style = "background:red; color:white;"'
    else style=''

  }

  // CONVERT THOUSAND TO K FORMAT --ir
  function thousandToK(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
  }

// ----------------------------------------------------------STYLES FUNCTIONS --ir




