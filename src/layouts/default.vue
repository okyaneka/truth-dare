<template>
  <n-layout>
    <n-layout-content class="p-4">
      <!-- <router-view /> -->
      <router-view v-slot="{ Component, route }">
        <transition>
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </n-layout-content>
  </n-layout>
</template>
