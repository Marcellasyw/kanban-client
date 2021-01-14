<template>
    <div>
        <div id="container" class="container pt-3 my-3 border">
            <h1> Kanban </h1>
        </div>
        <div id="container" class="container pt-3 my-3 border">
            <h2> Welcome to Kanban By Marcella </h2>
            <h3> Before we start please choose </h3>
            <h4> <button class="btn btn-secondary" @click="changePage('RegisterPage')"> Register </button> or <button class="btn btn-secondary" @click="changePage('LoginPage')"> Login </button> </h4>
        </div>
    </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    changePage(page){
      this.$emit("changePage", page)
    }
  }
}
</script>

<style>

</style>