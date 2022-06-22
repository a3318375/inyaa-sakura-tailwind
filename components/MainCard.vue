<script setup>
const nuxtApp = useNuxtApp()
const route = useRoute()
let pageNum = 0
let maxPage = 1
const blogList = useState('blogList', () => [])

const params = {
  size: 10,
}

if (pageNum > 1)
  params.page = pageNum

if (route.params.title)
  params.title = route.params.title

const toNext = async (type) => {
  if (type === 0) {
    if (pageNum < 2)
      return
    else {
      pageNum--
    }
  }
  else {
    if (pageNum >= maxPage)
      return
    else {
      pageNum++
    }
  }
  params.page = pageNum
  const data = await useFetch('/blog/web/list', {
    parseResponse: JSON.parse,
    baseURL: 'https://api.inyaw.com/inyaa-admin',
    method: 'GET',
    params,
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
  blogList.value = data.content
  maxPage = data.totalPages
  if (pageNum > 1)
    location.href = '#cardTop'
}
toNext(1)
</script>

<template>
  <div>
    <div id="cardTop" />
    <div v-for="(item, index) in blogList" class="grid card rounded-box place-items-center">
      <div class="card lg:card-side bg-base-100 shadow-xl lg:max-w-4xl flex">
        <figure class="lg:w-1/2 overflow-hidden" :class="[index % 2 === 0 ? 'lg:order-2' : 'lg:order-4']">
          <img :src="item.cover" class="h-75 transform transition duration-700 hover:scale-110" alt="Album">
        </figure>
        <div class="card-body lg:w-1/2 lg:float-left" :class="[index % 2 === 0 ? 'lg:order-4' : 'lg:order-2']">
          <h2 class="card-title">
            <a :href="`/article/${item.id}`">{{ item.title }}</a>
          </h2>
          <div class="text-xs">
            <span><div class="i-carbon-time text-sm mr-1 inline-block bg-yellow-500" />{{ nuxtApp.$dayjs(item.createTime).format('YYYY-MM-DD') }}</span>
            <span class="mx-2"><div class="i-carbon-view text-sm mr-1 inline-block bg-yellow-500" />{{ item.views }} 热度</span>
            <span class="mr-2"><div class="i-carbon-pending text-sm mr-1 inline-block bg-yellow-500" />{{ item.comments }} 条评论</span>
            <span><div class="i-carbon-open-panel-top text-sm mr-1 inline-block bg-yellow-500" />{{ item.type.name }}</span>
          </div>
          <p>{{ item.summary }}</p>
          <div class="card-actions justify-end">
            <div class="text-xs w-max">
              <div class="i-carbon-time text-sm float-left mr-1 bg-yellow-500" />
              发布于 {{ nuxtApp.$dayjs(item.createTime).fromNow() }}
            </div>
          </div>
        </div>
      </div>
      <div class="divider" />
    </div>

    <div class="grid place-items-center pb-8">
      <div class="btn-group" @click="toNext(0)">
        <button class="btn">
          «
        </button>
        <button class="btn">
          Page {{ pageNum }}
        </button>
        <button class="btn" @click="toNext(1)">
          »
        </button>
      </div>
    </div>
  </div>
</template>
