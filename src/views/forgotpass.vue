<template>
  <div class="container" style="background-color: bisque">
        <div class="form-gap">{{checkmail}}</div>
        <div class="cent">
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="text-center">
                        <h3><i class="fa fa-lock fa-4x"></i></h3>
                        <h2 class="text-center">Forgot Password?</h2>
                        <p>You can reset your password here.</p>
                        <div class="panel-body">
            
                            <form>
            
                            <div class="form-group">
                                <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                <input id="email" name="email" placeholder="email address" class="form-control"  type="email" v-model="mail">
                                </div>
                            </div>
                            <div class="form-group">
                                <input class="btn btn-lg btn-primary btn-block" type="submit" @click="sendmail()">
                            </div>
                            </form>
            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-gap"> 
            <div v-if="toshowcheckmail">{{checkmail}}</div>
        </div>
    </div> 
</template>

<script>
import EmployeedataService from '@/service/EmployeedataService.js'
export default {
    data(){
        return{
            mail:"",checkmail:'',toshowcheckmail:false
        }
    },
    methods:{
        sendmail(){
            this.toshowcheckmail=true;
            EmployeedataService.sendforget(this.mail)
            .then(response => {
                this.checkmail=response.data;
                alert("msgsent")
            });
        }
    }
}
</script>

<style scoped >
@import url(//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js);
@import url(//code.jquery.com/jquery-1.11.1.min.js);
/* @import url(//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css); */
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css);
.form-gap {
    padding-top: 70px;
}
.cent{
    padding-left: 400px;
    background-color: rgb(164, 169, 173);
    /* max-width: 400px; */
    -ms-flex-align: center;
}
</style>