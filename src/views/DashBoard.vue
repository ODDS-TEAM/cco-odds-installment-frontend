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
          <v-card-text class="headline font-weight-medium">{{allLoan.totalPaidAmount | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">ยอดหนี้คงเหลือ</v-card-title>
          <v-card-text class="headline font-weight-medium">{{allLoan.totalRemainingAmount | toFixedTwoDigit}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="d-flex justify-center mt-10">
      <div class="search mt-10">
        <v-text-field v-model="serach" label="ค้นหารายชื่อ" outlined 
        :rules="{}"
        ></v-text-field>
      </div>
      <div class="ma-10">
        <v-btn @click="serachUser(serach)"  class="text-justify" x-large color="success">ค้นหา</v-btn>
      </div>
    </div>
    <div class="table-width mt-10">
      <v-data-table
        disable-sort
        :headers="headers"
        :items="userList"
        class="elevation-3"
        hide-default-footer
      >
        <template  v-slot:item.name="{ item }">{{item.firstName}} {{item.lastName}}</template>
        <template  v-slot:item.buttun="{  }">
          <v-chip color="green" dark>รายละเอียด</v-chip>
        </template>
        <template v-slot:item.totalLoan="{item}">{{item.totalLoan | toFixedTwoDigit}}  </template>
        <template v-slot:item.paidAmount="{item}">{{item.paidAmount | toFixedTwoDigit}}  </template>
        <template v-slot:item.remainingAmount="{item}">{{item.remainingAmount | toFixedTwoDigit}}  </template>
        
      </v-data-table>
    </div>
  </div>
</template>


<script>
import userService from "../services/user-service";
export default {
  name: 'DashBoard',
  props: {
    msg: String
  },
  data() {
    return {
      serach: "",
      headers: [
        { text: 'ชื่ิอ-นามสกุล', value: 'name', class: "title font-weight-bold" },
        { text: 'ยอดหนี้', value: 'totalLoan', class: "title font-weight-bold" },
        { text: 'ยอดคืน', value: 'paidAmount', class: "title font-weight-bold" },
        { text: 'ยอดหนี้คงเหลือ', value: 'remainingAmount', class: "title font-weight-bold" },
        { text: '', value: 'buttun', class: "title font-weight-bold" },
      ],
      muckup: {
        list: {
          firstname: "isaman",
          lastname: "s. nam",
          lone: 30000.00,


        }


      },

      allLoan: {
        "totalDebt": 0, "totalPaidAmount": 0, "totalRemainingAmount": 0
      },
      userList: []
    }

  },
  watch: {
    serach: function (value) {
     if (value.length == 0) {
        this.getUserList()
      }

    }
  },
  mounted() {
    this.getFinancials()
    this.getUserList()
  },
  methods: {
    getUserList() {
      userService.getUserList().then(
        response => {
          this.userList = response.data
        }
      )
    },
    getFinancials() {
      userService.getTotalLoan().then(res => {
        this.allLoan = res.data[0]
      
      })
    },
    serachUser(name) {
      
      if (name.length >= 3) {
        userService.getUserByName(name).then(res => {
          this.userList = res.data
        })
      }
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