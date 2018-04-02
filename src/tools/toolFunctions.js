import axios from "axios";
import Cookies from "js-cookie";
import { inject, observer } from "mobx-react";

const mobXConnect = storeName => component => inject([storeName])(observer(component));

const getQueryStringValue = key => {
    const value = decodeURIComponent(
        window.location.search.replace(
            new RegExp(
                "^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$",
                "i"
            ),
            "$1"
        )
    );
    return value;
};

const getParamFromURL = key => {
    let urlValue = getQueryStringValue(key);
    if(urlValue.length === 0) {
        console.log(`${key} is not provided in url`);
        return urlValue;
    }
    console.log(`${key} ${urlValue} was retrieved`);
    return urlValue;
}
const getParamFromCookieOrUrl = key => {
    let cookieValue = Cookies.get(key);
    if(cookieValue) {
        console.log(`${key} cookie exists and is ${cookieValue}`)
        return cookieValue;
    }
    let urlValue = getQueryStringValue(key);
    if(urlValue.length === 0) {
        console.log(`${key} is not provided in url`);
        return urlValue;
    }
    Cookies.set(key, urlValue);
    console.log(`${key} ${urlValue} was saved`);
    return urlValue;
}

module.exports = {
    getParamFromCookieOrUrl,
    getParamFromURL,
    mobXConnect
};
