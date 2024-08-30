<template>
  <div class="coin-container">
    <h2>암호 화폐 시세</h2>
    <div v-if="prices">
      <p>비트코인 (BTC): {{ formatCurrency(prices.BTC.KRW.PRICE) }} KRW</p>
      <p>이더리움 (ETH): {{ formatCurrency(prices.ETH.KRW.PRICE) }} KRW</p>
      <p>리플 (XRP): {{ formatCurrency(prices.XRP.KRW.PRICE) }} KRW</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinComponent",
  data() {
    return {
      prices: null,
      updateInterval: 1000, // 10초마다 갱신
      intervalId: null,
    };
  },
  created() {
    this.fetchPrices(); // 컴포넌트 생성 시 데이터 가져오기
    this.startPriceUpdate();
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // 컴포넌트 언마운트 시 인터벌 정리
    }
  },
  methods: {
    async fetchPrices() {
      try {
        const response = await fetch(
          "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP&tsyms=KRW&api_key=47b578b67dc50fb06d07bd342b7e513845e7010437ea66d497d566ea1d1da558"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.prices = data.RAW; // 데이터의 RAW 부분을 저장
      } catch (error) {
        console.error("Failed to fetch prices:", error);
      }
    },
    startPriceUpdate() {
      this.fetchPrices(); // 초기 데이터 가져오기
      this.intervalId = setInterval(() => {
        this.fetchPrices(); // 주기적으로 데이터 가져오기
      }, this.updateInterval);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat().format(value.toFixed(2)); // 숫자를 한국 원화 형식으로 포맷팅
    },
  },
};
</script>

<style scoped>
.coin-container {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
