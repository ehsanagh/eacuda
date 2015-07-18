
$(document).ready(function(){

    var button = $('.contactButton');

    // disable cache
    button.removeAttr('disabled');
    $('#contactForm').trigger("reset");

    button.click(function(e){

        e.preventDefault();
        e.stopPropagation();

        // disable send message button
        $(this).attr('disabled', 'disabled');

        // get fields value
        var name = $("input#name").val();
        var email = $("input#email").val();
        var message = $("textarea#messageText").val();

        if (name == '') {

            error_handler(button, 'Please Enter Your Name.', 3, 'danger');

        } else if (email == '') {

            error_handler(button, 'Please Enter Your Email Address.', 3, 'danger');

        } else if (validateEmail(email) == false) {

            error_handler(button, 'Please Enter Valid Email Address.', 3, 'danger');

        } else if(message.trim() == '') {

            error_handler(button, 'Please Enter Your Message.', 3, 'danger');

        } else {

            $.ajax({
                url: './mail/sendEmail.php',
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    message: message
                },
                cache: false,
                success: function () {

                    error_handler(button, 'Your Message Was Sent Successfully', 5, 'success');

                    // enable send message button
                    button.removeAttr('disabled');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function () {

                    error_handler(button, 'There is an error while sending your message', 3, 'danger');

                    // enable send message button
                    button.removeAttr('disabled');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        }
    });
});

/**
 *
 * @param email
 * @returns {boolean}
 * @description check if email address is valid or not
 */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 *
 * @param button
 * @param errorMessge
 * @param second
 * @param type
 * @description call this function to show error and hide after a while
 */
function error_handler(button, errorMessge, second, type) {

    button.removeAttr('disabled');
    var errorBody = '<div class="alert alert-' + type + '" role="alert"> ' + errorMessge + ' </div>';
    var form = $('#contactForm');
    form.find('.alert').remove();
    form.prepend(errorBody);

    var time = 0;
    var interval = setInterval(function() {
        console.log(time);
        if (time > (second - 1 )) {

            clearInterval(interval);
            $('#contactForm').find('.alert').slideUp(function(){
                $(this).remove();
            });
        }

        time++;

    },1000);
}