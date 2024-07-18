import type { Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@/stores/modules/permission'

export const permission: Directive = {
  mounted(el: any, binding: DirectiveBinding) {
    const { value } = binding
    const all_permission = '*:*:*'
    const permissions = usePermissionStore()
    if (value && value instanceof Array && value.length > 0) {
      const permissionFlag = value

      const hasPermissions = permissions.some((permission) => {
        return all_permission === permission || permissionFlag.includes(permission)
      })

      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置操作权限标签值`)
    }
  }
}
