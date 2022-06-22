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
  <div class="relative z-777 w-full -top-16">
    <div class="relative hero h-96" :style="data.cover ? `background-image: url(${data.cover})` : ''">
      <div class="relative hero-overlay bg-opacity-30" />
      <div class="absolute items-center bottom-0 text-center text-neutral-content">
        <div>
          <h6 class="mb-5 text-5xl">
            {{ data.title }}
          </h6>
          <div class="mb-5 text-center">
            <div class="flex justify-start">
              <div class="i-heroicons-outline-calendar w-6 h-6" />
              <span class="px-1">发布于 {{ nuxtApp.$dayjs(data.createTime).fromNow() }}</span>
              <span class="px-1">|</span>
              <div class="i-carbon-view w-6 h-6" />
              <span class="px-1">阅读数 {{ data.views }}</span>
              <span class="px-1">|</span>
              <div class="i-heroicons-outline-chat-alt w-6 h-6" />
              <span class="px-1">评论数 {{ data.comments }}</span>
              <span class="px-1">|</span>
              <div class="i-heroicons-outline-folder-open w-6 h-6" />
              <span class="px-1">{{ data.type.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="myPageContent" class="w-full py-6">
      <!-- Replace with your content -->
      <div class="md:grid md:grid-cols-27">
        <div class="md:col-start-2 md:col-end-22 bg-base-100 bg-opacity-80">
          <article class="prose max-w-none p-4" v-html="data.article ? nuxtApp.$markit.render(data.article.context) : '' " />
        </div>
        <div class="hidden md:block md:col-start-23 md:col-end-27">
          <div class="bg-base-100 bg-opacity-80 sticky top-22">
            <div class="py-10px px-15px">
              文章目录
            </div>
            <div class="pb-15px px-15px" v-html="nuxtApp.$markit.topHtml" />
          </div>
        </div>
        <!-- /End replace -->
      </div>
    </div>
  </div>
</template>

