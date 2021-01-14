<template>
    <div class="card bg-light text-dark">
        <div class="card-header"> {{data.title}} </div>
        <div class="card-body"> <button class="btn btn-light fas fa-edit" @click="changeMainPage('EditPage', data.id)"></button> <button class="btn btn-light fas fa-trash" @click="deleteTask(data.id)"></button> </div>
    </div>
</template>

<script>
export default {
  name: "ListItem",
  props: ["data"],
  methods: {
    changeMainPage(page, id){
      let data = {
        page,
        id
      }
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