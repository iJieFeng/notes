<template>
  <div class="top-view-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <total-sales></total-sales>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-orders></total-orders>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <today-users></today-users>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-users></total-users>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TodayUsers from "../TodayUsers";
import TotalOrders from "../TotalOrders";
import TotalSales from "../TotalSales";
import TotalUsers from "../TotalUsers";
export default {
  components: {
    TodayUsers,
    TotalOrders,
    TotalSales,
    TotalUsers,
  },
};
</script>

<style lang="scss" scoped>
</style>
