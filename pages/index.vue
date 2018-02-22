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
    <p class="special-desc" @click="show = true">自己日期插件</p>
    <scroll-select
      :list="list"
      :state="state"
      :fn="fn"
      :show.sync="show"
      @end="end"
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
    const yearRange = []
    for (let i = new Date().getFullYear(); i > 1920; i--) {
      yearRange.push(i)
    }
    return {
      list: [],
      state: '',
      show: false,
      yearRange,
      monthRange: '01-02-03-04-05-06-07-08-09-10-11-12'.split('-')
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
    end (e) {
      const {flag, ay} = e
      const {list} = this
      if (flag) {
        this.state = `${list[0][ay[0]]}-${list[1][ay[1]]}-${list[2][ay[2]]}`
      } else {
        this.initList()
      }
    },
    fn (ay) {
      const [year, month] = ay
      let aYear = []
      let aMonth = []
      let aDay = []
      let allDay = null
      aYear = this.yearRange
      aMonth = this.monthRange
      const IsLeapYear = (year) => {
          console.log(year)
          if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)
            return 1
           else
            return 0
    }
      switch (aMonth[month]) {
        case '01':
        case '03':
        case '05':
        case '07':
        case '08':
        case '10':
        case '12':
          allDay = 31
          break
        case '04':
        case '06':
        case '09':
        case '11':
          allDay = 30
          break
        case '02':
          allDay = 28 + IsLeapYear(parseInt(aYear[year]))
          break;
        default: {
        }
      }
      for (let i = 1; i <= allDay; i++) {
        aDay.push(i < 10 ? `0${i}`: i)
      }
      this.list = [aYear, aMonth, aDay]
    },
    initList () {
      const list = this.state.split('-')
      this.fn([
        this.yearRange.findIndex(item => item.toString() === list[0].toString()),
        this.monthRange.findIndex(item => item.toString() === list[1].toString()),
        parseInt(list[2]) - 1
      ])
    }
  },
  mounted () {
    setTimeout(() => {
      this.state = '1999-05-18'
      this.initList()
    }, 2000)
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
