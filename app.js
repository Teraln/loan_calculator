// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //Hide results
  document.getElementById('results').style.display = 'none';
  //Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

//Calculate Results
function calculateResults(){
  console.log('Calculating...');
  //UI Vars
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthlyPayment = document.getElementById('monthly-payment');
  const UItotalPayment = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');
  
  //Calculation variables

  const principal = parseFloat(UIamount.value)
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  //Compute Monthly Payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x-1);

  if(isFinite(monthly)){
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2)
    UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    //Show results
    document.getElementById('results').style.display = 'block';
    //Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers')
  }
}

  //Show Error
  function showError(error){
    //Show results
    document.getElementById('results').style.display = 'none';
    //Hide loader
    document.getElementById('loading').style.display = 'none';

    //Create a div
    const errDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errDiv.className = 'alert alert-danger'

    //Create text node and append to div
    errDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errDiv, heading);

    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
  }

  //clearError function
  function clearError(){
    document.querySelector('.alert').remove();
  }