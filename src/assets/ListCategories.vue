<template>
    <div>
        <div class="card text-black" >
            <div class="card-header"> {{category}} </div>
            <div v-for="data in Datas" :key="data.id">
              <div class="card-body" id="item" v-if="category == data.category">
                <list-item :data="data" @changeMainPage="changeMainPage" @deleteTask="deleteTask"> </list-item>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
import ListItem from './ListItem.vue'
export default {
  components: { ListItem },
  name: "ListCategories",
  props: ["category", "Datas"],
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