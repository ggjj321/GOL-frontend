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

function pushGameToWish() {

    let token = getCookie("access_token");

    let gameList = {
        "comment": "",
        "category": "string",
        "game_id": detailgameID,
        "game_list_id": 0,
        "create_at": "2023-01-03T10:59:55.294Z",
        "user_id": 0,
        "game_list_type": 1
    }

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1/GameList/add_gameslist_wish",
        data: JSON.stringify(gameList),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": " Bearer " + token
        },
        success: (response) => alert("add to wWishlist"),
        error: (response) => console.log(response),
    });
}