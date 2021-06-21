Vue.component('cart-products', {
  data() {
    return {
      cartItems: []
    }
  },
  mounted() {
    this.$parent.getJson(`/api/cart`)
      .then(data => {
        for (let item of data.contents) {
          item.imgPath = `img/${item.id_product}.png`;
          this.$data.cartItems.push(item);
        }
      });
  },
  methods: {
    updateData(item) {

      this.$parent.$refs.cart.remove(item)
      this.cartItems.length = 0;
      this.$parent.getJson(`/api/cart`)
        .then(data => {
          for (let item of data.contents) {
            item.imgPath = `img/${item.id_product}.png`;
            this.$data.cartItems.push(item);
          }
        });
    }
  },
  template: `<table class="cart_table conteiner">
                <tr class="cart_table_header">
                    <th class="table_header" colspan="2">Product Details</th>
                    <th class="table_header">unite Price</th>
                    <th class="table_header">Quantity</th>
                    <th class="table_header">shipping</th>
                    <th class="table_header">Subtotal</th>
                    <th class="table_header">ACTION</th>
                </tr>
                <cart-product v-for="(item, id) in cartItems"
                :key="item.id_product"
                :img="item.imgPath"
                :cart-item="item"
                @update="updateData"></cart-product>
            </table>`
})
Vue.component('cart-product', {
  props: ['img', 'cartItem'],
  template: `<tr class="cart_table_row">
                    <td class="table_border table_img"><img class="table_image" :src="img" alt="product_img"></td>
                    <td class="table_border table_pr_name">
                        <a href="#">
                            <h6 class="table_pr_name_head">{{cartItem.product_name}}</h6>
                        </a>
                        <p class="table_pr_text">Color: <span class="table_pr_text_value">Red </span></p>
                        <p class="table_pr_text">Size: <span class="table_pr_text_value">Xll</span></p>
                    </td>
                    <td class="table_border table_pr_price">{{cartItem.price}}</td>
                    <td class="table_border table_pr_quantity">
                        <input class="table_pr_input" type="number" v-model="cartItem.quantity">
                    </td>
                    <td class="table_border table_pr_shipping">FREE</td>
                    <td class="table_border table_pr_subtotal">1</td>
                    <td class="table_border table_pr_action">
                      <a href="javascript://" @click="$emit('update', cartItem)">
                        <i class="fas fa-times-circle"></i></a>
                    </td>
                </tr>`
})