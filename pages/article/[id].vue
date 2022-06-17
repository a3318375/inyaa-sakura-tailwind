<script setup>
const nuxtApp = useNuxtApp()
const route = useRoute()
const data = await useFetch('/blog/web/info', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-admin',
  method: 'GET',
  params: {
    id: route.params.id,
  },
}).then((r) => {
  if (!r)
    return {}

  if (!r.data || !r.data.value)
    return {}

  if (r.data.value.code && r.data.value.code === 200)
    return r.data.value.data
  else
    return {}
})
useHead({
  title: data ? data.title : '瑶瑶的梦中小屋',
  link: [
    { rel: 'icon', href: 'https://media.inyaw.com/icon/favicon.ico' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    { name: 'keywords', content: data ? data.title : '瑶瑶的梦中小屋' },
    { name: 'description', content: data ? data.summary : '瑶瑶的梦中小屋，一个个人小站.' },
  ],
})
</script>

<template>
  <div class="max-w-5xl mx-auto absolute pt-0 lg:static lg:py-16">
    <div class="hero bg-cover bg-center bg-no-repeat h-96" :style="data.cover ? `background-image: url(${data.cover})` : ''">
      <div class="hero-overlay bg-opacity-60" />
      <div class="hero-content text-center text-neutral-content">
        <div>
          <h6 class="mb-5 text-5xl font-bold">
            {{ data.title }}
          </h6>
          <p class="mb-5">
            {{ data.summary }}
          </p>
        </div>
      </div>
    </div>
    <div class="px-5 py-8 bg-white bg-opacity-80">
      <article class="prose max-w-none" v-html="data.article ? nuxtApp.$markit.render(data.article.context) : '' " />
    </div>
  </div>
</template>

