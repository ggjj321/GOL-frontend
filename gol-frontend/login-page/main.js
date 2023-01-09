document.documentElement.setAttribute('data-theme', 'dark');

const createCookie = (responseToken) => {
    document.cookie = "access_token=" + responseToken['access_token'] + "; path=/";
    console.log(document.cookie);
}

function signUpToCreateNewAccount() {
    let name = $("#name").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let comfirmPassword = $("#comfirmPassword").val();

    if (password == comfirmPassword) {
        let account = {
            'username': name,
            'password': password,
            'phone': phone,
            'email': email
        };

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:80/sign_up",
            data: JSON.stringify(account),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            success: (response) => console.log(response),
            error: (response) => console.log(response),
        });
    }
}

const onclickLogin = () => {
    let userInfo = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:80/login",
        data: userInfo,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        success: (responseToken) => {
            createCookie(responseToken);
            window.location.href = "../test.html";
        },
        error: (response) => console.log(response),
    });
};

