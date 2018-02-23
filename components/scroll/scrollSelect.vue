<template>
  <div class="jc-scroll-main-box" v-show="show">
    <section class="jc-scroll-btn-box">
      <p class="cancel" @click="cancel">取消</p>
      <p class="make-sure" @click="mkSure">确定</p>
    </section>
    <section class="jc-select-container">
      <section v-for="(item, index) in list"
               :key="index"
               ref="scroll"
               :data-index="index"
               class="jc-select-target-c"
      >
        <div
          class="jc-select-item-container"
          :style="{
               'transform': `translate(0, ${(tempMv && indx === index) ? tempMv : mvLocation[index]}rem)`,
               'transition': `all .2s ease`
             }"
          :data-index="index"
        >
          <ul :data-index="index">
            <li v-for="(it, i) in item"
                :key="i"
                :data-index="index"
                :class = "{'scale-big': i === isScaleBig(indx, index)}"
            >
              {{it}}
            </li>
          </ul>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
  import {on, off} from '../../utils/dom'
  const viewW = 75
  const height = 60
  const rem = height / viewW
  console.log(viewW)
  const initLocation = (state ,target) => {
      const ay = state.split('-')
      let result = []
      if (!!!ay.length) {
        result = target.map(item => 0)
      } else {
        result = target.map((item, i) => {
          let index = item.findIndex(item => item.toString() === ay[i].toString())
          index === -1 && (index = 0)
          return `${-index * rem}`
        })
      }
      return result
  }
  export default {
    props: {
      list: {
        type: Array,
        required: true
      },
      state: {
        type: String,
      },
      fn: {
        type: Function
      },
      show: {
        default: false
      },
      rem
    },
    data () {
      return {
        mvLocation: initLocation(this.state, this.list),
        tempMv: null,
        pageY: null,
        pageYm: null,
        indx: null
      }
    },
    watch: {
      show () {
        if (this.show) {
          this.mvLocation = initLocation(this.state, this.list)
        }
      },
      list () {
       //  this.mvLocation = initLocation(this.state, this.list)
        this.rmEvent()
        this.$nextTick(() => {
          this.addEvent()
        })
      },
      state () {
        this.mvLocation = initLocation(this.state, this.list)
        this.rmEvent()
        this.$nextTick(() => {
          this.addEvent()
        })
      }
    },
    methods: {
      isScaleBig (indx, index) {
        const mv = this.tempMv && indx === index ? this.tempMv : this.mvLocation[index]
        let rIndx = Math.round(Math.abs(mv) / rem)
        return rIndx
      },
      addEvent () {
        (this.$refs['scroll'] || []) .forEach((elem, index) => {
          on({
            el: elem,
            type: 'touchstart',
            fn: this.touchS
          })
          on({
            el: elem,
            type: 'touchmove',
            fn: this.touchM
          })
          on({
            el: elem,
            type: 'touchend',
            fn: this.touchE
          })
          on({
            el: elem,
            type: 'transitionend',
            fn: this.transitionend
          })
        })
      },
      rmEvent () {
        (this.$refs['scroll'] || []).forEach((elem, index) => {
          off({
            el: elem,
            type: 'touchstart',
            fn: this.touchS
          })
          off({
            el: elem,
            type: 'touchmove',
            fn: this.touchM
          })
          off({
            el: elem,
            type: 'touchend',
            fn: this.touchE
          })
          off({
            el: elem,
            type: 'transitionend',
            fn: this.transitionend
          })
        })
      },
      transitionend (e) {
        const elem = e.target
        const index = parseInt(elem.getAttribute('data-index'))
        if (index === this.indx && !this.tempMv) {
          this.indx = null
          this.mvLocation = this.mvLocation.map((item, i) => {
            if (i > index) {
              return 0
            }
            else {
              return item
            }
          })
          this.fn(this.mvLocation.map(item => {
            return Math.round(Math.abs(parseFloat(item)) / rem)
          }))
        }
      },
      touchS (e) {
        e.preventDefault()
        const elem = e.target
        const index = parseInt(elem.getAttribute('data-index'))
        this.pageY = e.touches[0].pageY
        this.indx = index
        this.tempMv = this.mvLocation[index]
      },
      touchM (e) {
        e.preventDefault()
        e.stopPropagation()
        // this.mvLocation
        const elem = e.target
        const index = parseInt(elem.getAttribute('data-index'))
        this.pageYm = e.touches[0].pageY
        this.tempMv = `${parseFloat(this.mvLocation[index]) + (this.pageYm - this.pageY) / viewW}`
      },
      touchE (e) {
        e.preventDefault()
        const elem = e.target
        const index = parseInt(elem.getAttribute('data-index'))
        const lg = this.list[index].length
        const tempMv = parseFloat(this.tempMv)
        let endMv = Math.round(tempMv / rem) * rem
        if (endMv > 0) {
            endMv = 0
        } else if (endMv < (lg - 1) * -rem){
          endMv = (lg - 1) * -rem
        }
        this.mvLocation.splice(index, 1, endMv)
        this.tempMv = null
      },
      mkSure () {
        this.$emit('update:show', false)
        this.$emit('end', {
          flag: true,
          ay: this.mvLocation.map(item => Math.round(Math.abs(parseFloat(item)) / rem))
        })
      },
      cancel () {
        this.$emit('update:show', false)
        this.$emit('end', {
          flag: false
        })
        this.mvLocation = initLocation(this.state, this.list)
      }
    },
    mounted () {
      this.addEvent()
    },
    destroyed () {
      this.rmEvent()
    }
  }
</script>
<style>
  .jc-scroll-btn-box {
    position: relative;
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
    z-index: 99;
    p {
      width: 200px;
      border-radius: 5px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 28px;
      &.cancel {
         background: #dbe1ec;
         color: #fff;
       }
       &.make-sure{
          background: greenyellow;
          color: #fff;
        }
    }
  }
  .jc-select-container {
    position: relative;
    width: 100%;
    display: flex;
    height: 180px;
    overflow: hidden;
    padding: 0 20px;
    box-sizing: border-box;
    .scale-big {
      font-size: 32px;
    }
    &::after {
      position: absolute;
      display: block;
      border-top: 1px solid #ccc ; /*px*/
      border-bottom: 1px solid #ccc; /*px*/
      width: 96%;
      height: 60px;
      content: '';
      left: 2%;
      top: 60px;
     }
    .jc-select-target-c {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .jc-select-item-container {
      position: relative;
      top: 60px;
      flex: 1;
      text-align: center;
      li {
        height: 60px;
        line-height: 60px;
      }
    }
  }
</style>
