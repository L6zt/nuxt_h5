<template>
  <div class="container">
    <div>
      <!--<section class="special-box">-->
        <!--<div class="scan-box">-->
          <!--<img src="../assets/jtp.jpg" alt="">-->
          <!--<nuxt-link to="/test" class="normal-title">点我</nuxt-link>-->
        <!--</div>-->
      <!--</section>-->
    </div>
    <p class="special-desc" @click="show = true">其实我们不一样</p>
    <scroll-select
      :list="list"
      :state="state"
      :fn="fn"
      :show.sync="show"
      @end="change"
    >
    </scroll-select>
  </div>
</template>

<script>
import scrollSelect from '../components/scroll/scrollSelect.vue'
export default {
  asyncData (ctx) {
    return new Promise((r, j) => {
      setTimeout(() => {
        r({title: '首页'})
      }, 1000)
    }).then(data => data)
  },
  data () {
    return {
      list: [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 5]
      ],
      state: '1-5',
      show: false
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.title }
      ]
    }
  },
  components: {scrollSelect},
  methods: {
    change (e) {
      const {flag, ay} = e
      const {list} = this
      if (flag) {
        this.state = `${list[0][ay[0]]}-${list[1][ay[1]]}`
      }
    },
    fn (ay) {
      console.log('xxx', ay[0])
      this.list.splice(1, 1, this.list[0].map((item, index) => {
        return this.list[0][ay[0]] + index
      }))
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
    position: relative;
    font-size: var(--normal-font-size);
    color: var(--sepcail-color);
    text-align: center;
    z-index: 9999;
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
