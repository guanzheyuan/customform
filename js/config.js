var $IP ='http://10.45.67.193:8580/customer';
var $JJIP = 'http://10.45.67.181:38080';
var configJson = {
    loadZWURL:{
        customerFormList:$IP+'/estCustomerform/queryCustomerDirform',
        customerFormListEconomics:$IP+'/estCustomerform/queryCustomerformDir',
        customer:$IP+'/estCustomerformContent/getNewByCid/',
        saveCustomer:$IP+'/estCustomerformContent/insert',
        insertCustomer:$IP+'/estCustomerform/insert',
        updateCustomer:$IP+'/estCustomerform/update',
        deleteRow:$IP+'/estCustomerform/delete/'
    },
    loadJJURl:{
        loadForm:$JJIP+'/formdesign/getAllCustomForm',
        updateForm:$JJIP+'/formdesign/updateCustomForm'
    }
}