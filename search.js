const cars = [
    { brand: 'McLaren', model: '720s', year: 2021, price: 250000 },
    { brand: 'Rolls-Royce', model: 'Wraith', year: 2022, price: 320000 },
    { brand: 'BMW', model: '850i', year: 2023, price: 150000 },
    { brand: 'Ferrari', model: 'Portofino', year: 2021, price: 300000 },
    { brand: 'Bentley', model: 'Continental GT', year: 2022, price: 280000 },
    { brand: 'Lexus', model: 'LC 500', year: 2023, price: 120000 },
    { brand: 'Aston Martin', model: 'Vantage', year: 2021, price: 200000 },
    { brand: 'Maserati', model: 'Ghibli', year: 2022, price: 170000 },
    { brand: 'Jaguar', model: 'F-Type', year: 2023, price: 190000 },
    { brand: 'Tesla', model: 'Model S Plaid', year: 2021, price: 100000 },
    { brand: 'Audi', model: 'R8', year: 2022, price: 220000 },
    { brand: 'Porsche', model: '911', year: 2023, price: 240000 },
    // ... dhe ka shume elemente tjere
];
  
const searchInput = document.getElementById('searchInput');
const carList = document.getElementById('carList');

function displayCars(carsToShow) {
  carList.innerHTML = '';
  carsToShow.map(car => {
    const { brand, model, year, price } = car;
    const li = document.createElement('li');
    li.textContent = `${brand} ${model} - Year: ${year} - Price: ${price}`;
    carList.appendChild(li);
  });
}

function filterCars(searchTerm) {
  const filteredCars = cars.reduce((filtered, car) => {
    const { brand, model } = car;
    const lowerBrand = brand.toLowerCase();
    const lowerModel = model.toLowerCase();
    const lowerSearchTerm = searchTerm.toLowerCase();

    if (lowerBrand.includes(lowerSearchTerm) || lowerModel.includes(lowerSearchTerm)) {
      filtered.push(car);
    }

    return filtered;
  }, []);
  displayCars(filteredCars);

  carList.classList.remove('hidden');
}

searchInput.addEventListener('input', function (event) {
  const searchTerm = event.target.value;

  if (searchTerm.trim().length === 0) {
    carList.innerHTML = '';
    carList.classList.add('hidden');
  } else {
    filterCars(searchTerm);
  }
});