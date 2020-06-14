import axios from "../plugins/axios";
function getAllLoans() {
    return axios.get('/loans').then(loans => {
        return loans.data
    })
}

async function getAllInstallmentsById(loanId) {
    // return axios.get('/loans/' + loanId).then(tnx => {
    //     return tnx.data
    // })
    console.log(loanId);
    return [
        {
            submitDate: new Date(),
            amount: 100,
            remark: "Yeah!"
        }
    ]
}


export default {
    getAllLoans,
    getAllInstallmentsById
};