Vue.component('catalog-products', {
  data() {
    return {
      filtered: [],
      products: []
    }
  },
  mounted() {
    this.$parent.getJson(`/api/catalog`)
      .then(data => {
        for (let item of data) {
          item.imgPath = `img/${item.id_product}.png`;
          this.$data.products.push(item);
          this.$data.filtered.push(item);
        }
      });
  },
  methods: {
    filter(userSearch) {
      let regexp = new RegExp(userSearch, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    }
  },
  template: `<div class="cat_galery_products">
                <catalog-product v-for = "item of filtered"
                :key="item.id_product"
                :img="item.imgPath"
                :product="item" 
                @add-product="$parent.$refs.cart.addProduct"></catalog-item> 
            </div>`
})
Vue.component('catalog-product', {
  props: ['product', 'img'],
  template: ` <div class="cat_galery_product">
                            <a href="../single_page.html" class="cat_galery_link">
                                <img :src="img" class="cat_galery_product_img" alt="img_photo" >
                            </a>
                            <div class="cat_product_info">
                                <a href="#" class="cat_galery_product_name">{{product.product_name}}</a>
                                <p class="cat_galery_product_price"><span>$</span>{{product.price}}<img class="product_stars" src="img/stars.png " alt="
                                stars "></p>
                            </div>
                            <a class="galery_product_button" href="javascript://" @click="$emit('add-product', product)"> 
                            <img src="img/cart_white.png" alt="cart">Add to&nbsp;Cart</a>
                        </div>`
})