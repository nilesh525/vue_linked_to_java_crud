<template>
    <div class="hello">

        <nav class="navbar navbar-expand-lg navbar-dark " id="nav">
            <div class="container">
                <div v-if="this.$route.query.employee!=null"><router-link to="/" class="navbar-brand" >{{this.$route.query.employee}}</router-link></div>
                <div v-else><router-link to="/" class="navbar-brand" >Home</router-link></div>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <!-- <router-link to="/" class="nav-link">Home</router-link> -->
                        <div v-if="this.$route.query.pic!=null">
                        <a class="navbar-brand" href="#">
                            <img :src="this.$route.query.pic" alt="abc" style="width:40px;">
                        </a></div>
                    </li>
                    <li class="nav-item">
                        <div v-if="this.$route.query.employee!=null"><router-link to="/logout" class="nav-link" >logout</router-link></div>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link" v-if="this.$route.query.employee==null">Register</router-link>
                    </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
        <div>
        </div>
    </div>
</template>

<script>
//import EmployeeList from '@/components/EmployeeList.vue'
//import registr from "@/views/registr.vue";
//import login from "@/views/login.vue";
export default {
    name:"WelcomePage",
    components: {
      //  login
  },
  data(){
      return{
          emp:""
      }
  },
  created(){
      this.emp=this.$route.meta.employee
  }
}
</script>

<style scoped>
.navbar{
  background: #302525;
  height: 1cm;
}
.navbar-nav a{
  color: aqua;
  padding: 0 15px;
  display: block;
}
</style>