<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item,idx) in menu"
        :key="idx"
        @mouseenter="enter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseenter="sover"
      @mouseleave="sout">
      <template
      v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      kind:'',
      menu: this.$store.state.home.menu
    }
  },
  computed:{
    curdetail:function(){
      return this.menu.filter(item => item.type === this.kind)[0]
      // return this.$store.state.home.menu.filter(item => item.type===this.kind)[0]
    }
  },
  methods:{
    mouseleave:function(){
      let self=this;
      self._timer=setTimeout(function(){
        self.kind=''
      },150)
    },
    enter:function(e){
      this.kind=e.target.querySelector('i').className
    },
    sover:function(){
      clearTimeout(this._timer)
    },
    sout:function(){
      this.kind=''
    }
  }
}
</script>

<style lang="css">
</style>
