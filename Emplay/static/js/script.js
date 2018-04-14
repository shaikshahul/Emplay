const gst_val_obj = {
    "01": "jammu & kashmir",
    "02": "himachal pradesh",
    "03": "punjab",
    "04": "chandigarh",
    "05": "uttarakhand",
    "06": "haryana",
    "07": "delhi",
    "08": "rajasthan",
    "09": "uttar pradesh",
    "10": "bihar",
    "11": "sikkim",
    "12": "arunachal pradesh",
    "13": "nagaland",
    "14": "manipur",
    "15": "mizoram",
    "16": "tripura",
    "17": "meghalaya",
    "18": "assam",
    "19": "west bengal",
    "20": "jharkhand",
    "21": "odisha",
    "22": "chhattisgarh",
    "23": "madhya pradesh",
    "24": "gujarat",
    "25": "daman & diu",
    "26": "dadra & nagar haveli",
    "27": "maharashtra",
    "29": "karnataka",
    "30": "goa",
    "31": "lakshdweep",
    "32": "kerala",
    "33": "tamil nadu",
    "34": "pondicherry",
    "35": "andaman & nicobar islands",
    "36": "telangana",
    "37": "andhra pradesh" 
}


$(document).ready(function () {
    Object.defineProperty(window, "Cookies", {
        get: function () {
            return document.cookie.split(';').reduce(function (cookies, cookie) {
                cookies[cookie.split("=")[0]] = unescape(cookie.split("=")[1]);
                return cookies
            }, {});
        }
    });
    jQuery.fn.extend({
        CheckIsValidDomain: function (domain) {
            var re = new RegExp(/^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,})$/);
            processed = domain.match(re)
            if (processed !== null) {
                if (processed[0] == domain) {
                    // Materialize.toast("Valid domain ", 1000)
                    $('#orginfo').prop('disabled', false)
                    return true
                }
            }
            Materialize.toast("Invalid domain name", 1000)
            //ele.value = ''
            return false
        }
    })

    $.fn.extend({
        ValidateGSTForState: function (ele, state) {
            let gst = ele.value
            if (gst && state){
                let gst_startswith = gst.substring(0,2)
                let valid_state = gst_val_obj[gst_startswith]
                if (valid_state){
                    if ( state.toLowerCase() == valid_state){
                        $(ele).removeClass('invalid').addClass('valid')
                        return true
                    }
                    else{
                        $(ele).removeClass('valid').addClass('invalid')
                        Materialize.toast(`gst code : ${gst} is not valid for state: ${state}`, 7000)
                        return false
                    }
                } else {
                    $(ele).removeClass('valid').addClass('invalid')
                    Materialize.toast(`gst code : ${gst} is not valid`, 7000)
                    return false
                }
            }else{
                $(ele).removeClass('valid').addClass('invalid')
                return false
            }
        }
    })

    $.fn.extend({
        SideBar: function (action) {
         if (action == 'hide'){
            $('#content-placeholder').removeClass('margin-278').addClass('margin-70')
            $('#right-nav').addClass('hide-sidebar-text')
         }else{
            $('#content-placeholder').addClass('margin-278').removeClass('margin-70')
            $('#right-nav').removeClass('hide-sidebar-text')
         }
        }
    });
    $.fn.extend({
        ValidatePassword: function (ele) {
            var passwd = ele.value
            
            if (!/(?=.{8,})/.test(passwd)) {
                // $("label[for='usrpassword']").attr('data-error','Minimum length 8 characters')
                // Materialize.toast("Minimum length 8 characters", 5000)
                $(ele).addClass('invalid').removeClass('valid')
                return "Minimum 8 characters and must contain a capital, special, numeric character"
            }

            if (!/(?=.*[a-z])/.test(passwd)) {
                // $("label[for='usrpassword']").attr('data-error','Password must have one small letter')
                // Materialize.toast("Password must have one small letter", 5000)
                $(ele).addClass('invalid').removeClass('valid')
                return "Minimum 8 characters and must contain a capital, special, numeric character"
            }

            if (!/(?=.*[A-Z])/.test(passwd)) {
                // $("label[for='usrpassword']").attr('data-error','Password must have one capital letter')
                // Materialize.toast("Password must have one capital letter", 5000)
                $(ele).addClass('invalid').removeClass('valid')
                return "Minimum 8 characters and must contain a capital, special, numeric character"
            }

            if (!/(?=.*[#$@^!%*?&])/.test(passwd)) {
                // $("label[for='usrpassword']").attr('data-error','Password must have one special character')
                // Materialize.toast("Password must have one special character", 3000)
                $(ele).addClass('invalid').removeClass('valid')
                return "Minimum 8 characters and must contain a capital, special, numeric character"
            }
            $(ele).removeClass('invalid').addClass('valid')
            return true
            
        }
    });

    $.fn.extend({
        StartEndDate: function (st_id, en_id) {
            var st_date = $('#'+st_id).pickadate(),
            st_dt = st_date.pickadate('picker')
      
          var en_date = $('#'+en_id).pickadate(),
            en_dt = en_date.pickadate('picker')
      
          if (st_dt.get('value')) {
            en_dt.set('min', st_dt.get('select'))
          }
          if (en_dt.get('value')) {
            st_dt.set('max', en_dt.get('select'))
          }

          st_dt.on('set', function (event) {
            if (event.select) {
              en_dt.set('min', st_dt.get('select'))
            }
            else if ('clear' in event) {
              en_dt.set('min', false)
            }
          })
          en_dt.on('set', function (event) {
            if (event.select) {
              st_dt.set('max', en_dt.get('select'))
            }
            else if ('clear' in event) {
              st_dt.set('max', false)
            }
          })
        }
    })

    $.fn.extend({
        ValidateForm: function (form_ele) {
            var status = true
            var focused = false
            var all_elements = $(form_ele).find('input,select,textarea')
            all_elements.each(
                (i, elem) => {
                    if (elem.classList.contains('select-dropdown')){}
                    else if (!elem.validity.valid) {
                        status = false
                        if (elem.type.includes('select')) {
                            $(elem).addClass('validate invalid').change()
                        }
                        else {
                            $(elem).addClass('validate invalid').focus()
                        }
                        return status
                    } else {
                        $(elem).addClass('validate valid')
                    }
                }
            )
            return status
        }
    });

    //check for the device is ios then changing cursor position
    /ip/i.test(navigator.userAgent) && $('*').css('cursor', 'pointer');
    // side navigation panel hide show accordin to widht
    function check_width() {
        if ($(window).width() < 1024) {
            $(".side-navBar").addClass("hide-sidebar-text");
        } else {
            $(".side-navBar").removeClass("hide-sidebar-text");
        }
        if ($(window).width() > 1023) {
            $("#main-body .left-container")
                .removeClass("margin-70")
                .addClass("margin-278");
        }
        if ($(window).width() < 600) {
            $(".side-navBar").removeClass("hide-sidebar-text");
        }
    }
    //set and check for marquee width
    function marquee_pos(label) {
        var window_width = $(window).width();
        var label = label || window_width > 600 ? 195 : 150;
        var right_width = window_width - label;
        $(".n-right").width(right_width);
        $('.marquee').marquee();
    }
    check_width();
    marquee_pos();
    $(window).on("resize", function () {
        check_width();
        marquee_pos();
    });
    // side navigation panel hide show based on width
    var flag = false;
    function side_bar() {
        if ($(window).width() > 600) {
            var isSidebarTextVisible = $(".hide-sidebar-text").is(":visible");
            if (isSidebarTextVisible) {
                $(".side-navBar").removeClass("hide-sidebar-text");
                if ($(window).width() > 910) {
                    $("#main-body .left-container").addClass("margin-278");
                    $("#main-body .left-container").removeClass("margin-70");
                }
            } else {
                $(".side-navBar").addClass("hide-sidebar-text");
                $("#main-body .left-container").removeClass("margin-278")
                    .addClass("margin-70");
            }
        }
        else {
            if (flag) {
                $(".side-navBar").removeClass("sideBarExpanded");
                $(".side-navBar ul").animate({ width: '0' }, 200);
                $(".overlay").removeClass("prevent-scroll");
                flag = false;
            } else {
                $(".side-navBar ul").animate({ width: '278' }, 200);
                $(".overlay").addClass("prevent-scroll");
                $(".scroll-div ul").css("overflow", "hidden");
                flag = true;
            }
        }
    }
    // scroll bar above 992px width
    if ($(window).width() > 992) {
        $(".side-navBar").niceScroll({
            autohidemode: false,
            cursorcolor: "#fff",
            cursorborder: "1px solid #424242"
        });
        $(".scroll-div ul").niceScroll({
            cursorcolor: "#FF7043",
            cursorwidth: "8px",
            cursorborderradius: "0px",
            autohidemode: false,
            nativeparentscrolling: true,
            cursorfixedheight: 16,
            disablemutationobserver: false
        });
        $(".scroll-y-table").niceScroll({
            cursorcolor: "#FF7043",
            cursorwidth: "8px",
            cursorfixedheight: 16,
            cursorborderradius: "0px",
            autohidemode: false
        });
    }
    $(".hamburger").on("click", function (e) {
        e.preventDefault();
        side_bar();
        $(".scroll-div ul").getNiceScroll().resize();
        $(".side-navBar").getNiceScroll().resize();
        // on nav menu hide add active parent li
        // $(".side-navBar .nav-ul li ul li.active").parent().toggle().parent().toggleClass("active");
    });
    // $(".nav-ul li a").on("click", function(e) {
    //     e.preventDefault();
    //     var li = $(this).parent();
    //     var isSubMenuAvail = li.find("ul").hasClass("sub-list");
    //     if($(".nav-ul").width() == 70 ) {
    //         $(".hamburger").triggerHandler("click");
    //         setTimeout(function() {
    //                 $(".hamburger").trigger("click");
    //             }, 2000);
    //     }
    //     else if(isSubMenuAvail) {
    //         li
    //         .find("ul")
    //         .toggle(200)
    //         .end()
    //         .siblings()
    //         .removeClass("active");

    //     } else {
    //         $(".side-navBar .nav-ul li.active, .nav-ul li li.active").removeClass("active");
    //         li
    //         .addClass("active")
    //         .siblings()
    //         .removeClass("active")
    //         .end()
    //         .parent()
    //         .find("li ul")
    //         .hide(200);
    //     }
    // });
    // $('.sprite-2').on("click", function (e) {
    //     $(this).closest('.card-panel').find('.view-delete-contact').show();
    // });
    $(document).on("click", function (e) {
        var currentClassName = e.target.classList[2];
        switch (currentClassName) {
            case 'more-options':
                $(e.target).closest('.card-panel').find('.view-delete-contact').fadeIn(200);
                break;
            default:
                $('.view-delete-contact').fadeOut(200);
        }
    })

    $('select').material_select();
    window.picker = $('.datepicker').pickadate({

        selectYears: 16, // Creates a dropdown of 15 years to control year
        format: 'yyyy-mm-dd'
    });
    $('ul.tabs').tabs();
    $(".check-head #filled-in-box").click(function () {
        console.log("click");
    })
});

$(window).on("load", function (e) {
    $('.pl').fadeOut()
})

$.fn.extend({
    ValidateUsername: function (ele) {
        var username = ele.value

        if (/[^a-zA-Z0-9_\/]/.test(username)) {
            $(ele).addClass('invalid')
            return "Special characters are not allowed."
        }
        $(ele).removeClass('invalid').addClass('valid')
        return true
        
    }
});
