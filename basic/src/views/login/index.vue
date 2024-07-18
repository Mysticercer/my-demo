<script setup lang="ts">
import { useUserStoreHook } from '@/stores/modules/user'
import { setupPermission } from '@/plugins'
const userStore = useUserStoreHook()
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()

const redirectPath = ($route.query.redirect as string) || '/'

const login = async () => {
  userStore
    .login(form)
    .then(async () => {
      await setupPermission()
      $router.push(redirectPath)
    })
    .catch((error) => {
      console.error('登录失败', error)
      ElMessage.error('登录失败，请输入正确的用户名和密码！')
    })
}

import { reactive, ref, unref } from 'vue'

const form = reactive({
  username: '',
  password: ''
})

import type { FormRules } from 'element-plus'

interface RuleForm {
  username: string
  password: string
}

const rules = reactive<FormRules<RuleForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // { min: 8, max: 20, message: '密码必须8-20位', trigger: 'blur' }
  ]
})

import { ElMessage } from 'element-plus'
const loginformRef = ref()
const submitForm = async () => {
  const loginform = unref(loginformRef)
  if (!loginform) return
  await (loginform as any).validate((valid: any, fields: any) => {
    if (valid) {
        login()
      } else {
        ElMessage.warning('请输入用户名和密码！')
      }
  })
}
</script>

<template>
  <div class="login">
    <div class="login_img">
      <img src="/large/login-logo.png" />
    </div>
    <div class="login_Wrap">
      <div class="login_form">
        <div class="login_form_bottom">
          <el-form
            ref="loginformRef"
            :rules="rules"
            :model="form"
            label-width="0"
            label-position="left"
            autocomplete="off"
          >
            <el-form-item label="" prop="username" class="yn-mb40">
              <el-input placeholder="用户名" size="large" v-model="form.username">
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="password" class="yn-mb40">
              <el-input
                @keyup.enter="submitForm()"
                placeholder="密码"
                type="password"
                size="large"
                v-model="form.password"
                :show-password="true"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Lock /></el-icon>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="yn-w" size="large" type="primary" @click="submitForm()">
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-input__wrapper {
  border-radius: 0;
  padding: 0 !important;
  .el-input__inner {
    // padding: 0 15px;
  }
  .el-input__icon {
    margin-left: 8px !important;
    margin-right: 8px !important;
  }
}
.login {
  background: #f0f2f5;
  width: 100%;
  height: 100%;
  background: url(/large/login.png) no-repeat;
  background-size: cover;
}
.yn-mb20 {
  margin-bottom: 20px;
}
.yn-mb40 {
  margin-bottom: 40px;
}
.yn-tc {
  text-align: center;
}
.yn-w {
  width: 100%;
}
.login_img {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  letter-spacing: 5px;
  margin-bottom: 90px;
  font-size: 52px;
  color: white;
  font-weight: 700;
  // img {
  //   width: 80px;
  //   margin-right: 18px;
  // }
}

.login_Wrap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 50%;
  color: #000;
  width: 100%;
  max-width: 330px;
}
.login_title {
  font-size: 35px;
  font-weight: 500;
}
.login_description {
  opacity: 0.8;
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;
}
.login_form {
  // background: #fff;
  border-radius: 5px;
  .login_form_bottom {
    border-radius: 0 0 5px 5px;
    // background: #eee;
    // padding: 10% 5%;
  }
}

:deep(.el-input) {
  .el-input__wrapper {
    border: 1px solid #28a0d5;
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 0;
  }
  .el-input__inner {
    color: #fff;
  }
}
:deep(.el-button) {
  background: url(data:image/png;base64,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)
    50% no-repeat !important;
  background-size: 100% 100% !important;
  border-radius: 0;
}
</style>
