<script setup>
const nuxtApp = useNuxtApp()
const data = await useFetch('/blog/web/archive/list', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-admin',
  method: 'GET',
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
const imgData = await useFetch('/file/image?type=0', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-picture',
  method: 'GET',
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
  title: '归档',
  link: [
    { rel: 'icon', href: 'https://media.inyaw.com/icon/favicon.ico' },
  ],
  meta: [
    { name: 'keywords', content: '瑶瑶,梦中小屋,瑶瑶的梦中小屋' },
    { name: 'description', content: '瑶瑶的梦中小屋，一个个人小站.' },
  ],
})
</script>

<template>
  <div class="max-w-5xl mx-auto py-16">
    <div class="hero bg-cover bg-center bg-no-repeat h-96" :style="`background-image: url(${imgData})`">
      <div class="hero-overlay bg-opacity-60" />
      <div class="hero-content text-center text-neutral-content">
        <div>
          <h6 class="mb-5 text-5xl font-bold">
            时间线
          </h6>
          <p class="mb-5">
            时间线
          </p>
        </div>
      </div>
    </div>
    <div class="px-5 py-8 bg-white bg-opacity-80">
      <ol class="border-l-2 border-blue-600">
        <li v-for="item in data">
          <div class="flex flex-start items-center">
            <div class="bg-blue-600 w-4 h-4 flex items-center justify-center rounded-full -ml-2 mr-3 -mt-2" />
            <h4 class="text-gray-800 font-semibold text-xl -mt-2">
              <a :href="`/article/${item.id}`">{{ item.title }}</a>
            </h4>
          </div>
          <div class="ml-6 mb-6 pb-6">
            <a href="#!" class="text-blue-600 hover:text-blue-700 focus:text-blue-800 duration-300 transition ease-in-out text-sm">发布于 {{ nuxtApp.$dayjs(item.createTime).fromNow() }}</a>
            <p class="text-gray-700 mt-2 mb-4">
              {{ item.summary }}
            </p>
            <button type="button" class="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Read more
            </button>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>
