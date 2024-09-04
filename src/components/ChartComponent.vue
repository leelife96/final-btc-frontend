<template>
  <div class="chart-container">
    <div class="interval-selector">
      <button
        v-for="interval in intervals"
        :key="interval.value"
        @click="changeInterval(interval.value)"
      >
        {{ interval.label }}
      </button>
    </div>
    <apexchart
      v-if="klineData.length"
      type="candlestick"
      :options="chartOptions"
      :series="chartSeries"
      class="chart"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "ChartComponent",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    klineData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedInterval: "1d", // 기본값을 1일로 설정
      intervals: [
        { value: "1m", label: "1분" },
        { value: "3m", label: "3분" },
        { value: "15m", label: "15분" },
        { value: "1h", label: "1시간" },
        { value: "4h", label: "4시간" },
        { value: "1d", label: "1일" },
      ],
      chartOptions: {
        chart: {
          type: "candlestick",
          height: 350,
          animations: {
            enabled: true,
            easing: "easeinout",
            dynamicAnimation: {
              speed: 1000, // 1초 간격으로 업데이트
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
      },
    };
  },
  computed: {
    chartSeries() {
      return [
        {
          name: "BTC/USDT",
          data: this.klineData,
        },
      ];
    },
  },
  methods: {
    changeInterval(interval) {
      this.selectedInterval = interval;
      this.$emit("interval-changed", interval); // 부모 컴포넌트에 변경 사항 전달
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 50%;
  margin: 0 auto;
}

.interval-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.interval-selector button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
