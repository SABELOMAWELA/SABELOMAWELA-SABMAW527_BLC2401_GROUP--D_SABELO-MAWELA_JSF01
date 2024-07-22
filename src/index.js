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
    dropdownOpen: false,
    filterItem: 'All categories',
    categories: [],
    searchTerm: '',
    sorting: '',
    showLogin: false, 

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
      this.loading = true;
      this.showModal = false;
      this.showLogin= false;
      this.loadProducts();
    },

    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleNavbar() {
      const navbarDropdown = document.getElementById('navbar-dropdown');
      navbarDropdown.classList.toggle('hidden');
    },

    handleFilter(category) {
      this.filterItem = category;
      this.dropdownOpen = false;
      this.loadProducts();
    },

    handleSearch() {
      this.loadProducts();
    },

    handleSort() {
      this.loadProducts();
    },

    loadProducts() {
      this.loading = true;
      let url = 'https://fakestoreapi.com/products';
      if (this.filterItem !== 'All categories') {
        url = `${url}/category/${this.filterItem}`;
      }

      fetch(url)
        .then(response => response.json())
        .then(products => {
          if (this.searchTerm) {
            products = products.filter(product =>
              product.title.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
          }

          if (this.sorting === 'Price: low to high') {
            products = products.sort((a, b) => a.price - b.price);
          } else if (this.sorting === 'Price: high to low') {
            products = products.sort((a, b) => b.price - a.price);
          }

          this.data.products = products;
          this.loading = false;
        });
    },

    async loadCategories() {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      this.categories = categories;
    },

    init() {
      this.loadCategories();
      this.loadProducts();
    }
});
