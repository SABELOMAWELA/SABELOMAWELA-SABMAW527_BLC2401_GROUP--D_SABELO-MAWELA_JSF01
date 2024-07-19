const storeData = () => ({
  data: {
    products: [],
  },
  loading: true,
  showModal: false,
  modalProduct: null,
  openModal(item) {
    this.modalProduct = item;
    this.showModal = true;
  },
  init() {
    this.loading = true;
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        this.data.products = products;
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => {
        this.loading = false;
      });
  },
});

document.addEventListener('alpine:init', () => {
  Alpine.data('storeData', storeData);
});


  function Refresh() {
    showModal = false;
    window.location.reload();
  }
