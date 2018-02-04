<template>
  <div>
    {{$route.params.id}}
    <nuxt-link to="/test/sonA">sonA</nuxt-link>
    <nuxt-link to="/test/sonB">sonB</nuxt-link>
    <nuxt-link to="/">首页</nuxt-link>
  </div>
</template>
<script>
  export default {
    asyncData ({params}) {
      return new Promise((r, j) => {
        r({
          pp: params.id || ''
        })
      })
    }
  }
</script>
<style>
</style>
