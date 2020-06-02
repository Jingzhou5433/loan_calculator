    const loan_amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

document.getElementById('loan-form').addEventListener('submit', function(e){
    console.log(loan_amount.value)
    if(loan_amount.value==='' || interest.value ==='' || years.value === ''){
        console.log("in if ~~~")
        showError("Incomplete enter!");
        e.preventDefault();
        return;
    }
    
    //hide loading and show results
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'block';
    
    setTimeout(calculate, 2000);
    e.preventDefault();

});

function calculate(){
    console.log("test...");

    // get UI var
    // const loan_amount = document.getElementById('amount');
    // const interest = document.getElementById('interest');
    // const years = document.getElementById('years');

    const monthly_payment = document.getElementById('monthly-payment');
    const total_payment = document.getElementById('total-payment');
    const total_interest = document.getElementById('total-interest');

    const cal_amount = parseFloat(loan_amount.value);
    const cal_interest = parseFloat(interest.value)/100/12;
    const cal_payment = parseFloat(years.value) * 12

    const x = Math.pow(1 + cal_interest, cal_payment);
    const monthly = (cal_amount *x*cal_interest)/(x-1);
    // console.log(monthly);
    // console.log(isFinite(monthly));
    let flag = isFinite(monthly);
    if(flag){
        console.log("In if...");
        monthly_payment.value = monthly.toFixed(2);
        total_payment.value = (monthly * cal_payment).toFixed(2);
        total_interest.value = ((monthly * cal_payment)-cal_amount).toFixed(2);

        //hide loading and show results
        document.querySelector('#results').style.display = 'block';
        document.querySelector('#loading').style.display = 'none';
    }else{
        //console.log("There is an error, please check your number..");
        showError("please check your number");
    }
    
}

function showError(error){
    //hide loading and results
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';

    if (document.querySelector('.alert') === null){

        //create div element
        const error_div = document.createElement('div');
        error_div.role = 'alert'
        error_div.className = 'alert alert-danger';
        error_div.appendChild(document.createTextNode(error));

        const card = document.querySelector('.card');
        const headind = document.querySelector('.heading')

        //insert error above heading
        card.insertBefore(error_div,headind);

        //clera error after 3 secs
        setTimeout(removeAlert, 2000);

    }    
}

function removeAlert(){
    document.querySelector('.alert').remove();
}