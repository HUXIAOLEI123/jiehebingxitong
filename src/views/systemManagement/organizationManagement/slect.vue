<template>
  <div class="nav">
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import { getRegionsList } from '@/api/organizationManagement'
export default {
  name: 'Slect',
  data() {
    return {
      value: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'RegionName'
      }
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    async getlist() {
      let option = { Reg_RegionCode: '360000000000' }
      let res = await getRegionsList(option)
      if (res.StatusCode == 200) {
        this.data = res.Response.items
        if(data.RegionCode){
          await getRegionsList(data.RegionCode)
        }
      }
    },
    async handleNodeClick(data) {
      let op={Reg_RegionCode:data.RegionCode}
      let res=await getRegionsList(op)
      if(res.StatusCode==200){
        let arr=[...res.Response.items]
        arr.shift()
        this.$set(data,'children',arr)
      }
    }
  }

}
</script>

<style>

</style>