$("#loginPost").submit(function(e){
    e.preventDefault();
    var FINAL_URL = root + '/post-login';

    /*------------------------------------------
    --------------------------------------------
    Add Loading Spinner to Button
    --------------------------------------------
    --------------------------------------------*/
    $(".loginBtn").prepend('<i class="fa fa-spinner fa-spin"></i>');
    $(".loginBtn").attr("disabled", 'disabled');

    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });

    $.ajax({
        url: FINAL_URL,
        type: "POST",
        data: {
            email: $("input[name='email']").val(),
            password: $("input[name='password']").val()
        },
        dataType: 'json',
        success: function (result) {
            console.log(result);

            /*------------------------------------------
            --------------------------------------------
            Remove Loading Spinner to Button
            --------------------------------------------
            --------------------------------------------*/
            $(".loginBtn").find(".fa-spinner").remove();
            $(".loginBtn").removeAttr("disabled");

            if (result.status) {
                window.location = result.redirect;
            }else{
                $(".alert").remove();
                var errorr = "<div class='alert alert-danger'><ul>";                 
                $.each(result.errors, function (key, val) {
                    errorr +="<li>" + val + "</li>";
                    
                });
                errorr+= "</ul></div>";

                $("#errors-list").append(errorr);
            }

            
        }
    });

    return false;
});