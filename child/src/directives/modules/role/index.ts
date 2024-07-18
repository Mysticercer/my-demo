import type { Directive, DirectiveBinding } from 'vue'
const useRole = [{ name: '/eyeDeviceManager/home', write: false }]
let currentUrl = window.location.href.split('#')[1]
if (currentUrl.indexOf('redirect')>=0) {
    currentUrl = currentUrl.split('redirect=')[1]
}
if (currentUrl.indexOf('?')>=0) {
    currentUrl = currentUrl.split('?')[1]
}
export const role: Directive = {
    mounted(el: any, binding: DirectiveBinding) {
        const type: string = binding.value || 'write'
        let flag = false
        const _obj = useRole.find((item) => {
            return item.name === currentUrl
        }) as KeyObject
        if (_obj && JSON.stringify(_obj) !== '{}') {
            _obj as KeyObject
            flag = _obj[type]
        }
        if (!flag) {
            if (el.className.indexOf('el-input') > -1) {
                el.classList.add('is-disabled')
                const elDom = el.getElementsByTagName('input')[0]
                elDom.disabled = true;
            } else if (el.className.indexOf('el-radio') > -1) {
                el.classList.add('is-disabled')
                const radioItems = el.children
                for (let i = 0; i < radioItems.length; i++) {
                    const radioItem = radioItems[i]
                    radioItem.classList.add('is-disabled');
                    const radioInput = radioItem.getElementsByClassName('el-radio__input')[0]
                    radioInput.classList.add('is-disabled');
                    const elDoms = radioItem.getElementsByTagName('input')[0]
                    elDoms.disabled = true;
                }
            }
        }
    },
    updated(el: any, binding: DirectiveBinding) { },
    unmounted(el) { },
}