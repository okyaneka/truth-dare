<route lang="yaml">
meta:
  layout: webapp
</route>

<template>
  <n-space class="min-h-screen" align="center" justify="center">
    <n-card>
      <n-form @submit.prevent>
        <n-h3 class="text-center">Login</n-h3>
        <n-form-item label="Username">
          <n-input />
        </n-form-item>
        <n-form-item label="Password">
          <n-input type="password" show-password-toggle />
        </n-form-item>
        <n-button type="primary" block attr-type="submit">Login</n-button>
      </n-form>
    </n-card>
  </n-space>
</template>
