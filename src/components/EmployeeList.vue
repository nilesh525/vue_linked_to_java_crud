<template>
    <div class="container mainbody">
    <h3>All Employee</h3>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in EmployeeLst" v-bind:key="employee.id">
            <td>{{employee.id}}</td>
            <td>{{employee.name}}</td>
            <td>
                <button type="submit" @click="ShowDesc(employee.id)" class="btn-space">show description</button>
                <button type="submit" @click="HideDesc()" class="btn-space">hide description</button>
                <button type="submit" @click="deleteEMp(employee.id)" class="btn-space">Delete Employee</button>
                <button type="submit" @click="updateDesc(employee.id)">Update Employee</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div><br>
     <div>
          <button type="submit" @click="ShowCreateBtn()" class="btn-space">Create Employee</button>
      </div>
    <div v-if="showdescpage" >
        <div v-if="Employee.desciption!=null">
            Desc: {{Employee.desciption}}
        </div>
        <div v-if="Employee.desciption==null">
            Desc: Description not set
        </div>
    </div><br>
    <div v-if="toshowcreate">
        Name        : <input type="text" v-model="fetchname" name="name" required style="min-width:200px" class="btn-space"><br><br>
        Description : <input type="text" v-model="fetchdesc" name="desc" required style="min-width:200px " class="btn-space"><br><br>
        <button type="submit" @click="createEmp()" style="min-width:200px ">create</button><br>
    </div>
    <div v-if="toshowedit">
        Id : {{editempid}} <br>
        Name        : <input type="text" v-model="fetchname" name="name" required style="min-width:200px" class="btn-space"><br><br>
        Description : <input type="text" v-model="fetchdesc" name="desc" required style="min-width:200px " class="btn-space"><br><br>
        <button type="submit" @click="updateEmp()" style="min-width:200px ">update</button><br>
    </div>
  </div>
</template>

<script>
import EmployeedataService from '@/service/EmployeedataService.js'
export default {
    name:"EmployeeList",
    data() {
    return {
      EmployeeLst: "",
      showdescpage:false,
      Employee:"",
      toshowcreate:false,
      createRes:"",
      fetchname:"",
      fetchdesc:"",
      deletedata:"",
      toshowedit:false,
      editempid:""
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
        console.log("inside show desc")
        this.showdescpage=false;
        this.showdescpage=true;
        EmployeedataService.retrieveEmployeeByID(des)
        .then(response => {
            this.Employee=response.data;
        });
    },
    HideDesc:function(){
        this.showdescpage=false;
    },
    ShowCreateBtn:function(){
        this.toshowcreate=true;
    },
    createEmp:function(){
        EmployeedataService.createEmployeeByID(this.fetchname,this.fetchdesc)
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
        this.toshowedit=true; 
    },
    updateEmp:function(){
        EmployeedataService.updateEmployeeByID(this.editempid,this.fetchname,this.fetchdesc)
        .then(response => {
            this.createRes=response.data;
        }).then(location.reload());
    }
  },
  created() {
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
  text-align: left;
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
.value-button:hover {
  cursor: pointer;
}
form #decrease {
  margin-right: -4px;
  border-radius: 8px 0 0 8px;
}
form #increase {
  margin-left: -4px;
  border-radius: 0 8px 8px 0;
}
form #input-wrap {
  margin: 0px;
  padding: 0px;
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
.qwe{
    max-width : 500px;
    word-wrap: break-word;
    position: relative; 
    margin: 0px 0px 0px 350px
}
.btn-space {
    margin-right: 5px;
}
.qty .count {
    color: #000;
    display: inline-block;
    vertical-align: top;
    font-size: 25px;
    font-weight: 700;
    line-height: 30px;
    padding: 0 2px
    ;min-width: 35px;
    text-align: center;
}
.qty .plus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
    }
.qty .minus {
    cursor: pointer;
    display: inline-block;
    vertical-align: top;
    color: white;
    width: 30px;
    height: 30px;
    font: 30px/1 Arial,sans-serif;
    text-align: center;
    border-radius: 50%;
    background-clip: padding-box;
}
div {
    text-align: center;
}
.minus:hover{
    background-color: #717fe0 !important;
}
.plus:hover{
    background-color: #717fe0 !important;
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
nput::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input:disabled{
    background-color:white;
}
</style>