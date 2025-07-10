<template>
  <UserPanel v-if="storeAuth.user.id">

  </UserPanel>

  <template v-else>
    <UserAuth></UserAuth>
  </template>
</template>

<script setup>
// 
// import
// 

  import UserAuth from '@/components/user/UserAuth.vue';
  import UserPanel from '@/components/user/UserPanel.vue';
  // auth store
  import { useStoreAuth } from '@/stores/storeAuth';

// 
// store
// 

  const storeAuth = useStoreAuth()



</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0% auto
}

</style>
