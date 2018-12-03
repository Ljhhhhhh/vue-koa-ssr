<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <iselect/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">

        <hot/>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category/>
      </el-col>
    </el-row>
  </div>


</template>

<script>
  import iselect from '@/components/changeCity/iselect'
  import hot from '@/components/changeCity/hot'
  import category from '@/components/changeCity/category'

  export default {
    name: "ChangeCity",
    components: {
      iselect, hot, category
    }
  }
</script>

<style lang="css">

</style>
