<template>
  <div class="navbar-text position-relative mx-1">
    <router-link
      :to="linkTo"
    >
      <span
        v-if="alertText"
        class="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-warning"
      >{{alertText}}</span>
      <slot name="icon"></slot>
    </router-link>
  </div>
</template>

<script setup>
// 
// props
// 

  const props = defineProps({
    alertText: {
    },
    linkTo: {
      type: String,
      required: true
    }
  })

</script>