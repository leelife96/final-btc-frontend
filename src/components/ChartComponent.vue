<template>
  <div class="chart-container">
    <!-- 제목을 추가하여 BTC/USDT 차트임을 명시 -->
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
  width: 60%; /* 차트 너비를 약간 더 넓게 조정 */
  margin: 0 auto;
  margin-bottom: 20px;
  background-color: #1e1e2f; /* 배경을 약간 어둡게 설정 */
  padding: 20px; /* 내부 패딩 추가 */
  border-radius: 10px; /* 둥근 모서리 추가 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5); /* 그림자 효과 추가 */
}

.chart-title {
  text-align: center;
  color: #f0b90b; /* Binance 노란색으로 제목 강조 */
  margin-bottom: 15px; /* 제목과 버튼 사이의 여백 추가 */
  font-size: 24px; /* 제목 크기 확대 */
}

.interval-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.interval-selector button {
  margin: 0 5px;
  padding: 8px 15px; /* 버튼 크기 조정 */
  cursor: pointer;
  border: 2px solid #f0b90b; /* 노란색 테두리 추가 */
  border-radius: 5px;
  background-color: #2c2c3c; /* 버튼 배경 어둡게 */
  color: #ffffff;
  font-weight: bold; /* 텍스트 굵게 */
  transition: background-color 0.3s, color 0.3s;
}

.interval-selector button.active {
  background-color: #f0b90b; /* 선택된 버튼을 노란색으로 강조 */
  color: #1e1e2f; /* 선택된 버튼 텍스트 색상 변경 */
}

.interval-selector button:hover {
  background-color: #f0b90b; /* 호버 시 노란색으로 변경 */
  color: #1e1e2f;
}
</style>
