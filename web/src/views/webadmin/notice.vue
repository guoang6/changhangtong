<template>
  <div class="notice">
    <h3>未读消息：0</h3>
    <el-divider></el-divider>
    <div style="position:relative">
      <div
        style="width:10px;height:10px;border-radius:50%;background-color:red;display:inline-block"
      ></div>
      <span style="margin-left:20px">2020-2-2 5:5:20</span>
      <span style="margin-left:20px">少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
      <i class="el-icon-delete del"></i>
      <el-divider></el-divider>
    </div>
  </div>
</template>
<style  scoped>
.del {
  position: absolute;
  right: 40px;
  top: 4px;
}
</style>