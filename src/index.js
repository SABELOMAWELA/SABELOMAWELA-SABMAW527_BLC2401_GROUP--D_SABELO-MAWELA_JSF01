const storeData = () => ({
  data: {
    products: [],
  },
  loading: true,
  Loading: false,
  showModal: false,
  emptyProduct: null,
  modalProduct: {
    category: "all",
    description: "placeholder",
    id: "0",
    image: "none",
    price: "0.00",
    rating: {rate: "0", count: "0"},
    title: "none",
  },
  openModal(item) {
    this.showModal = true;
    this.Loading = true;
    
    setTimeout(()=>{
      this.modalProduct = item;
      this.Loading = false;
    }, 1000)
  },
  closeModal() {
    this.showModal = false;
    this.modalProduct = this.emptyProduct;
  },
  Refresh() {
    // window.location.reload();
    this.loading = true;
    this.showModal = false;
    setTimeout(()=>{
      this.modalProduct = this.emptyProduct;
      this.loading = false;
    }, 1000)
  },
  init() {
    this.loading = true;
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        this.data.products = products;
        this.emptyProduct = this.modalProduct;
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
function RELOAD() {
  showModal = false;
  window.location.reload();
}