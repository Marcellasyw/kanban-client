import axios from 'axios'

var app = new Vue({
    el: '#app',
    
    methods: {
        changePage(page) {
            this.PageName = page
        },
        logout() {
            localStorage.clear()
            this.PageName = 'HomePage'
        },
        register() {
            axios({
                url: 'http://localhost:3000/register',
                method: 'POST',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({ data }) => {
                console.log(data)
                // this.PageName = 'LoginPage'
            })
            .catch(({err}) => {
                console.log(err)
            })
        },
        login() {
            axios({
                url: 'http://localhost:3000/login',
                method: 'POST',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({ data }) => {
                console.log(data)
                // localStorage.setItem('access_token', data.access_token)
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
                console.log(data)
                // this.datas = data
            })
            .catch(({err}) => {
                console.log(err)
            })
        },
        createTask() {
            axios({
                url: 'http://localhost:3000/tasks',
                method: 'POST',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.title,
                    category: this.category
                }
            })
            .then(({ data }) => {
                console.log(data)
                // this.MainPage = 'ListPage'
            })
            .catch(({err}) => {
                console.log(err)
            })
        },
        editTask(id) {
            axios({
                url: `http://localhost:3000/tasks/${id}`,
                method: 'PUT',
                headers: {
                    access_token: localStorage.access_token
                },
                data: {
                    title: this.title,
                    category: this.category
                }
            })
            .then(({ data }) => {
                console.log(data)
                // this.MainPage = 'ListPage'
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
                console.log(data)
                // this.MainPage = 'ListPage'
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
                console.log(data)
            })
            .catch(({err}) => {
                console.log(err)
            })
        }
    },
    beforeCreate() {
        if(!localStorage.access_token) {
            this.PageName = 'HomePage'
        } else {
            this.PageName = 'MainPage'
        }
    }
})