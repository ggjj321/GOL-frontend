const createCookie = (responseToken) => {
    document.cookie = "access_token=" + responseToken['access_token'] + "; path=/";
    console.log(document.cookie);
}