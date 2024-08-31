<template>
  <div class="coin-container">
    <table v-if="prices.length" class="coin-table">
      <thead>
        <tr>
          <th>코인</th>
          <th>현재가 (USDT)</th>
          <th>현재가 (KRW)</th>
          <th>24시간 변동률 (%)</th>
          <th>24시간 거래량 (USDT)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coin in prices" :key="coin.symbol">
          <td>
            <div class="coin-info">
              <img
                :src="coinImages[coin.symbol.replace('USDT', '')]"
                alt=""
                class="coin-image"
              />
              <span>{{ coinNames[coin.symbol.replace("USDT", "")] }}</span>
            </div>
          </td>
          <td>${{ formatCurrency(coin.price) }}</td>
          <td>{{ formatCurrency(coin.priceKRW) }}</td>
          <td class="price-change-container">
            <span
              :class="{
                'price-change': true,
                'positive-change': coin.priceChangePercent > 0,
                'negative-change': coin.priceChangePercent < 0,
              }"
            >
              {{ coin.priceChangePercent }}%
            </span>
          </td>
          <td>{{ formatCurrency(coin.volume) }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import "../assets/styles/coin-component.css"; // CSS 파일 import

export default {
  name: "CoinComponent",
  data() {
    return {
      prices: [],
      updateInterval: 1000, // 1초마다 갱신
      intervalId: null,
      coinNames: {
        BTC: "비트코인(BTC)",
        ETH: "이더리움(ETH)",
        XRP: "리플(XRP)",
        SOL: "솔라나(SOL)",
        DOGE: "도지코인(DOGE)",
        TRX: "트론(TRX)",
        WLD: "월드코인(WLD)",
        BNB: "바이낸스코인(BNB)",
        AVAX: "아발란체(AVAX)",
        NEAR: "니어 프로토콜(NEAR)",
        MATIC: "폴리곤(MATIC)",
        LINK: "체인링크(LINK)",
        DOT: "폴카닷(DOT)",
        TON: "톤코인(TON)",
        ADA: "카르다노(ADA)",
        SUI: "Sui(SUI)",
      },
      coinImages: {
        BTC: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png",
        ETH: "https://w7.pngwing.com/pngs/268/1013/png-transparent-ethereum-eth-hd-logo.png",
        XRP: "https://www.business2community.com/kr/wp-content/uploads/sites/8/2022/05/xrp-logo-150x150.png",
        SOL: "https://images.therich.io/images/crypto_assets/SOL.png?timestamp=1636613891",
        DOGE: "https://i.namu.wiki/i/u6i7DVoL_l46S9Hyhltbhn3zdi9gzSJUWFyY6mRHH89RmIYRUPEVSydgDFYmg_WalAqY-y03TcG3Pb3s-o1xSw.webp",
        TRX: "https://cdn-icons-png.flaticon.com/512/12114/12114250.png",
        WLD: "https://i.namu.wiki/i/Gn-qr2Uh_JbUlHxHQZ6N9atTZxknKIjWtQrfaGaScMY6gZqFN0YorsyPNE9qGwhKMxD3A3tCj3Wh6DTzJLLDtg.svg",
        BNB: "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Binance-Coin-BNB-icon.png",
        AVAX: "https://www.business2community.com/kr/wp-content/uploads/sites/8/2022/05/Avalanche-900x900-1.png",
        NEAR: "https://img.cryptorank.io/coins/60x60.near_protocol1704147268278.png",
        MATIC: "https://s2.coinmarketcap.com/static/img/coins/200x200/3890.png",
        LINK: "https://s2.coinmarketcap.com/static/img/coins/200x200/1975.png",
        DOT: "https://img.cryptorank.io/coins/60x60.polkadot1639725340958.png",
        TON: "https://public.bnbstatic.com/image/pgc/202408/67eea2f62141d11a7afd882e371305dc.png",
        ADA: "https://s3.coinmarketcap.com/static-gravity/image/4aec70f6f1254e4f89650cc68ae49f3c.png",
        SUI: "https://s2.coinmarketcap.com/static/img/coins/200x200/20947.png",
      },
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
        // 가격, 변동률 및 거래량 데이터 가져오기
        const binanceResponse = await fetch(
          'https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","XRPUSDT","SOLUSDT","DOGEUSDT","TRXUSDT","WLDUSDT","BNBUSDT","AVAXUSDT","NEARUSDT","MATICUSDT","LINKUSDT","DOTUSDT","TONUSDT","ADAUSDT","SUIUSDT"]'
        );
        const cryptoCompareResponse = await fetch(
          "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP,SOL,DOGE,TRX,WLD,BNB,AVAX,NEAR,MATIC,LINK,DOT,TON,ADA,SUI&tsyms=KRW&api_key=YOUR_API_KEY"
        );

        if (!binanceResponse.ok || !cryptoCompareResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const binanceData = await binanceResponse.json();
        const cryptoCompareData = await cryptoCompareResponse.json();

        this.prices = binanceData.map((coin) => {
          const symbol = coin.symbol.replace("USDT", "");
          return {
            symbol: coin.symbol,
            price: coin.lastPrice,
            priceKRW: cryptoCompareData[symbol].KRW,
            priceChangePercent: coin.priceChangePercent,
            volume: coin.quoteVolume,
          };
        });
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
      return new Intl.NumberFormat().format(parseFloat(value).toFixed(2)); // 숫자를 한국 원화 형식으로 포맷팅
    },
  },
};
</script>
