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

document.documentElement.setAttribute('data-theme', 'dark');
function routeToDetail(game_id) {
    document.cookie = "detailgameID=" + game_id + "; path=/";
    window.location.href = "../whether_buy_game_page/game_detail.html";
}

$.ajax({
    type: "GET",
    url: "http://127.0.0.1/Cart/get_cart_or_lib?isLib=false&skip=0&limit=100",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": " Bearer " + getCookie("access_token")
    },
    success: (response) => {
        total_money = 0;
        response.forEach(element => {
            $(".review-photo").append(
                `<div>
                <a href = "javascript:routeToDetail(${element["game_id"]})">
                    <img class="review" src="${element["game_picture"]}"  referrerpolicy="no-referrer">
                </a>
                <button class="btn-plus" type="button"><i class="gg-math-plus"></i></button>
                <button class="btn-readme" type="button"><i class="gg-readme"></i></button>
                </div>`
            );
            total_money += parseInt(element["game_sale_price"]) * (1 - parseFloat(element["game_discount"]));
        });
        $(".review-photo").append(
            `<h3 style="font-style:normal; font-weight:normal; padding-left:30px; color:white;">total : ${total_money} $</h3>`
        )
    },
    error: (response) => console.log(response),
});

function buyAllGame() {
    $.ajax({
        type: "PATCH",
        url: "http://127.0.0.1/Cart/buy_all_games",
        headers: {
            Accept: "application/json",
            "Authorization": " Bearer " + getCookie("access_token")
        },
        success: (response) => {
            alert("You don't have enough money");
        },
        error: (response) => console.log(response),
    });
}