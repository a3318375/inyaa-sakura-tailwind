<script setup lang="ts">
import { themeChange } from 'theme-change'
import { onMounted } from 'vue'
const { theme, updateThemeShow, updateThemeHide } = useTheme()
onMounted(() => {
  themeChange(false)
})
const themes = [
  {
    name: 'default',
    id: 'default',
  },
  {
    name: '🌝 light',
    id: 'light',
  },
  {
    name: '🌚 dark',
    id: 'dark',
  },
  {
    name: '🧁 cupcake',
    id: 'cupcake',
  },
  {
    name: '🐝 bumblebee',
    id: 'bumblebee',
  },
  {
    name: '✳️ Emerald',
    id: 'emerald',
  },
  {
    name: '🏢 Corporate',
    id: 'corporate',
  },
  {
    name: '🌃 synthwave',
    id: 'synthwave',
  },
  {
    name: '👴 retro',
    id: 'retro',
  },
  {
    name: '🤖 cyberpunk',
    id: 'cyberpunk',
  },
  {
    name: '🌸 valentine',
    id: 'valentine',
  },
  {
    name: '🎃 halloween',
    id: 'halloween',
  },
  {
    name: '🌷 garden',
    id: 'garden',
  },
  {
    name: '🌲 forest',
    id: 'forest',
  },
  {
    name: '🐟 aqua',
    id: 'aqua',
  },
  {
    name: '👓 lofi',
    id: 'lofi',
  },
  {
    name: '🖍 pastel',
    id: 'pastel',
  },
  {
    name: '🧚‍♀️ fantasy',
    id: 'fantasy',
  },
  {
    name: '📝 Wireframe',
    id: 'wireframe',
  },
  {
    name: '🏴 black',
    id: 'black',
  },
  {
    name: '💎 luxury',
    id: 'luxury',
  },
  {
    name: '🧛‍♂️ dracula',
    id: 'dracula',
  },
  {
    name: '🖨 CMYK',
    id: 'cmyk',
  },
  {
    name: '🍁 Autumn',
    id: 'autumn',
  },
  {
    name: '💼 Business',
    id: 'business',
  },
  {
    name: '💊 Acid',
    id: 'acid',
  },
  {
    name: '🍋 Lemonade',
    id: 'lemonade',
  },
  {
    name: '🌙 Night',
    id: 'night',
  },
  {
    name: '☕️ Coffee',
    id: 'coffee',
  },
  {
    name: '❄️ Winter',
    id: 'winter',
  },
]
function updateTheme(val) {
  if (val === 0)
    updateThemeHide()

  else
    updateThemeShow()
}
</script>

<template>
  <div class="ml-4 flex items-center md:ml-6">
    <div title="Change Theme" class="dropdown dropdown-end">
      <div tabindex="0" class="btn btn-ghost gap-1 normal-case">
        <div class="i-heroicons-outline-color-swatch w-6 h-6" />
      </div>
      <div
        class="scrollbar dropdown-content rounded-t-box rounded-b-box top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl"
      >
        <div class="grid grid-cols-1 gap-3 p-3" tabindex="0">
          <div
            v-for="(theme, index) in themes"
            :key="theme.id"
            class="overflow-hidden rounded-lg outline outline-2 outline-offset-2 outline-base-content"
            :data-set-theme="theme.id"
            data-act-class="outline"
            @click="updateTheme(index)"
          >
            <div
              :data-theme="theme.id"
              class="w-full cursor-pointer bg-base-100 font-sans text-base-content"
            >
              <div class="grid grid-cols-5 grid-rows-3">
                <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                  <div class="flex-grow text-sm font-bold">
                    {{ theme.id }}
                  </div>
                  <div class="flex flex-shrink-0 flex-wrap gap-1">
                    <div class="w-2 rounded bg-primary" />
                    <div class="w-2 rounded bg-secondary" />
                    <div class="w-2 rounded bg-accent" />
                    <div class="w-2 rounded bg-neutral" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
