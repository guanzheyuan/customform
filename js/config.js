var $IP ='http://localhost:8081/customer';
var configJson = {
    loadZWURL:{
        customerFormList:$IP+'/estCustomerform/queryCustomerform',
        customer:$IP+'/estCustomerformContent/getNewByCid/',
        saveCustomer:$IP+'/estCustomerformContent/insert',
        insertCustomer:$IP+'/estCustomerform/insert'
    }
}