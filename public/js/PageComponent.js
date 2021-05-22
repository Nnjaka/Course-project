Vue.component('page-products', {
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.$parent.getJson(`/api/page`)
      .then(data => {
        for (let item of data) {
          item.imgPath = `img/${item.id_product}.png`;
          this.$data.products.push(item);
        }
      })
  },
  template: `<div class="galery_products center">
              <page-product v-for="item of products"
              :key="item.id_product"
              :img="item.imgPath"
              :product="item"
              @add-product="$parent.$refs.cart.addProduct"></page-product>
            </div>`
})
Vue.component('page-product', {
  props: ['product', 'img'],
  template: `<div class="galery_product offer_product">
                        <a href="#" class="galery_link offer_link1">
                        <img :src="img" class="cat_galery_product_img" alt="img_photo">
                        </a>
                        <div class="product_info">
                            <a href="#" class="galery_product_name">{{product.product_name}}</a>
                            <p class="galery_product_price"><span>$</span>{{product.price}}<img class="product_stars" src="img/stars.png " alt="stars">
                            </p>
                        </div>
                        <a class="galery_product_button" href="javascript://" @click="$emit('add-product', product)"> 
                          <img src="img/cart_white.png" alt="cart">Add to&nbsp;Cart</a>
                    </div>
  `
})