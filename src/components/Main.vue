<template>
    <div>
        <navbar 
        @changeMainPage="changeMainPage" 
        @logout="logout"> 
        </navbar>

        <list-page 
        @changeMainPage="changeMainPage"
        v-if="MainPage == 'ListPage'"
        :Categories="Categories"
        :Datas="Datas"
        @deleteTask="deleteTask"> 
        </list-page>

        <create-page v-else-if="MainPage == 'CreatePage'" @createTask="createTask"> 
        </create-page>

        <edit-page v-else-if="MainPage == 'EditPage'" :data="data" @editTask="editTask"> 
        </edit-page>

    </div>
</template>

<script>
import CreatePage from '../assets/CreatePage.vue'
import EditPage from '../assets/EditPage.vue'
import ListPage from '../assets/ListPage.vue'
import navbar from '../assets/navbar.vue'
export default {
  name: "MainPage",
  components: { navbar, ListPage, CreatePage, EditPage },
  methods: {
    changeMainPage(page){
      this.$emit("changeMainPage", page)
    },
    logout() {
      this.$emit("logout")
    },
    createTask(data) {
      this.$emit("createTask", data)
    },
    editTask(data) {
      this.$emit('editTask', data)
    },
    deleteTask(id) {
      this.$emit("deleteTask", id)
    }
  },
  props: ["MainPage", "Categories", "Datas", "data"]
}
</script>

<style>

</style>