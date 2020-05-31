<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <div class="text">
        <el-form :inline="true" :model="formInline">
          <el-row>
            <el-button type="primary" @click="onStart">Start</el-button>
            <el-button type="success" @click="onContinue">Continue</el-button>
            <el-button type="danger" @click="onStop">STOP</el-button>

            <el-form-item label="Distribution" class="no-margin margin-left">
              <el-select
                v-model="distribution"
                size="small"
                placeholder="Please select"
                @change="selectChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="A="
              class="no-margin"
              v-show="distribution === 1"
            >
              <el-input
                v-model="formInline.a"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="B="
              class="no-margin"
              v-show="distribution === 1"
            >
              <el-input
                v-model="formInline.b"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="count="
              class="no-margin"
              v-show="distribution === 2"
            >
              <el-input
                v-model="formInline.count"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="My="
              class="no-margin"
              v-show="distribution === 3"
            >
              <el-input
                v-model="formInline.my"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="Sigma="
              class="no-margin"
              v-show="distribution === 3"
            >
              <el-input
                v-model="formInline.sigma"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="lambda="
              class="no-margin"
              v-show="distribution === 4"
            >
              <el-input
                v-model="formInline.lambda"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card" shadow="hover">
      <div>
        <highcharts :options="chartOptions" ref="highchart"></highcharts>
      </div>
    </el-card>

    <el-card class="box-card" shadow="hover">
      <div class="text">
        <el-form :inline="true" :model="formInline">
          <el-row>
            <el-form-item label="Minimum">
              <el-input
                v-model="formInline.minimum"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item label="Number of random values">
              <el-input
                v-model="formInline.random"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item label="X intervals">
              <el-input
                v-model="formInline.intervals"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item label="Refresh rate">
              <el-input
                v-model="formInline.rate"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item label="T=">
              <el-input
                v-model="formInline.T"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>

            <el-form-item label="Maximum">
              <el-input
                v-model="formInline.maximum"
                size="small"
                class="short"
              ></el-input>
            </el-form-item>
          </el-row>

          <el-row style="margin-top: 15px">
            <el-form-item label="Use random generator">
              <el-switch v-model="use"> </el-switch>
            </el-form-item>

            <el-form-item label="Xn+1 = (" class="margin-left">
              <el-input
                v-model="formInline.n1"
                size="small"
                class="short"
                :disabled="!use"
              ></el-input>
            </el-form-item>

            <el-form-item label="* Xn +">
              <el-input
                v-model="formInline.xn"
                size="small"
                class="short"
                :disabled="!use"
              ></el-input>
            </el-form-item>

            <el-form-item label=") mod">
              <el-input
                v-model="formInline.mod"
                size="small"
                class="short"
                :disabled="!use"
              ></el-input>
            </el-form-item>

            <el-form-item label="with X0=">
              <el-input
                v-model="formInline.x0"
                size="small"
                class="short"
                :disabled="!use"
              ></el-input>
            </el-form-item>
          </el-row>
        </el-form>
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
      arr: [],
      isFirst: true,
      isRun: false,
      use: false,
      formInline: {
        minimum: 0,
        random: 100,
        intervals: 20,
        rate: 200,
        T: 3.4756,
        maximum: 3,
        n1: 33,
        xn: 101,
        mod: 6543,
        x0: 6543,
        count: 3,
        a: 1,
        b: 5,
        my: 4,
        sigma: 1,
        lambda: 1,
      },

      // For selection
      options: [
        {
          value: 0,
          label: 'Uniform in [0,1]',
        },
        {
          value: 1,
          label: 'Uniform in [A,B]',
        },
        {
          value: 2,
          label: 'Sum of Uniform Values',
        },
        {
          value: 3,
          label: 'Normal',
        },
        {
          value: 4,
          label: 'Exponential',
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
          text: 'Distrbution: Uniform in [0,1]',
        },
        lang: {
          noData: 'Nichts zu anzeigen',
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
    calculate(range0, range1, type) {
      let x = this.formInline.x0;
      let count = this.formInline.count;
      let index = 0;
      const series = this.$refs.highchart.chart.series[0];
      const random = this.formInline.random;
      const rate = this.formInline.rate;
      const intervals = this.formInline.intervals;
      const maximum = this.formInline.maximum;
      const n1 = this.formInline.n1;
      const xn = this.formInline.xn;
      const mod = this.formInline.mod;
      const my = this.formInline.my;
      const sigma = this.formInline.sigma;
      const lambda = this.formInline.lambda;

      if (this.isFirst) {
        this.arr.length = +maximum + 1;
        this.arr.fill(0, 0, +maximum + 1);
        this.isFirst = !this.isFirst;
      }

      this.timeId = timer.setInterval(() => {
        // It's the same end condition as yours randomNumber
        // I just changed while into setInterval here
        if (count >= random) {
          this.isRun = false;
          timer.clearInterval(this.timeId);
          timer.reset(this.timeId);
          return;
        }
        count++;
        this.isRun = true;
        for (let i = 0; i < rate; i++) {
          let r = 0;
          if (this.use === true) {
            x = (n1 * x + xn) % mod;
            r = x;
          } else {
            r = Math.random();
          }

          if (type === 'normal') {
            // following the formula: X mit N(μ, σ ^ 2) = μ + Z * σ ^ 2 in the lecture
            index = parseInt((my + r * sigma * sigma) * intervals);
          } else if (type === 'exponential') {
            // following the formula: f(y)= λe ^ (-λx) for x>0, or 0 in the lecture
            index = parseInt(
              lambda * Math.pow(Math.E, -lambda * r) * intervals
            );
          } else {
            // following the pseudocode you gave me last time.
            index = parseInt(r * intervals);
          }

          if (index >= range0 && index <= range1) {
            this.arr[index]++;
          }
        }
        series.setData(this.arr); // render
        console.log(count); // if I set random as 100, count will end with 100. You could check it in console
      }, 0);
    },

    onStart() {
      const distribution = this.distribution;
      const minimum = this.formInline.minimum;
      const maximum = this.formInline.maximum;
      const a = this.formInline.a;
      const b = this.formInline.b;
      switch (distribution) {
        case 0:
          this.calculate(0, 1, '');
          break;
        case 1:
          this.calculate(a, b, '');
          break;
        case 2:
          this.calculate(minimum, maximum, '');
          break;
        case 3:
          this.calculate(minimum, maximum, 'normal');
          break;
        case 4:
          this.calculate(minimum, maximum, 'exponential');
          break;
        default:
          this.calculate(minimum, maximum);
      }
    },

    onContinue() {
      if (this.isRun) {
        timer.resume(this.timeId);
      } else {
        this.onStart();
      }
    },

    onStop() {
      // timer.pause(this.timeId);
      this.isRun = false;
      this.isFirst = true;
      timer.clearInterval(this.timeId);
      timer.reset(this.timeId);
    },

    selectChange(event) {
      this.chartOptions.title.text =
        'Distrbution: ' + this.options[event].label;
    },
  },
};
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 0 !important;

  &.margin-left {
    margin-left: 30px;
  }
}

.box-card {
  width: 100%;
  margin-bottom: 20px;

  .text {
    font-size: 14px;
  }
}

.el-select {
  width: 220px;
}

.short {
  width: 70px !important;
}
</style>
