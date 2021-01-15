<template>
  <div>
    <HomePage 
    v-if="PageName == 'HomePage'" 
    @changePage="changePage"
    :params="params" :renderParams="renderParams" @onSuccess="onSuccess" :onFailure="onFailure"> 
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
      data: '',
      params: {
        client_id: "535236340893-os9slvac221sa575pimv5gl7qf73n35u.apps.googleusercontent.com"
      }
    }
  },
  components: {
    HomePage,
    RegisterPage,
    LoginPage,
    MainPage
  },
  methods: {
    onSuccess(googleUser) {
      let token_google = googleUser.getAuthResponse().id_token
      axios({
        method: 'POST',
        url: 'http://localhost:3000/google',
        data: {
          token_google
        }
      })
        .then(({data}) => {
          localStorage.setItem('access_token', data.access_token)
          this.PageName = "MainPage"
        })
        .catch(({err}) => {
          console.log(err)
        })
    },
    changePage(page) {
      this.PageName = page
    },
    changeMainPage(page) {
      if(page.page == "EditPage") {
        // this.MainPage = page.page
        this.getTask(page.id)
      } else {
        this.MainPage = page
      }
    },
    logout() {
      // var auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   console.log('User signed out.');
      // });
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
          this.$swal('Fail to register', '', 'error')
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
        .catch((err) => {
          this.$swal('Email/Password Wrong', '', 'error')
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
          this.$swal('Created', 'Task Added!', 'success')
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
          this.$swal('Saved', 'Task Updated!', 'success')
        })
        .catch(({err}) => {
          console.log(err, 'saveEdit')
        })
    },
    deleteTask(id) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
          url: `http://localhost:3000/tasks/${id}`,
          method: 'DELETE',
          headers: {
              access_token: localStorage.access_token
          }
        })
          .then(({ data }) => {
            this.$swal.fire(
            'Deleted!', 'Your task has been deleted.', 'success')
            this.getTasks()
          })
          .catch(({err}) => {
            this.$swal(`Unauthorize`, '', 'error')
          })
          
        }
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
          this.MainPage = "EditPage"
        })
        .catch(({err}) => {
          this.$swal(`Unauthorize`, '', 'error')
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
    if(this.PageName == "MainPage"){
      this.getTasks()
    }
  }
}
</script>

<style>

</style>