<template>
    <div id="app">
    <facebook-login class="button"
      appId="254941092607938"
      @login="onLogin"
      @logout="onLogout"
      @get-initial-status="getUserData"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
    <div v-if="isConnected" class="information">
      <h1>My Facebook Information</h1>
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
        <!-- <div class="list-item">
          <i>{{personalID}}</i>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs'
export default {
    components: {
        facebookLogin
    },
    data() {
        return {
            isConnected: false,
            fbname: '',
            fbemail: '',
            personalID: '',
            picture: '',
            FB: undefined
        }
    },
    methods: {
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
            this.getUserData()
        },
        onLogout() {
            this.isConnected = false;
        }
    }
};

</script>


<style scoped>
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