<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix"><span>Setting</span></div>
      <div class="text item">
        <el-form :inline="true" :model="formInline">
          <el-row>
            <el-form-item label="Distribution">
              <el-select v-model="distribution" placeholder="Please select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="count=">
              <el-input-number
                v-model="formInline.count"
                size="small"
              ></el-input-number>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="Minimum">
              <el-input-number
                v-model="formInline.minimum"
                size="small"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="Number of random values">
              <el-input-number
                v-model="formInline.random"
                size="small"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="X intervals">
              <el-input-number
                v-model="formInline.intervals"
                size="small"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="Refresh rate">
              <el-input-number
                v-model="formInline.rate"
                size="small"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="T=">
              <el-input-number
                v-model="formInline.T"
                size="small"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="Maximum">
              <el-input-number
                v-model="formInline.maximum"
                size="small"
              ></el-input-number>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="Use random generator">
              <el-switch v-model="use"> </el-switch>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="Xn+1 = (">
              <el-input-number
                v-model="formInline.n1"
                size="small"
                :disabled="!use"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="* Xn +">
              <el-input-number
                v-model="formInline.xn"
                size="small"
                :disabled="!use"
              ></el-input-number>
            </el-form-item>

            <el-form-item label=") mod">
              <el-input-number
                v-model="formInline.mod"
                size="small"
                :disabled="!use"
              ></el-input-number>
            </el-form-item>

            <el-form-item label="with X0=">
              <el-input-number
                v-model="formInline.x0"
                size="small"
                :disabled="!use"
              ></el-input-number>
            </el-form-item>
          </el-row>

          <el-row>
            <el-button type="primary" @click="onStart">Start</el-button>
            <el-button type="success" @click="onContinue">Continue</el-button>
            <el-button type="danger" @click="onStop">STOP</el-button>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>Distrbution Result</span>
      </div>
      <div class="item">
        <highcharts :options="chartOptions" ref="highchart"></highcharts>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue';
import timer from '../../plugins/timer';

export default {
  name: 'Chart',
  components: {
    highcharts: Chart,
  },
  props: {
    randomNumber: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      use: false,
      formInline: {
        minimum: 0,
        random: 10000,
        intervals: 20,
        rate: 200,
        T: 3.4756,
        maximum: 3,
        n1: 33,
        xn: 101,
        mod: 6543,
        x0: 6543,
        count: 3,
      },

      // For selection
      options: [
        {
          value: 0,
          label: 'Sum of Uniform Values',
        },
      ],
      distribution: 0,

      // For highcharts
      chartOptions: {
        chart: {
          type: 'column',
          margin: [30, 0, 30, 0], // margin
          options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 100,
            viewDistance: 25,
          },
        },
        credits: {
          enabled: false,
        },
        title: {
          text: 'Distrbution: Sum of Uniform values',
        },
        lang: {
          noData: 'Nichts zu anzeigen', //真正显示的文本
        },
        plotOptions: {
          column: {
            depth: 25,
          },
        },

        series: [
          {
            data: [0],
          },
        ],
      },

      timeId: null,
    };
  },

  methods: {
    greenberger(x, n1, xn, mod) {
      x = (n1 * x + xn) % mod;
      return x;
    },

    onStart() {
      const arr = [];
      let x = this.formInline.x0;
      if (this.use === true) {
        for (let i = 0; i < this.formInline.count; i++) {
          x = this.greenberger(
            x,
            this.formInline.n1,
            this.formInline.xn,
            this.formInline.mod
          );
          arr.push(x);
        }
        this.chartOptions.series[0].data = arr;
      } else {
        let count = 0;
        const series = this.$refs.highchart.chart.series[0];
        const random = this.formInline.random;
        const rate = this.formInline.rate;
        const intervals = this.formInline.intervals;

        const data = [];
        data.length = intervals;
        data.fill(0, 0, intervals);

        this.timeId = timer.setInterval(() => {
          if (count >= random) {
            timer.clearInterval(this.timeId);
            timer.reset(this.timeId);
          }
          count++;
          for (let i = 0; i < rate; i++) {
            const r = Math.random();
            const index = parseInt(r * intervals);
            data[index]++;
          }
          // console.log(data);
          series.setData(data);
        }, 0);
      }
    },

    onContinue() {
      timer.resume(this.timeId);
    },

    onStop() {
      timer.pause(this.timeId);
    },
  },
};
</script>

<style lang="scss">
.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  margin-bottom: 20px;

  .item {
    margin-bottom: 18px;
  }

  .text {
    font-size: 14px;
  }
}

.el-select {
  width: 220px;
}
</style>
