<template>
  <div class="container container-styles ">
    <div class="col-sm-8 offset-2">
      <div class="card text-center">
        <div class="card-header">Login</div>
        <div class="card-body padding">
          <ValidationObserver v-slot="{ handleSubmit, invalid }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <div class="form-group row">
                <label for="username" class="col-form-label col-sm-2">
                  Username :
                </label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="Username"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      class="form-control "
                      v-model="login.username"
                      name="username"
                      type="text"
                    />
                    <p class="error">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
              <div class="form-group row">
                <label for="password" class="col-form-label col-sm-2">
                  Password :
                </label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="password"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      class="form-control "
                      v-model="login.password"
                      name="password"
                      type="text"
                    />
                    <p class="error">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-3 offset-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="invalid"
                  >
                    Login
                  </button>
                </div>
                <div class="col-3 offset-2">
                  <input
                    type="reset"
                    class="btn btn-outline-secondary"
                    value="Cancel"
                  />
                </div>
              </div>
            </form>
            <p v-if="errorMessage" class="error">{{errorMessage}}</p>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import Router from "../router/index";

extend("required", {
  ...required,
  message: "Field required"
});

export default {
  name: "login",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      pageTitle: "Welcome",
      valid: true,
      isLoggedIn: "false",
      users: [],
      errorMessage: "",
      login: { username: null, password: null }
    };
  },
  mounted: function() {
    this.loadDetails();
  },
  methods: {
    onSubmit: function() {
      this.valid = true;
      var name = this.login.username;
      var password = this.login.password;
      sessionStorage.setItem("username", this.login.username);
      var user = this.users.filter(
        user => user.userName === name && user.password === password
      )[0];
      if (user) {
        this.isLoggedIn = "true";
        sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
        Router.push({ path: "/products" });
      } else {
        this.isLoggedIn = "false";
        sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
        this.valid = false;
        this.errorMessage = "Login Failed...";
      }
    },
    loadDetails: function() {
      document.getElementById("login").style.display = "none";
      this.$http.get("./users/users.json").then(
        response => {
          this.users = response.body;
          this.errorMessage=null;
        },
        err => {
          this.errorMessage=err.message;
        }
      );
    }
  }
};
</script>

<style scoped>
.container-styles {
  top: 180px;
}
.padding {
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.link-underline {
  color: #337ab7;
  text-decoration: underline;
}
.error {
  color: red;
  position: relative;
  text-align: left !important;
  font-weight: bold;
}
</style>
