<template>
    <div class="createactivity">
<el-form ref="form" :model="form" label-width="80px" size="medium ">
  <el-form-item label="公司名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="截至时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.startdate1" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>

   <el-form-item label="公司规模" >
    <el-input v-model="form.num" ></el-input>
  </el-form-item>

  <el-form-item label="公司类型">
    <el-radio-group v-model="form.type">
      <el-radio label="娱乐"></el-radio>
      <el-radio label="运动"></el-radio>
       <el-radio label="志愿者"></el-radio>
        <el-radio label="官方"></el-radio>
    </el-radio-group>
     </el-form-item>

  <el-form-item label="公司简介">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">确定</el-button>
  </el-form-item>
</el-form>

    </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          startdate1: '',
          startdate2: '',
          enddate1: '',
          enddate2: '',
          impose: false,
          num:0,
          type: '',
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
