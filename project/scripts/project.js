const menuButton = document.querySelector('#menu-button');
const navMenu = document.querySelector('#nav-menu');
const yearSpan = document.querySelector('#year');
const warningList = document.querySelector('#warning-list');
const carForm = document.querySelector('#car-form');
const result = document.querySelector('#result');
const savedResult = document.querySelector('#saved-result');

if (menuButton && navMenu) {
  menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

if (yearSpan) {
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
}

const redFlags = [
  'Warning lights stay on after startup.',
  'The title does not match the VIN.',
  'There are signs of leaks under the engine.',
  'The transmission shifts hard or slips.',
  'The seller avoids questions about maintenance.',
  'The tires show uneven wear patterns.'
];

if (warningList) {
  redFlags.forEach((flag) => {
    const listItem = document.createElement('li');
    listItem.textContent = flag;
    warningList.appendChild(listItem);
  });
}

function calculateInitialCost(price, tax, registration) {
  return price + tax + registration;
}

function calculateMonthlyCost(insurance, fuel, maintenance) {
  return insurance + fuel + maintenance;
}

function createCarObject(model, price, tax, registration, insurance, fuel, maintenance) {
  return {
    model,
    price,
    tax,
    registration,
    insurance,
    fuel,
    maintenance
  };
}

function displayCalculation(carData) {
  const costValues = [carData.insurance, carData.fuel, carData.maintenance];
  const monthlyCategories = ['Insurance', 'Fuel', 'Maintenance'];

  const monthlyBreakdown = costValues.map((value, index) => {
    return `<li>${monthlyCategories[index]}: $${value.toFixed(2)}</li>`;
  }).join('');

  const initialCost = calculateInitialCost(carData.price, carData.tax, carData.registration);
  const monthlyCost = calculateMonthlyCost(carData.insurance, carData.fuel, carData.maintenance);

  let advice = '';
  if (monthlyCost >= 700) {
    advice = 'This vehicle may be expensive to own each month. Review your budget carefully.';
  } else if (monthlyCost >= 400) {
    advice = 'This vehicle has a moderate monthly ownership cost.';
  } else {
    advice = 'This vehicle appears to have a lower monthly ownership cost.';
  }

  return `
    <h4>${carData.model}</h4>
    <p><strong>Initial Purchase Cost:</strong> $${initialCost.toFixed(2)}</p>
    <p><strong>Estimated Monthly Cost:</strong> $${monthlyCost.toFixed(2)}</p>
    <p><strong>Budget Advice:</strong> ${advice}</p>
    <ul>${monthlyBreakdown}</ul>
  `;
}

function saveCarEstimate(carData) {
  localStorage.setItem('savedCarEstimate', JSON.stringify(carData));
}

function loadSavedEstimate() {
  const savedData = localStorage.getItem('savedCarEstimate');

  if (savedData && savedResult) {
    const parsedData = JSON.parse(savedData);
    savedResult.innerHTML = displayCalculation(parsedData);
  } else if (savedResult) {
    savedResult.innerHTML = `<p>No saved estimate yet.</p>`;
  }
}

if (carForm) {
  carForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const model = document.querySelector('#carModel').value;
    const price = Number(document.querySelector('#price').value);
    const tax = Number(document.querySelector('#tax').value);
    const registration = Number(document.querySelector('#registration').value);
    const insurance = Number(document.querySelector('#insurance').value);
    const fuel = Number(document.querySelector('#fuel').value);
    const maintenance = Number(document.querySelector('#maintenance').value);

    const carData = createCarObject(
      model,
      price,
      tax,
      registration,
      insurance,
      fuel,
      maintenance
    );

    result.innerHTML = displayCalculation(carData);
    saveCarEstimate(carData);
    loadSavedEstimate();
  });
}

loadSavedEstimate();

const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('#nav-menu a');

navLinks.forEach((link) => {
  const linkPage = link.getAttribute('href');

  if (linkPage === currentPage) {
    link.classList.add('active-link');
  }
});
menuButton?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
  console.log('clicked', navMenu?.className);
});