<template>
  <div id="products" style="padding: 70px">
    <router-view/>
  </div>

</template>

<script>
import Router from '../router/index'
import productList from './productRelated/productList'
import productDetail from './productRelated/productDetail'
import cart from './productRelated/cart'
export default {
  name: 'products',
  data () {
    return {
      total: 0,
      selectedItems: 0,
      product: [],
      getProd: {},
      productService: {
        productUrl: './products/tablets.json',
        selectedProducts: [],
        products: [],
        producttype: 'tablet',
        username: null
      },
      cart: {
        orderId: null,
        productId: null,
        userId: null,
        productName: null,
        quantity: null,
        dateOfPurchase: null,
        price: null,
        totalPrice: 0
      }
    }
  },
  methods: {
    canActivate: function () {
      if (sessionStorage.getItem('isLoggedIn') === 'true') {
        return true
      } else {
        Router.push({name: 'login'})
        return false
      }
    }
  },
  created: function () {
    if (sessionStorage.getItem('selectedProducts')) {
      this.selectedProducts = JSON.parse(sessionStorage.getItem('selectedProducts'))
    }
  },
  mounted: function () {
    document.getElementById('login').style.display = ''
    document.getElementById('login').innerHTML = 'Logout'
    // console.log(sessionStorage.getItem('isLoggedIn'))
  },
  components: {
    'cart': cart,
    'product-list': productList,
    'product-detail': productDetail
  }
}
</script>

<style>
</style>
