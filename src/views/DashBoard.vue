<template>
  <div class="mt-10">
    <v-row justfy="center">
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">ยอดหนี้ทั้งหมด</v-card-title>
          <v-card-text class="headline font-weight-medium">{{allLoan.totalDebt | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">ยอดคืนทั้งหมด</v-card-title>
          <v-card-text
            class="headline font-weight-medium"
          >{{allLoan.totalPaidAmount | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">ยอดหนี้คงเหลือ</v-card-title>
          <v-card-text
            class="headline font-weight-medium"
          >{{allLoan.totalDebt - allLoan.totalPaidAmount | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <div class="d-flex justify-center mt-10">
      <div class="search mt-10">
        <v-text-field v-model="serach" outlined :rules="[rules.min]"></v-text-field>
      </div>
      <div class="ma-10">
        <v-btn @click="serachUser(serach)" class="text-justify" x-large color="success">ค้นหา</v-btn>
      </div>
    </div>-->
    <div class="table-width mt-10">
      <v-data-table
        disable-sort
        :headers="headers"
        :items="loans"
        class="elevation-3"
        hide-default-footer
      >
        <template v-slot:item.title="{item}">{{item.title}}</template>
        <template v-slot:item.date="{item}">{{item.date}}</template>
        <template v-slot:item.total="{item}">{{item.total}}</template>

        <template v-slot:item.actions="{item}">
          <v-icon class="mr-2" @click="seeDetail(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>


<script>
import loanService from '../services/loan-service'
export default {
  name: 'DashBoard',
  props: {
    msg: String
  },
  data() {
    return {
      serach: '',
      headers: [
        {
          text: 'รายการ',
          value: 'title'
        },
        {
          text: 'วันที่',
          value: 'date'
        },
        {
          text: 'ยอดเต็ม',
          value: 'total'
        },
        {
          text: 'Action',
          value: 'actions'
        }
      ],
      rules: {
        min: v => v.length >= 3 || 'โปรดกรอกชื่ออย่างน้อย 3 ตัวอักษร'
      },
      allLoan: {
        totalDebt: 0,
        totalPaidAmount: 0
      },
      loans: []
    }
  },
  mounted() {
    this.fetchLoans().then(() => {
      this.loans.forEach(eachLoad => {
        this.allLoan.totalDebt += eachLoad.total
      })
    })
  },
  methods: {
    fetchLoans() {
      return loanService.getAllLoans().then(loans => {
        this.loans = loans
      })
    },
    seeDetail(loan) {
      this.$router.push({ name: 'IndividualLoan', params: { id: loan._id } })
    }
  }
}
</script>

<style scoped >
.search {
  width: 500px;
}
.table-width {
  display: inline-table;
  width: 85%;
}

.table100 th {
  font-family: Montserrat-Medium;
  font-size: 36px;
  color: #fff;
  line-height: 1.4;
  text-transform: uppercase;

  background-color: #36304a;
}
</style>