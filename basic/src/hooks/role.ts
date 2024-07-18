const useRole = [{ name: '/eyeDeviceManager/home', write: false }]
let currentUrl = window.location.href.split('#')[1]
if (currentUrl.indexOf('redirect')>=0) {
    currentUrl = currentUrl.split('redirect=')[1]
}
if (currentUrl.indexOf('?')>=0) {
    currentUrl = currentUrl.split('?')[1]
}

export const role = (type: string) => {
    const _obj = useRole.find((item) => {
        return item.name === currentUrl
    }) as KeyObject
    return !_obj[type]
}