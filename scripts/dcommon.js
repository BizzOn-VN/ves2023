var App = App || {};

//---MAIN----
jQuery(function () {
    App.Dev.contactFormValidate();
    App.Dev.getCurrentDate();
});

//--All site
App.Dev = function(){
    var flag = 1;

    var getCookie = function(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    let conversion_id;
    var getTrackData = function() {
        let tracking_id = getCookie('_aff_sid');

        return {
        conversion_id: conversion_id,
        tracking_id: tracking_id
        }
    }

    var trackUser = function() {
        let data = getTrackData();

        jQuery.ajax({
            url: "post.php",
            type: "post",
            dataType:'json',
            data: data,
            success: function (response) {
                console.log(response);
                // You will get response from your PHP page (what you echo or print)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    }

    var register = function(){
        if (jQuery('form#ggcontact').valid() && flag) {
            var data = jQuery('form#ggcontact').serialize();
            console.log(data);
            jQuery('#gg-submit').val('Đang gửi...');
            
            flag = 0;

            jQuery.ajax({
                type : 'GET',
                url : 'https://script.google.com/macros/s/AKfycbzg6bjO7xuT8s95psdN3C-ROeUswnCZV3CzpP3DsiZfnl9ne0o_nJDrBenUp95cnh4/exec',
                dataType:'json',
                crossDomain : true,
                data : data,
                success : function(data)
                {
                    if(data == 'false')
                    {
                        alert('ERROR, Please try again later!');
                    }else{
                        flag = 1;
                        jQuery('#gg-submit').val('Hoàn tất đăng ký');
                        
                        /* if(data.result == 'PHONE_EXIST')
                        {
                            alert('Số điện thoại của bạn đã được đăng ký. \r\nChúng tôi sẽ liên hệ lại với bạn.');
                            return;
                        } */

                        if (data.result == "success") {
                            dataLayer.push({'event': 'gtm_event_dangKyThanhCong'});
                            jQuery('form#ggcontact')[0].reset();
                            $.fancybox.close();
                            $("#popup-success").fancybox().trigger('click');
                        }
                    }
                }
            });
        }
    }

    var contactFormValidate = function(){

        var contactForm = jQuery('form#ggcontact');
        if (contactForm.length < 1) {
            return;
        }

        jQuery.validator.addMethod("validatePhone", function (value, element) {
            var flag = false;
            var phone = value;
            phone = phone.replace('(+84)', '0');
            phone = phone.replace('+84', '0');
            phone = phone.replace('0084', '0');
            phone = phone.replace(/ /g, '');
            if (phone != '') {
                var firstNumber = phone.substring(0, 3);
                var validNumber = ["099","095","092","086","088","096","097","098","032","033","034","035","036","037","038","039","089","090","093","070","079","077","076","078","091","094","083","084","085","081","082","092","056","058"];
                if ((jQuery.inArray(firstNumber,validNumber)!='-1') && phone.length == 10) {
                    if (phone.match(/^\d{10}/)) {
                        flag = true;
                    }
                }
            }
            return flag;
        }, "Vui lòng nhập đúng định dạng");

        contactForm.validate({
            ignore: "",
            rules: {
                'hoTen': {
                    required: true,
                },
                'phone': {
                    required: true,
                    validatePhone:true,
                },
                'email': {
                    required: true,
                    email: true
                },
                'donVi': {
                    required: true
                }
            },
            messages: {
                'hoTen': {
                    required: "Vui lòng nhập họ tên"
                },
                'phone': {
                    required:"Vui lòng nhập số điện thoại",
                },
                'email': {
                    required: "Vui lòng nhập email",
                    email: "Email không đúng định dạng"
                },
                'donVi': {
                    required: "Vui lòng nhập tên đơn vị"
                }
            },
            errorElement : 'p',
            errorClass: 'error',
            errorPlacement: function(error, element) {

                error.insertAfter(element);

            },
            highlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').addClass('error');
            },
            unhighlight: function (element, errorClass) {
                jQuery(element).closest('.form-group').removeClass('error');
            },
        });
    }

    var getCurrentDate = function() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        
        $('#current-date').val(today);
    }

    var chonHangVe = function(hangve) {
        dataLayer.push({'event': 'gtm_event_openPopup'});
        console.log(hangve);
        $('#hang-ve').val(hangve);

        switch(hangve) {
            case "Onsite": $('#hv-name').text("Vé " + hangve); $('#hv-desc').text("Xem triển lãm và tham dự trực tiếp tại sự kiện"); $('#hv-price').text("500.000đ"); $('#hv-money').text("500,000đ");  break;
            case "Virtual": $('#hv-name').text("Vé " + hangve); $('#hv-desc').text("Xem lại toàn bộ các video phiên thảo luận và workshop của sự kiện"); $('#hv-price').text("500.000đ"); $('#hv-money').text("500,000đ"); break;
            case "All Access": $('#hv-name').text("Vé " + hangve); $('#hv-desc').text("Bao gồm tất cả các quyền lợi xem triển lãm, tham dự trực tiếp và xem video"); $('#hv-price').text("800.000đ"); $('#hv-money').text("800,000đ"); break;
        }
    }

    var copyToClipboard = function(num) {
        var $temp = $("<input>");
        $("body").append($temp);
        if (num == 1) {
            $temp.val($("#bank-number").text()).select();
        }

        if (num == 2) {
            $temp.val($("#sms-phonenumber").text()).select();
        }
        
        document.execCommand("copy");
        $temp.remove();
    }

    var phoneChange = function() {
        var phone = $("#phone").val();
        phone = phone.replace('(+84)', '0');
        phone = phone.replace('+84', '0');
        phone = phone.replace('0084', '0');
        phone = phone.replace(/ /g, '');
        if (phone != '') {
            var firstNumber = phone.substring(0, 3);
            var validNumber = ["099","095","092","086","088","096","097","098","032","033","034","035","036","037","038","039","089","090","093","070","079","077","076","078","091","094","083","084","085","081","082","092","056","058"];
            if ((jQuery.inArray(firstNumber,validNumber)!='-1') && phone.length == 10) {
                if (phone.match(/^\d{10}/)) {
                    console.log(phone);
                    $('#sms-phonenumber').text("VES23_" + phone);
                }
            }
        }
    }

    return {
        register: register,
        contactFormValidate: contactFormValidate,
        getCurrentDate: getCurrentDate,
        chonHangVe: chonHangVe,
        copyToClipboard: copyToClipboard,
        phoneChange: phoneChange
    };

}();    
//--End All site