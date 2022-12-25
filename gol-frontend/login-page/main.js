document.documentElement.setAttribute('data-theme','dark');

function signUpToCreateNewAccount(){
    let name = $("#name").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let comfirmPassword = $("#comfirmPassword").val();

    if (password == comfirmPassword){
        let account = {
            'name' : name,
            'password' : password,
            'phone' : phone,
            'email' : email
        };

        $.ajax({
            type : "POST",
            url : "http://127.0.0.1:8000/sign_up",
            data : JSON.stringify(account),
            contentType : "application/json",
            success : (response) => console.log(response),
        })
    }
}

function parseCookie() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    
    for (var i=0, l=cookieAry.length; i<l; ++i) {
        cookie = jQuery.trim(cookieAry[i]);
        cookie = cookie.split('=');
        cookieObj[cookie[0]] = cookie[1];
    }
    
    return cookieObj;
}


function getCookieByName(name) {
    var value = parseCookie()[name];
    if (value) {
        value = decodeURIComponent(value);
    }

    return value;
}