<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const code = route.params.token
const token = useCookie('TOKEN_KEY')
if (code) {
  token.value = code
  router.push('/')
}
</script>

<template>
  <h1>欢迎登录</h1>
</template>
