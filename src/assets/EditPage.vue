<template>
    <div>
        <div id="container" class="container pt-3 my-3 border">
            <h1> Edit Task </h1>
        </div>
        <div id="container" class="container pt-3 my-3 border">
            <form @submit.prevent="editTask">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="title" class="form-control" placeholder="Enter title" v-model="title">
                    </div>
                <div class="form-group">
                    <label for="category">Category:</label>
                    <select class="form-control" v-model="category">
                        <option value="Backlog">Backlog</option>
                        <option value="Todo">Todo</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div> <br>
                <button type="submit" class="btn btn-secondary">Save</button>
            </form> <br>
        </div>
    </div>
</template>

<script>
export default {
  name: "EditPage",
  data () {
    return {
        title: '',
        category: 'Backlog'
    }
  },
  props: ["data"],
  methods: {
    editTask() {
        let payload = {
            id: this.data.id,
            title: this.title,
            category: this.category
        }
        this.$emit('editTask', payload)
    }
  },
  created () {
    this.title = this.data.title,
    this.category = this.data.category
  }
}
</script>

<style>

</style>