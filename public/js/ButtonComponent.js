Vue.component('button-add-to-cart', {
  data() {
    return {
      item: {
        "quantity": 1,
        "id_product": 10,
        "product_name": "white t-shirt",
        "price": 51
      }
    }
  },
  template: `<div>
                <btn
                  :product="item"
                  @add-product="$parent.$refs.cart.addProduct"></btn>
              </div>`
})
Vue.component('btn', {
  props: ['product'],
  template: `<a class="collection_button" 
              href="javascript://"
              @click="$emit('add-product', product)">
                <img src="img/cart_pink.png" alt="cart" class="collection_button_img">Add to&nbsp;Cart
            </a>`
})