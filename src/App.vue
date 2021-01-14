<template>
  <div>
    <HomePage 
    v-if="PageName == 'HomePage'" 
    @changePage="changePage"> 
    </HomePage>

    <RegisterPage 
    v-else-if="PageName == 'RegisterPage'"
    @register="register"> 
    </RegisterPage>

    <LoginPage 
    v-else-if="PageName == 'LoginPage'"
    @login="login"> 
    </LoginPage>

    <MainPage 
    id="MainPage" 
    v-else-if="PageName == 'MainPage'" 
    @changeMainPage="changeMainPage" 
    @logout="logout"
    :MainPage="MainPage"
    :Categories="Categories"
    :Datas="Datas"
    :data="data"
    @createTask="createTask"
    @editTask="editTask"
    @deleteTask="deleteTask"> 
    </MainPage>

  </div>
</template>

<script>
import HomePage from './components/Home'
import RegisterPage from './components/Register'
import LoginPage from './components/Login'
import MainPage from './components/Main'
import axios from 'axios'

export default {
  name: "app",
  data() {
    return {
      PageName: 'MainPage',
      Categories: ['Backlog', 'Todo', 'Doing', 'Done'],
      MainPage: 'ListPage',
      Datas: '',
      data: ''
    }
  },
  components: {
    HomePage,
    RegisterPage,
    LoginPage,
    MainPage
  },
  methods: {
    changePage(page) {
      this.PageName = page
    },
    changeMainPage(page) {
      if(page.page == "EditPage") {
        this.MainPage = page.page
        this.getTask(page.id)
      } else {
        this.MainPage = page
      }
    },
    logout() {
      localStorage.clear()
      this.PageName = 'HomePage'
    },
    register(data) {
      axios({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then(({ data }) => {
          this.PageName = 'LoginPage'
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    login(data) {
      axios({
          url: 'http://localhost:3000/login',
          method: 'POST',
          data: {
            email: data.email,
            password: data.password
          }
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.PageName = "MainPage"
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    getTasks() {
      axios({
        url: 'http://localhost:3000/tasks',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.Datas = data
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    createTask(data) {
      axios({
        url: 'http://localhost:3000/tasks',
        method: 'POST',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: data.title,
          category: data.category
        }
      })
        .then(({ data }) => {
          this.MainPage = 'ListPage'
          this.getTasks()
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    editTask(data) {
      axios({
        url: `http://localhost:3000/tasks/${this.data.id}`,
        method: 'PUT',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: data.title,
          category: data.category
        }
      })
        .then(({ data }) => {
          this.MainPage = 'ListPage'
          this.getTasks()
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    deleteTask(id) {
        axios({
          url: `http://localhost:3000/tasks/${id}`,
          method: 'DELETE',
          headers: {
              access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.getTasks()
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    getTask(id) {
      axios({
        url: `http://localhost:3000/tasks/${id}`,
        method: 'GET',
        headers: {
          access_token: localStorage.access_token
        }
      })
        .then(({ data }) => {
          this.data = data
        })
        .catch(({err}) => {
          console.log(err)
        })
    }
  },
  created(){
    if(!localStorage.access_token){
      this.PageName = "HomePage"
    } else {
      this.PageName = "MainPage"
      this.getTasks()
    }
  }
}
</script>

<style>

</style>