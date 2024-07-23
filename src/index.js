/**
 * Alpine.js component for managing store data and functionality.
 * @namespace storeData
 */
const storeData = () => ({
  data: {
    /** @type {Array} */
    products: [],
  },
  /** @type {boolean} */
  loading: true,
  /** @type {boolean} */
  Loading: false,
  /** @type {boolean} */
  showModal: false,
  /** @type {null|Object} */
  emptyProduct: null,
  /** @type {Object} */
  modalProduct: {
    category: "all",
    description: "placeholder",
    id: "0",
    image: "none",
    price: "0.00",
    rating: {rate: "0", count: "0"},
    title: "none",
  },
  /** @type {boolean} */
  dropdownOpen: false,
  /** @type {string} */
  filterItem: 'All categories',
  /** @type {Array} */
  categories: [],
  /** @type {string} */
  searchTerm: '',
  /** @type {string} */
  sorting: '',
  /** @type {boolean} */
  showLogin: false, 

  /**
   * Opens the modal and loads the product data into it.
   * @param {Object} item - The product item to be displayed in the modal.
   */
  openModal(item) {
    this.showModal = true;
    this.Loading = true;
    
    setTimeout(()=>{
      this.modalProduct = item;
      this.Loading = false;
    }, 1000)
  },

  /**
   * Closes the modal and clears the product data.
   */
  closeModal() {
    this.showModal = false;
    this.modalProduct = this.emptyProduct;
  },

  /**
   * Refreshes the product list and resets the modal and login states.
   */
  Refresh() {
    this.loading = true;
    this.showModal = false;
    this.showLogin = false;
    this.loadProducts();
  },

  /**
   * Toggles the dropdown menu.
   */
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  },

  /**
   * Toggles the visibility of the navbar dropdown.
   */
  toggleNavbar() {
    const navbarDropdown = document.getElementById('navbar-dropdown');
    navbarDropdown.classList.toggle('hidden');
  },

  /**
   * Filters the products based on the selected category.
   * @param {string} category - The selected category to filter products.
   */
  handleFilter(category) {
    this.filterItem = category;
    this.dropdownOpen = false;
    this.loadProducts();
  },

  /**
   * Handles the search functionality for products.
   */
  handleSearch() {
    this.loadProducts();
  },

  /**
   * Handles the sorting functionality for products.
   */
  handleSort() {
    this.loadProducts();
  },

  /**
   * Loads products from the API, applies search and sort filters.
   * @async
   */
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

  /**
   * Loads product categories from the API.
   * @async
   */
  async loadCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await response.json();
    this.categories = categories;
  },

  /**
   * Initializes the component by loading categories and products.
   */
  init() {
    this.loadCategories();
    this.loadProducts();
  }
});
