<template>
  <div class="test-container"
       v-infinite-scroll="loadMore"
       infinite-scroll-distance="30"
       infinite-scroll-immediate-check="false"
  >
    <section style="text-align: center">
      <nuxt-link to="/">首页</nuxt-link>
      <nuxt-link to="/test/sonA">sonA</nuxt-link>
      <nuxt-link to="/test/sonB">sonB</nuxt-link>
    </section>
    <template>
      <section class="part-1" v-for="index in list" v-if="index % 2 === 1" :key="index"></section>
      <section class="part-2" v-else></section>
    </template>
    <section class="load-flag" v-show="busy" v-cloak>wo are load</section>
  </div>
</template>
<script>
  export default {
    num: 1,
    asyncData () {
      return new Promise((r, j) => {
        setTimeout(() => {
          r({title: '测试'})
        })
      })
    },
    head () {
      return {
        title: this.title,
        meta: [
          { hid: 'description', name: 'description', content: this.title }
        ]
      }
    },
    data () {
      return {
        busy: false,
        list: this.$options.num
      }
    },
    mounted () {
      console.log(this.title)
      setTimeout(() => {
        this.list = ++this.$options.num
        console.log('we must init load')
      })
    },
    methods: {
      loadMore () {
        console.log('i scroll')
        if (this.busy === false) {
          setTimeout(() => {
            console.log('trigger once ')
            this.list = ++this.$options.num
            this.busy = false
          }, 500)
          this.busy = true
        }
      }
    }
  }
</script>
<style>
.test-container {
  .part-1 {
    height: 800px;
    background: turquoise;
  }
  .part-2 {
    height: 1000px;
    background: lavender;
  }
  .load-flag {
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: white;
    background: black;
    font-size: 26px;
  }
}
</style>
