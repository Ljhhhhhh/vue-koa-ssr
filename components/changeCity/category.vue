<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item">
        <a
        :href="'#city-'+item">
          {{ item }}
        </a>

      </dd>
    </dl>
    <dl
      class="m-categroy-section"
      v-for="item in block"
      :key="item.title">
      <dt
      :id="'city-'+item.title">
        {{ item.title }}
      </dt>
      <dd>
        <!--用dd做一个容器好写样式-->
        <span
          v-for="c in item.city"
          :key="c">
          {{ c }}
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'

export default {
  name: "Categroy",
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      // block:[{title:'',city:[]}]
      block: []
    }
  },
  async mounted() {
    let self = this;
    let blocks = [];
    let {
      status,
      data: {
        city
      }
    } = await self.$axios.get('geo/city')

    if (status === 200) {

      let p;
      let c;
      let d = {};
      city.forEach(item => {
        //中文名称的城市，拿到全部的拼音
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1)
        //  取完首字母后，再进行排序
        c = p.charCodeAt(0)

        if (c >= 97 && c <= 122) {
          // 97到122   xiaoxie  dao
          //             console.log(d[p]);

          if (!d[p]) {
            d[p] = []
          }
          // console.log(d[p]);
          d[p].push(item.name)
          // console.log(d[p]);
          // console.log(item.name);

        }
      })
      //  吧对象变成数组？
      for (let [k, v] of Object.entries(d)) {

        blocks.push({
          title: k.toUpperCase(),
          city: v
        })
      }
      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      self.block = blocks


    }

  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/categroy.scss";
</style>
