<template>
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
              :disabled="use"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="Number of random values">
            <el-input-number
              v-model="formInline.random"
              size="small"
              :disabled="use"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="X intervals">
            <el-input-number
              v-model="formInline.x"
              size="small"
              :disabled="use"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="Refresh rate">
            <el-input-number
              v-model="formInline.rate"
              size="small"
              :disabled="use"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="T=">
            <el-input-number
              v-model="formInline.T"
              size="small"
              :disabled="use"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="Maximum">
            <el-input-number
              v-model="formInline.maximum"
              size="small"
              :disabled="use"
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
          <el-button type="success">Continue</el-button>
          <el-button type="danger">STOP</el-button>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Panel',

  props: {
    chartTitle: {
      type: String,
      default: '',
    },
    chartsData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      use: false,
      formInline: {
        minimum: 0,
        random: 10000,
        x: 20,
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
        this.$emit('getRandomNumber', arr);
      }

      //       if(this.use === false) {

      //   for  (  let i = 0;     i<  10000  ;  i++ )

      //                   {      let    r  =   Math.random();   //  r = 0....1 / random number

      //                           let   index =   parseInt(r  * 20) ;

      //                          histogram[  index ]  ++ ;   // increment histogramm cell by one

      //                 }

      //     show_diagramm ( histogram ) ;   // show  20 intervals in YOUR diagramm !

      //  }
    },
  },
};
</script>

<style lang="scss">
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
