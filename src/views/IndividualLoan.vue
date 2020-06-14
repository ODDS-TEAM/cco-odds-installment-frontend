<template>
  <div>
    <h1>{{loanTitle}}</h1>
    <v-row justfy="center">
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">{{loanTitle}}</v-card-title>
          <v-card-text class="headline font-weight-medium">{{1.00 | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">คืนแล้ว</v-card-title>
          <v-card-text class="headline font-weight-medium">{{1 | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">คงเหลือ</v-card-title>
          <v-card-text class="headline font-weight-medium">{{1 | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="table-width mt-10">
      <div class="table-width mt-10">
        <v-data-table
          disable-sort
          :headers="headers"
          :items="installments"
          class="elevation-3"
          hide-default-footer
        ></v-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import loanService from '../services/loan-service'
export default {
  name: 'IndevidualLoan',
  data() {
    return {
      loanTitle: 'MBP for ATB',
      headers: [
        {
          text: 'วันที่',
          value: 'submitDate'
        },
        {
          text: 'ยอด',
          value: 'amount'
        },
        {
          text: 'หมายเหตุ',
          value: 'remark'
        }
      ],
      installments: []
    }
  },
  mounted() {
    loanService.getAllInstallmentsById(this.$route.params.id).then(tnx => {
      this.installments = tnx
    })
  }
}
</script>