<template>
  <el-container>
    <el-header>
      <div class="container head">
        <i class="el-icon-data-line"></i>
        <span>Simulation System</span>
      </div>
    </el-header>
    <el-main>
      <div class="container">
        <chart />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Chart from '../../components/chart';
export default {
  name: 'Index',
  components: {
    Chart,
  },
};
</script>

<style lang="scss">
@import './../../assets/normalize.scss';

.el-header {
  height: 100% !important;
}

.container {
  padding: 0 150px;

  &.head {
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 38px;
    font-weight: 100;

    span {
      margin-left: 20px;
    }
  }
}
</style>
