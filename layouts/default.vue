<script setup>
import { themeChange } from 'theme-change'
const { show, updateShow, updateHide } = useScroll()
const { theme } = useTheme()
const wallpaperShow = useState('wallpaper', () => true)
function updateWallpaper() {
  if (wallpaperShow.value) {
    wallpaperShow.value = false
    document.getElementById('mainCoverId').style.display = 'none'
  }
  else {
    wallpaperShow.value = true
    document.getElementById('mainCoverId').style.display = 'block'
  }
}

function handleScroll() {
  console.log(11111)
  const scrollTop = document.getElementById('pageContent').scrollTop
  const myTop = document.getElementById('pageContent').scrollHeight
  console.log(3333, scrollTop, myTop)
  if (scrollTop > myTop / 10) {
    updateHide()
    document.getElementsByClassName('aplayer-title')[0].style.color = '#666'
    document.getElementsByClassName('aplayer-author')[0].style.color = '#666'
    document.getElementsByClassName('aplayer-time-narrow')[0].style.color = '#666'
    document.getElementsByClassName('aplayer-icon-volume-down')[0].firstChild.firstChild.style.fill = '#666'
  }
  else {
    updateShow()
    document.getElementsByClassName('aplayer-title')[0].style.color = '#fff'
    document.getElementsByClassName('aplayer-author')[0].style.color = '#fff'
    document.getElementsByClassName('aplayer-time-narrow')[0].style.color = '#fff'
    document.getElementsByClassName('aplayer-icon-volume-down')[0].firstChild.firstChild.style.fill = '#fff'
  }
}
onMounted(async () => {
  themeChange(false)
  initAudio()
  new l2dViewer({
    el: document.getElementById('L2dCanvas'), // 要添加Live2d的元素, 支持dom选择器和jq选择器
    basePath: 'https://www.inyaw.com/lv2d/live2d/model', // 模型根目录
    width: 800,
    height: 600,
    modelName: 'xuefeng_3', // 模型名称
    sounds: [ // 触摸播放声音
      'sounds/demo.mp3', // 相对路径是相对于模型文件夹
      'https://cdn.jsdelivr.net/npm/live2dv3@latest/assets/biaoqiang_3/sounds/demo.mp3', // 也可以是网址
    ],
  })
})
const menuData = await useFetch('/menu/findMenuList', {
  parseResponse: JSON.parse,
  baseURL: 'https://api.inyaw.com/inyaa-admin',
  method: 'GET',
  params: {
    enable: true,
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

const user = useCookie('TOKEN_USER')
const token = useCookie('TOKEN_KEY')
const userNav = useState('userNav', () => [])
userNav.value = [
  {
    name: '登录',
    path: '/login',
  },
]
if (user.value && token.value) {
  userNav.value = []
  userNav.value = [
    {
      name: '消息',
      path: '/message',
    },
    {
      name: '设置',
      path: '/setting',
    },
    {
      name: '登出',
      path: '/logout',
    },
  ]
}
if (!user.value && token.value) {
  const userData = await useFetch('/user/info', {
    parseResponse: JSON.parse,
    baseURL: 'https://api.inyaw.com/inyaa-admin',
    method: 'GET',
    headers: {
      Authorization: token.value,
    },
  }).then((r) => {
    if (!r)
      return {}

    if (!r.data || !r.data.value)
      return {}

    return r.data.value
  })
  if (userData && userData.code === 200) {
    user.value = userData.data
    userNav.value = []
    userNav.value = [
      {
        name: '消息',
        path: '/message',
      },
      {
        name: '设置',
        path: '/setting',
      },
      {
        name: '登出',
        path: '/logout',
      },
    ]
  }
}

function toLogin() {
  window.location.href = 'https://api.inyaw.com/inyaa-admin/toLogin'
}

function toLogout() {
  token.value = null
  user.value = null
  window.location.reload()
}
function initAudio() {
  // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
  const ap = new APlayer({
    container: document.getElementById('aplayer'),
    listFolded: true,
    audio: [ // 歌曲列表
      {
        name: '星茶会',
        artist: '灰澈-星茶会',
        url: 'https://media.inyaw.com/icon/test_music.mp3',
        cover: 'http://imge.kugou.com/stdmusic/150/20200812/20200812134914113741.jpg',
        lrc: '',
        theme: '#baf',
      },
    ],
  })
}
</script>

<template>
  <div>
    <Html data-theme="light" />
    <image id="mainCoverId" :class="[show ? 'fixed w-full h-full object-cover -z-999 bg-img-mobile-default md:bg-img-default bg-no-repeat bg-cover' : 'fixed filter blur w-full h-full object-cover -z-999 bg-img-mobile-default md:bg-img-default bg-no-repeat bg-cover']" @scroll="handleScroll" />
    <div id="L2dCanvas" class="Canvas hidden md:block" style="position: fixed; opacity: 1; left: -200px; bottom: -100px; pointer-events: none;" />
    <div class="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle">
      <div id="pageContent" class="drawer-content flex flex-col" @scroll="handleScroll">
        <!-- Navbar -->
        <div class="sticky top-0 z-888">
          <div class="w-full navbar" :class="[theme ? 'bg-base-100' : (show ? 'text-white' : 'bg-white bg-opacity-80')]">
            <div class="flex-1 px-2 mx-2">
              <a :class="[show ? 'text-25px group' : 'text-25px pb-2 group']">
                <ruby>
                  <span>yoyo</span>
                  <span>の</span>
                  <span>梦中小屋</span>
                  <rt class="text-10px opacity-0 group-hover:opacity-100">瑶瑶的梦中小屋</rt>
                </ruby>
              </a>
            </div>
            <div class="flex-none hidden lg:block">
              <div id="aplayer" class="hidden lg:block" />
            </div>
            <div class="flex-none hidden lg:block">
              <ul class="menu menu-horizontal">
                <!-- Navbar menu content here -->
                <li v-for="item in menuData">
                  <a :href="item.path">{{ item.name }}</a>
                </li>
              </ul>
            </div>
            <div class="flex-none hidden lg:block">
              <ThemeChange />
            </div>
            <div class="flex-none hidden lg:block">
              <MenuSearch />
            </div>
            <div class="flex-none hidden lg:block">
              <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                  <div class="i-carbon-user-avatar w-6 h-6" />
                </label>
                <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-accent-content">
                  <li v-for="navItem in userNav">
                    <a v-if="navItem.path === '/login'" @click="toLogin">{{ navItem.name }}</a>
                    <a v-else-if="navItem.path === '/logout'" @click="toLogout">{{ navItem.name }}</a>
                    <a v-else :href="navItem.path">{{ navItem.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex-none lg:hidden">
              <label for="my-drawer-3" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </label>
            </div>
          </div>
        </div>
        <!-- Page content here -->
        <slot />
        <MainFooter />
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay" />
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
          <!-- Sidebar content here -->
          <li v-for="item in menuData">
            <a :href="item.path">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
