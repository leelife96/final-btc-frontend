<template>
  <div class="chart-container">
    <h2 class="chart-title">BTC/USDT Chart</h2>

    <!-- 시간 간격 선택 버튼들 -->
    <div class="interval-selector">
      <button
        v-for="interval in intervals"
        :key="interval.value"
        :class="{ active: interval.value === selectedInterval }"
        @click="changeInterval(interval.value)"
      >
        {{ interval.label }}
      </button>
    </div>

    <!-- 차트 -->
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
  width: 60%;
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: #1e1e2f;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.chart-title {
  text-align: center;
  color: #f0b90b;
  margin-bottom: 15px;
  font-size: 24px;
}

.interval-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.interval-selector button {
  margin: 0 5px;
  padding: 8px 15px;
  cursor: pointer;
  border: 2px solid #f0b90b;
  border-radius: 5px;
  background-color: #2c2c3c;
  color: #ffffff;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.interval-selector button.active {
  background-color: #f0b90b;
  color: #1e1e2f;
}

.interval-selector button:hover {
  background-color: #f0b90b;
  color: #1e1e2f;
}
</style>
