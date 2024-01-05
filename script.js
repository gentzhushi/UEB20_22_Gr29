class Car {
    constructor(brand, model, year, price) {
      this.brand = brand;
      this.model = model;
      this.year = year;
      this.price = price;
    }
  }
  
  const cars = [
    new Car('McLaren', '720s', 2021, 250000),
    new Car('Rolls-Royce', 'Wraith', 2022, 320000),
    new Car('BMW', '850i', 2023, 150000),
    new Car('Ferrari', 'Portofino', 2021, 300000),
    new Car('Bentley', 'Continental GT', 2022, 280000),
    new Car('Lexus', 'LC 500', 2023, 120000),
    new Car('Aston Martin', 'Vantage', 2021, 200000),
    new Car('Maserati', 'Ghibli', 2022, 170000),
    new Car('Jaguar', 'F-Type', 2023, 190000),
    new Car('Tesla', 'Model S Plaid', 2021, 100000),
    new Car('Audi', 'R8', 2022, 220000),
    new Car('Porsche', '911', 2023, 240000),
    // dhe potencialisht me shume makina
  ];
  
  const searchInput = document.getElementById('searchInput');
  const carList = document.getElementById('carList');
  
  function displayCars(carsToShow) {
    carList.innerHTML = '';
    carsToShow.forEach(car => {
      const { brand, model, year, price } = car;
      const li = document.createElement('li');
      li.textContent = `${brand} ${model}`;
  
      const descriptionList = document.createElement('ul');
  
      const yearListItem = document.createElement('li');
      yearListItem.textContent = `Year: ${year}`;
      descriptionList.appendChild(yearListItem);
  
      const priceListItem = document.createElement('li');
      priceListItem.textContent = `Price: $${price}`;
      descriptionList.appendChild(priceListItem);
  
      li.appendChild(descriptionList);
      carList.appendChild(li);
    });
  }
  
  function filterCars(searchTerm) {
    const filteredCars = cars.filter(car => {
      const { brand, model } = car;
      const lowerBrand = brand.toLowerCase();
      const lowerModel = model.toLowerCase();
      const lowerSearchTerm = searchTerm.toLowerCase();
  
      return lowerBrand.includes(lowerSearchTerm) || lowerModel.includes(lowerSearchTerm);
    });
  
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
  