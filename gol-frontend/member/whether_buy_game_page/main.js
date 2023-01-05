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

$.ajax({
    type: "GET",
    url: "http://127.0.0.1/Game/get_game_data_by_id?game_id=" + getCookie("detailgameID"),
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

function buyThisGame() {
    $.ajax({
        type: "PATCH",
        url: "http://127.0.0.1/Cart/update_cart_place_order?game_id=" + getCookie("detailgameID") + "&place_order=true",
        headers: {
            Accept: "application/json",
            "Authorization": " Bearer " + getCookie("access_token")
        },
        success: (response) => {
            alert("add to library");
            window.location.href = "../cart_page/homepage.html";

        },
        error: (response) => console.log(response),
    });

}

function removeGame() {
    $.ajax({
        type: "DELETE",
        url: "http://127.0.0.1/Cart/delete_cart?gameID=" + getCookie("detailgameID"),
        headers: {
            Accept: "application/json",
            "Authorization": " Bearer " + getCookie("access_token")
        },
        success: (response) => {
            alert("delete game from cart");
            window.location.href = "../cart_page/homepage.html";

        },
        error: (response) => console.log(response),
    });
}