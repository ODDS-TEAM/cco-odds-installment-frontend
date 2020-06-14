import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import VueCurrencyFilter from 'vue-currency-filter'

Vue.config.productionTip = false
Vue.filter("toFixedTwoDigit", function (value) {
  return value.toFixed(2)
});
Vue.use(VueCurrencyFilter,
  {
    symbol: '฿',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
  })

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
