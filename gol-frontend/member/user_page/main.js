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

function setValue(user) {
    $('.name').text("name: " + user["username"] + " ");
    $(".phone").text("phone: " + user["phone"] + " ");
    $(".email").text("email: " + user["email"] + " ");
    $(".id").text("id: " + user["id"] + " ");
    $(".create_at").text("sign up day: " + user["create_at"] + " ");
    $(".member_balance").text("member_balance: " + user["member_balance"] + " ");
}

let token = getCookie("access_token");
console.log(token);

$.ajax({
    type: "GET",
    url: "http://127.0.0.1/user_info",
    dataType: 'json',
    headers: {
        "Authorization": " Bearer " + token
    },
    success: function (user) {
        setValue(user);
    }
});
