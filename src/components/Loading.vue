<template>
  <main>
    <slot v-if="ready"></slot>
    <div v-else class="spinner">
      <div v-for="i in 3" :key="i" :class="`bounce-${i}`"></div>
    </div>
  </main>
</template>

<script>
export default {
  name: "App",
  props: {
    ready: {
      type: Boolean,
      required: true
    }
  }
};
</script>
