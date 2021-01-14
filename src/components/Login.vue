<template>
  <div>
        <div id="container" class="container pt-3 my-3 border">
            <h1> Login </h1>
        </div>
        <div id="container" class="container pt-3 my-3 border">
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" placeholder="Enter email" v-model="email">
                    </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" placeholder="Enter password" v-model="password">
                </div> <br>
                <button type="submit" class="btn btn-secondary">Sign In</button>
            </form> <br>
        </div>
    </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return{
        email: "",
        password: ""
    }
  },
  methods: {
    login() {
        let data = {
            email: this.email,
            password: this.password
        }
        this.$emit("login", data)
    }
  }
}
</script>

<style>

</style>