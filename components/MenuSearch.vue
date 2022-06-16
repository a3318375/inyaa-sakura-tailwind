<script setup>
import { computed, ref } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
const { theme } = useTheme()
const { show } = useScroll()
const people = [
  { id: 1, name: 'Leslie Alexander', url: '#' },
  { id: 2, name: 'Leslie Alexander', url: '#' },
  { id: 3, name: 'Leslie Alexander', url: '#' },
  // More people...
]

const open = ref(false)
const query = ref('')
const filteredPeople = computed(() =>
  query.value === ''
    ? []
    : people.filter((person) => {
      return person.name.toLowerCase().includes(query.value.toLowerCase())
    }),
)

function onSelect(item) {
  window.location = item.url
}
function openModal() {
  open.value = true
}
</script>

<template>
  <div>
    <button
      type="button"
      class="px-3 rounded-full flex items-center hover:text-gray-600 focus:outline-none"
      :class="[theme ? '' : (show ? 'text-base-100' : '')]"
      @click="openModal"
    >
      <div class="i-heroicons-solid-search w-6 h-6" />
    </button>
    <TransitionRoot :show="open" as="template" appear @after-leave="query = ''">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox @update:modelValue="onSelect">
                <ComboboxInput class="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm" placeholder="Search..." @change="query = $event.target.value" />

                <ComboboxOptions v-if="filteredPeople.length > 0" static class="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800">
                  <ComboboxOption v-for="person in filteredPeople" :key="person.id" v-slot="{ active }" :value="person" as="template">
                    <li class="cursor-default select-none rounded-md px-4 py-2" :class="[active && 'bg-indigo-600 text-white']">
                      {{ person.name }}
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>

                <div v-if="query !== '' && filteredPeople.length === 0" class="py-14 px-4 text-center sm:px-14">
                  <div class="i-heroicons-outline-users mx-auto h-6 w-6 text-gray-400" aria-hidden="true" />
                  <p class="mt-4 text-sm text-gray-900">
                    No people found using that search term.
                  </p>
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
