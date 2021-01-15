<template>
    <div>
        <div id="container" class="container pt-3 my-3 border">
            <h1> Kanban </h1>
        </div>
        <div id="container" class="container pt-3 my-3 border">
            <h2> Welcome to Kanban By Marcella </h2>
            <h3> Before we start please choose </h3>
            <h4> <button class="btn btn-secondary" @click="changePage('RegisterPage')"> Register </button> </h4>
            <h4> or </h4>
            <h4> <button class="btn btn-secondary" @click="changePage('LoginPage')"> Login </button> </h4>
            <h4> or </h4>
            <h4> <GoogleLogin class="btn btn-secondary" :params="params" :onSuccess="onSuccess" :onFailure="onFailure"> Login By Google </GoogleLogin> </h4>
        </div>
    </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
  name: "HomePage",
  methods: {
    changePage(page){
      this.$emit("changePage", page)
    }
  },
  props: ["params", "renderParams"],
  components: {
    GoogleLogin
  },
  methods: {
    onSuccess(googleUser) {
      this.$emit("onSuccess", googleUser)
    },
  }
}
</script>

<style>

</style>