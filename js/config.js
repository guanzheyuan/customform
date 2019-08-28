var $IP ='http://localhost:8081/customer';
var $JJIP = 'http://10.45.67.181:38080';
var configJson = {
    loadZWURL:{
        customerFormList:$IP+'/estCustomerform/queryCustomerDirform',
        customer:$IP+'/estCustomerformContent/getNewByCid/',
        saveCustomer:$IP+'/estCustomerformContent/insert',
        insertCustomer:$IP+'/estCustomerform/insert',
        updateCustomer:$IP+'/estCustomerform/update'
    },
    loadJJURl:{
        loadForm:$JJIP+'/formdesign/getAllCustomForm',
        updateForm:$JJIP+'/formdesign/updateCustomForm'
    }
}