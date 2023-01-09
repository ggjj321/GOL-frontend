document.documentElement.setAttribute('data-theme', 'dark');

const createCookie = (responseToken) => {
    document.cookie = "access_token=" + responseToken['access_token'] + "; path=/";
<<<<<<< HEAD
    console.log(document.cookie);
}
=======
    document.cookie = "authority=" + responseToken['authority'] + "; path=/";
    console.log(document.cookie);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
>>>>>>> 6fcef85e3eb9b5bbeae1ed5e5e8d671282d674f2

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
<<<<<<< HEAD
            success: (response) => console.log(response),
=======
            success: (response) => alert(success),
>>>>>>> 6fcef85e3eb9b5bbeae1ed5e5e8d671282d674f2
            error: (response) => console.log(response),
        });
    }
}

<<<<<<< HEAD
=======
const routeWithAuth = () => {
    let auth = getCookie("authority");
    console.log(auth);

    if (auth == "Admin") {
        window.location.href = "../admin/mail_page/mail.html";
    }
    if (auth == "Developer") {
        window.location.href = "../developer/upload-page/upload.html";
    }
    if (auth == "Member") {
        window.location.href = "../member/whole_game_page/homepage.html";
    }
}

>>>>>>> 6fcef85e3eb9b5bbeae1ed5e5e8d671282d674f2
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
<<<<<<< HEAD
            window.location.href = "../test.html";
=======
            routeWithAuth();
>>>>>>> 6fcef85e3eb9b5bbeae1ed5e5e8d671282d674f2
        },
        error: (response) => console.log(response),
    });
};

