<template>
  <div class="container">
    <div>
      <section class="special-box">
        <div class="scan-box">
          <img src="../assets/jtp.jpg" alt="">
          <nuxt-link to="/test" class="normal-title">点我</nuxt-link>
        </div>
      </section>
      <p class="special-desc">其实我们不一样</p>
    </div>
  </div>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
export default {
  asyncData (ctx) {
    return new Promise((r, j) => {
      setTimeout(() => {
        r({title: '首页'})
      }, 1000)
    }).then(data => data)
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.title }
      ]
    }
  },
  mounted () {
    console.log(this.pp)
    new Promise((r, j) => {
      setTimeout(() => {
        r(19)
      })
    }).then(data => {
        console.log(data)
    })
  }
}
</script>
<style>
  @import "../assets/css/var.css";
  a {
    text-decoration: none;
    color: black;
    font-size: 26px;
  }
  .special-desc {
    font-size: var(--normal-font-size);
    color: var(--sepcail-color);
    text-align: center;
  }
  .special-box {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      width: 300px;
      height: 300px;
      margin: 0 auto;
    }
    .scan-box {
      text-align: center;
      font-size: 26px;
    }
  }
</style>
