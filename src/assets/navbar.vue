<template>
    <nav class="navbar navbar-expand-sm bg-light navbar-light">
        <ul class="navbar-nav" id="nav">
            <li class="nav-item">
                <button class="nav-link btn btn-light active" @click="changeMainPage('ListPage')">Home</button>
            </li>
            <li class="nav-item">
                <button class="nav-link btn btn-light" @click="changeMainPage('CreatePage')">Add Task</button>
            </li>
            <li class="nav-item ">
                <button class="nav-link btn btn-light" @click="logout()">Logout</button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    changeMainPage(page){
      this.$emit("changeMainPage", page)
    },
    logout() {
      this.$emit("logout")
    }
  }
}
</script>

<style>

</style>