import Vue from "vue";
import moment from 'moment';
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true;
  Vue.mixin({
    data() {
      return {};
    },
    computed: {},
    methods: {
      formatPrice(value){
        const val = (value / 1).toFixed(0).replace(",", ".");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      currency(data) {
        return this.$test(data, { precision: 0, symbol: "₭" }).format();
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
      formatDateBill(date) {
        return moment(date).format('DD/MM/YYYY, HH:mm:ss');
      },
    },
  });
}
