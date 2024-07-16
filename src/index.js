const storeData = () => ({
    data: {
      products: [],
    },
    init() {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
          this.data.products = products;
        })
        .catch((error) => console.error('Error fetching data:', error));
    },
  });
  

  document.addEventListener('alpine:init', () => {
    Alpine.data('storeData', storeData);
  });
  