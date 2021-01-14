<template>
    <div>
        <div id="container" class="container pt-3 my-3 border">
            <h1> List Task </h1>
        </div>
        <div id="container" class="container pt-3 my-3 border">
            <list-categories id="list" 
            v-for="(category, index) in Categories" 
            :key="index" :category="category" 
            :Datas="Datas" 
            @changeMainPage="changeMainPage"
            @deleteTask="deleteTask"> </list-categories>
        </div>
    </div>
</template>

<script>
import ListCategories from './ListCategories.vue'
export default {
  components: { ListCategories },
  name: "ListPage",
  props: ["Categories", "Datas"],
  methods: {
    changeMainPage(data){
      this.$emit("changeMainPage", data)
    },
    deleteTask(id) {
      this.$emit("deleteTask", id)
    }
  }
}
</script>

<style>

</style>