<template>
    <div class="container" style="background-color: bisque">
        <center><div v-if="this.$route.meta.log=='logout'"><br>
            <h4> You have been loged out successfully!</h4>
        </div></center>
        <div v-if="showmainpage">
            <br><center>
                <h2>Welocome guest ....</h2> 
            </center><br>
            <a href="/login" class="btn btn-block btn-twitter"> <i class="fab fa-twitter"></i>Login</a><br><br>
            <button type="submit" class="btn btn-block btn-twitter" @click="enableregisterpage()"> register  </button><br><br>
            <center>

            </center>
        </div>
        <div v-if="showregisterfailonpass">
        <h4 class="card-title mt-3 text-center">Your password did not matched ...</h4>
        </div>
        <div v-if="showregistersuccess">
        <h4 class="card-title mt-3 text-center">Congratulations! you have been registered successfully.</h4><br>
        PLease Login to continue . 
        </div>
    
      <div class="card " v-if="showregister" style="background-color: bisque">
        <article class="card-body mx-auto" style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center">Create Account</h4>
            <p class="text-center">Get started ...</p>
            <p>
                <a href="/login" class="btn btn-block btn-twitter"> <i class="fab fa-twitter"></i>Login gmail</a><br>
                <facebook-login class="button"
                    appId="254941092607938"
                    @login="onLogin"
                    @logout="onLogout"
                    @get-initial-status="getUserData"
                    @sdk-loaded="sdkLoaded">                                                        
                </facebook-login>
            </p>
            <p class="divider-text">
                <span class="bg-light">OR Register as guesr</span>
            </p>
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Full name" type="text" v-model="name">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Email address" type="email" v-model="email">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                </div>
                <select class="form-control" v-model="desc">
                    <option selected=""> Developer </option>
                    <option>Manager</option>
                    <option>Support</option>
                    <option>Tester</option>
                    <option>BA</option>
                </select>
            </div> <!-- form-group end.// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Create password" type="password" v-model="pass">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Repeat password" type="password" v-model="cpass">
            </div> <!-- form-group// -->                                      
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" @click="registeruser()"> Create Account  </button>
            </div> <!-- form-group// -->      
            <p class="text-center">Have an account? <a href="login">Log In</a> </p>                                                                 
        </article>
    </div> <!-- card.// -->
    <div v-if="toshowlogin">
        <login/>
    </div>
     <div v-if="isConnected" class="information">
     <center> <h1>My Facebook Information</h1></center>
      <div class="well">
        <div class="list-item">
          <img :src="picture">
        </div>
        <div class="list-item">
          <i>{{fbname}}</i>
        </div>
        <div class="list-item">
          <i>{{fbemail}}</i>
        </div>
        <div class="list-item">
          <i>{{personalID}}</i>
        </div>
         <button type="submit" class="btn btn-primary btn-block" @click="confirmacc()"> continue </button>
      </div>
    </div>
</div> 
</template>
<script>
import login from "@/views/login.vue";
import EmployeedataService from '@/service/EmployeedataService.js'
import facebookLogin from 'facebook-login-vuejs'
import employeedataService from "@/service/EmployeedataService.js";
import router from "@/router/index.js";
export default {
    components :{
        login,facebookLogin
    },
    data(){
        return{
            name:'',
            email:'',
            desc:'Developer',
            pass:'',
            cpass:'',
            showregistersuccess:false,
            showregisterfail:false,
            showregisterfailonpass:false,
            showregister:false,mssage:"",toshowlogin:false,showmainpage:true,
            isConnected: false,
            fbname: '',
            fbemail: '',
            personalID: '',
            picture: '',
            FB: undefined
        }
    },
    methods:{
        registeruser(){
            var p=this.pass;
            var cp=this.cpass;
            if(p==cp){
                 EmployeedataService.createEmployeeByID(this.name,this.email,this.desc,this.pass,"general")
                    .then(response => {
                    this.mssage=response.data;
                    });//premmohanlal525@gmail.com 

                this.showregistersuccess=true;this.showregister=false;this.toshowlogin=true;
                this.name='';this.email='';this.phone='';this.ccode='';this.pass='';this.cpass='';
            }else{
                this.showregistersuccess=false;
                this.showregisterfailonpass=true;
            }
        },
        enableregisterpage(){
            this.showmainpage=false;
            this.showregister=true;
        },
        getUserData() {
            this.FB.api('/me', 'GET', { fields: 'id,name,email,picture' },
            user => {
                this.personalID = user.id;
                this.fbemail = user.email;
                this.fbname = user.name;
                this.picture = user.picture.data.url;
            }
            )
        },
        sdkLoaded(payload) {
            this.isConnected = payload.isConnected
            this.FB = payload.FB
            if (this.isConnected) this.getUserData()
        },
        onLogin() {
            this.isConnected = true
            this.showregister=false
            this.getUserData()
        },
        onLogout() {
            this.isConnected = false;
        },
        confirmacc(){
             employeedataService.createEmployeeByID(this.fbname,this.fbemail,"","facebook","facebook").then(response=>{
            this.Employee=response.data;
            router.push({
              path:'/employees',
              query: { employee: this.fbname ,pic:this.picture},
              meta:{name:this.Employee.name,pic:this.picture}
            })
          }).catch(function(error){
            alert("Incorrect ID or Password :"+error);
          }
          )
        }
    },
    created:{
    }
}
</script>
<style scoped>
.divider-text {
    position: relative;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
}
.divider-text span {
    padding: 7px;
    font-size: 12px;
    position: relative;   
    z-index: 2;
}
.divider-text:after {
    content: "";
    position: absolute;
    width: 100%;
    border-bottom: 1px solid #ddd;
    top: 55%;
    left: 0;
    z-index: 1;
}

.btn-facebook {
    background-color: #405D9D;
    color: #fff;
}
.btn-twitter {
    background-color: #42AEEC;
    color: #fff;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: flex-start
}
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  ;
  border-radius: 20px;
  /* display:inline-block; */
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>