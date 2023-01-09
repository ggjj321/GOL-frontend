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

let detailgameID = getCookie("detailgameID");

$.ajax({
    type: "GET",
    url: "http://127.0.0.1/Game/get_game_data_by_id?game_id=" + detailgameID,
    headers: {
        Accept: "application/json",
    },
    success: (responseGame) => {
        console.log(responseGame);
        $(".name-of-game").text(responseGame["game_name"]);
        $(".game-id").text("game ID : " + responseGame["game_id"]);
        $(".price").text(responseGame["game_sale_price"]);
        $(".discount-price").text(parseInt(responseGame["game_sale_price"]) * (1 - parseFloat(responseGame["game_discount"])));
        $(".up-time").text("up date : " + responseGame["create_at"]);
        $(".version").text("version : " + responseGame["game_version"]);
        $(".genre").text("genre : " + responseGame["game_genre"]);
        $(".de_name").text("Developer Name : " + responseGame["game_developer"]);
        $(".introduction-content").text(responseGame["game_introduction"]);
        $(".game-title-page").attr("src", responseGame["game_picture"])
    },
    error: (response) => console.log(response),
});

function pushGameToCart() {

    let token = getCookie("access_token");

    let cart = {
        "cart_id": 0,
        "user_id": 0,
        "game_id": detailgameID,
        "cost": 0,
        "place_order": true
    }

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1/Cart/add_cart",
        data: JSON.stringify(cart),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": " Bearer " + token
        },
        success: (response) => alert("add to cart"),
        error: (response) => console.log(response),
    });
}