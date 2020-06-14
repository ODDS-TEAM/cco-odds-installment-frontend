<template>
  <div class="mt-10">
    <v-row justfy="center">
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">รวมทั้งหมด</v-card-title>
          <v-card-text class="headline font-weight-medium">{{allLoan.totalDebt | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">คืนแล้ว</v-card-title>
          <v-card-text
            class="headline font-weight-medium"
          >{{allLoan.totalPaidAmount | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">คงเหลือ</v-card-title>
          <v-card-text
            class="headline font-weight-medium"
          >{{allLoan.totalDebt - allLoan.totalPaidAmount | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="table-width mt-10">
      <v-card-title>
        รายการ
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="loans" :search="search" class="elevation-3">
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
      search: '',
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