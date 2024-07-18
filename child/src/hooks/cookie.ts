import Cookies from 'js-cookie'
export const cookie = Cookies
export const deleteCookie = cookie.remove
export const setCookie = function (name:string, value: string = '', maxAge: string = '', domainHost: string = '') {
    const currentHost: string = window.location.hostname;
    
    document.cookie = `${name}=${(typeof(value)).toLowerCase() === 'string' ? value : JSON.stringify(value)};domain=${domainHost ? domainHost : currentHost};${maxAge ? ('Max-Age=' + maxAge) : ''}`
};
export const getCookie = function (name: string) {
    const allCookies: any = document.cookie;
    const cookie_pos: any = allCookies.indexOf(name);
    if (cookie_pos !== -1) {
        let cookie_end = allCookies.indexOf(";", cookie_pos);
        if (cookie_end === -1) {
            cookie_end = allCookies.length;

        }
        return unescape(allCookies.substring(cookie_pos + name.length + 1, cookie_end));
    } else {
        return ''
    }
};
export const getToken = function () {
    return getCookie('sm_token')
}

export const setToken = function (value: string) {
    return setCookie('sm_token', value)
}