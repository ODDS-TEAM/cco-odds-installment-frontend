<template>
  <div>
    <v-row justfy="center">
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">{{loan.title}}</v-card-title>
          <v-card-text class="headline font-weight-medium">{{loan.total | currency}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">คืนแล้ว</v-card-title>
          <v-card-text class="headline font-weight-medium">{{remainingAmount | currency}}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card class="mx-auto" max-width="344" height="150">
          <v-card-title class="justify-center font-weight-bold headline">คงเหลือ</v-card-title>
          <v-card-text
            class="headline font-weight-medium"
          >{{loan.total - remainingAmount | currency}}</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="table-width mt-10">
      <v-data-table
        :headers="headers"
        :items="loan.installments"
        class="elevation-3"
        hide-default-footer
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ผ่อน 0% กี่เดือนก็ได้จนกว่าจะหมด</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">อ่ะ</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">เท่าไหร่ดี</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="installment.submitDate" label="วันที่โอน"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="installment.amount" label="จำนวนเงิน"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="installment.remark" label="หมายเหตุ"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import loanService from '../services/loan-service'
export default {
  name: 'IndevidualLoan',
  data() {
    return {
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
      loan: {
        total: 0
      },
      dialog: false,
      installment: {
        submitDate: new Date(),
        amount: 0,
        remark: '-',
        loanId: ''
      }
      //   remainingAmount: 0
    }
  },
  mounted() {
    this.getLoanById()
  },
  methods: {
    getLoanById() {
      return loanService.getLoanById(this.$route.params.id).then(loan => {
        this.loan = loan
      })
    },
    close() {
      this.dialog = false
    },
    save() {
      this.installment.loanId = this.$route.params.id
      loanService.addInstallmentItem(this.installment).then(() => {
        return this.getLoanById().then(() => {
          this.dialog = false
        })
      })
    }
  },
  computed: {
    remainingAmount: function() {
      let amount = 0
      if (this.loan.installments) {
        this.loan.installments.forEach(tnx => {
          amount += tnx.amount
        })
      }
      return amount
    }
  }
}
</script>