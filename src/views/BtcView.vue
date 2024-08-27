<template>
  <div>
    <h1>Bitcoin Price: {{ bitcoinPrice }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bitcoinPrice: null,
      ws: null,
    };
  },
  mounted() {
    this.ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.bitcoinPrice = data.p;
    };
  },
  beforeDestroy() {
    if (this.ws) {
      this.ws.close();
    }
  },
};
</script>
