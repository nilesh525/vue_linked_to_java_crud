<template>
    <div class="container mainbody">
    <h3>All Employee</h3>
    <center><h3>{{sentMessage}}</h3></center>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in EmployeeLst" v-bind:key="employee.id">
            <td>{{employee.id}}</td>
            <td>{{employee.name}}</td>
            <td>{{employee.email}}</td>
            <td>{{employee.desciption}}</td>
            <td>
                <button type="submit" @click="ShowDesc(employee.id)" class="btn-space">Send Mail</button>
                <button type="submit" @click="deleteEMp(employee.id)" class="btn-space">Delete Employee</button>
                <button type="submit" @click="updateDesc(employee)">Update Employee</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div><br>
    <div>
          <button type="submit" class="btn btn-block btn-twitter" @click="ShowCreateBtn()"> Register you friend with us .  </button><br><br>
    </div><br>
    <form >
    <center><div v-if="showdescpage" class="mailbox" >
      
        To : <input type="text" v-bind="tomail" :value="Employee.email" style="min-width:200px" class="btn-space" required><br><br>
        From : <input type="text" :value="this.$route.query.employee" style="min-width:200px" class="btn-space" required><br><br>
        <textarea class="textrea1" v-model="message" placeholder="Enter your message "></textarea><br><br>
        <button type="submit" @click="sendEmp(Employee.email)" style="min-width:100px" return=false>send</button><br>
        
    </div><br></center></form>
    <div v-if="toshowcreate">
        <div class="card " style="background-color: bisque">
        <center><article  style="max-width: 400px;">
            <h4 class="card-title mt-3 text-center">Add user</h4>
            <p class="text-center">Get started ...</p>
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
                <button type="submit" class="btn btn-primary btn-block" @click="createEmp()()" :disabled="pass!=cpass"> Create Account  </button>
                <div v-if="pass!=cpass"><h6 style="color:red">password did not macheed</h6></div>
            </div> <!-- form-group// -->                                                              
        </article></center>
    </div>
    </div>
    <div v-if="toshowedit">
        <center><article  style="max-width: 400px;">
            <p class="text-center">Employee Id : {{editempid.id}}</p>
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Full name" type="text" v-model="nameedit">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                <input name="" class="form-control" v-bind:value="editempid.email" type="email" disabled>
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-building"></i> </span>
                </div>
                <select class="form-control" v-model="descedit">
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
                <input class="form-control" placeholder="Create password" type="password" v-model="passedit">
            </div> <!-- form-group// -->
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Repeat password" type="password" v-model="cpassedit">
            </div> <!-- form-group// -->                                      
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" @click="updateEmp()" :disabled="pass!=cpass"> Create Account  </button>
                <div v-if="passedit!=cpassedit"><h6 style="color:red">password did not macheed</h6></div>
            </div> <!-- form-group// -->                                                              
        </article></center>
    </div>
  </div>
</template>

<script>
import EmployeedataService from '@/service/EmployeedataService.js'
//import router from "@/router/index.js";
export default {
    name:"EmployeeList",
    data() {
    return {
      EmployeeLst: "",refreshpage:true,showdescpage:false,Employee:"",toshowcreate:false,createRes:"",fetchname:"",
      fetchdesc:"",deletedata:"",toshowedit:false,editempid:"",frommail:"",message:"",sentMessage:"",
      name:'',email:'',desc:'Developer',pass:'',cpass:'',passedit:"",descedit:"Developer",nameedit:""
    };
  },
  methods: {
    refreshEmplyee() {
      EmployeedataService.retrieveAllEmployee()
        .then(response => {
            this.EmployeeLst=response.data;
        });
    },
    ShowDesc:function(des){
        if(this.showdescpage==true){
          this.showdescpage=false
        }else{
          this.showdescpage=true
        }
        EmployeedataService.retrieveEmployeeByID(des)
        .then(response => {
            this.Employee=response.data;
            console.log(this.Employee);
        });
         
    },
    HideDesc:function(){
        this.showdescpage=false;
    },
    ShowCreateBtn:function(){
      this.toshowedit=false
        if(this.toshowcreate){
          this.toshowcreate=false;
        }else{
          this.toshowcreate=true;
        }
    },
    createEmp:function(){
      this.toshowcreate=false
        EmployeedataService.createEmployeeByID(this.name,this.email,this.descedit,this.pass,"general")
        .then(response => {
            this.createRes=response.data;
        }).then(location.reload());      
    },
    deleteEMp:function(des){
        EmployeedataService.deleteEmployeeByID(des)
        .then(response => {
            this.deletedata=response.data;
        }).then(location.reload());
    },
    updateDesc:function(des){
      this.editempid=des;
      this.toshowcreate=false
      if(this.toshowedit==true){
        this.toshowedit=false;
      }else{
        this.toshowedit=true;
      }
    },
    updateEmp:function(){
        EmployeedataService.updateEmployeeByID(this.editempid.id,this.nameedit,this.descedit,this.passedit)
        .then(response => {
            this.createRes=response.data;
        }).then(location.reload());
    },
    sendEmp:function(tomail){
      EmployeedataService.sendMail(this.frommail,tomail,this.message)
        .then(response => {
           this.sentMessage=response.data;
        });//premmohanlal525@gmail.com
        this.showdescpage=false;
    }
  },
  created() {
    this.frommail=this.$route.query.employee
    this.refreshEmplyee();
  }
}
</script>

<style scoped>
table {
  width: 80%;
  border: 1px solid black;
  align-self: center;
}

th {
  height: 50px;
  text-align: center;
  border: 1px solid black;
}
td{
    border: 1px solid black;
}
.mainbody{
    background-color: bisque
}
.card-body{
    position:relative;
    padding-top:66.59%;
}
.img-mainpage {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 80%;
}
.card{
    position:relative;
    min-width: 300px;
}
.productarea{
    background-color: gray;
    padding: 0 15px;
}
form {
  width: 300px;
  margin: 0 auto;
  text-align: center;
  padding-top: 50px;
}
.value-button {
  display: inline-block;
  border: 1px solid #ddd;
  margin: 0px;
  width: 40px;
  height: 20px;
  text-align: center;
  vertical-align: middle;
  padding: 11px 0;
  background: #eee;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input#number {
  text-align: center;
  border: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  margin: 0px;
  width: 40px;
  height: 40px;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.btn-space {
    margin-right: 5px;
}
div {
    text-align: center;
}
/*Prevent text selection*/
span{
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
input{  
    border: 0;
    width: 2%;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input:disabled{
    background-color:white;
}
.mailbox{
  background-color:rgb(235, 158, 177);
  min-height: 200px;
  min-width: 400px;
  padding: 20px;
  text-align: left;
}
.textrea1{
  background-color:white;
  min-height: 100px;
  min-width: 360px;
  text-align: left;
}
.btn-twitter {
    background-color: #42AEEC;
    color: #fff;
}
</style>