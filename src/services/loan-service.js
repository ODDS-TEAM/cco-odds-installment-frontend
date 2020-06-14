import axios from "../plugins/axios";
function getAllLoans() {
    return axios.get('/loans').then(loans => {
        return loans.data
    })
}

async function getLoanById(loanId) {
    return axios.get('/loans/' + loanId).then(tnx => {
        return tnx.data
    })
}

async function addInstallmentItem(installment) {
    return axios.post('loans/' + installment.loanId + '/installments', installment)
}

function getTotalPaidAmount() {
    return axios.get('/loans/amount/remaining').then((res) => {
        return res.data
    })
}

export default {
    getAllLoans,
    getLoanById,
    addInstallmentItem,
    getTotalPaidAmount
};