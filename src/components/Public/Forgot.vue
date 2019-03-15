<template>
  <div class="sk-forgot-main">
    <div class="forgot-heading">
      <h4>forgot password</h4>
      <span>enter email for password reset link</span>
    </div>
    <br/>
    <div v-if="emailSent" class="email-msg">
      <span>sent you a link if the email is registered</span>
    </div>
    <div v-if="inProgress" class="tags-loader"></div>
    <br/>
    <form class="forgot-form" action="#" >
      <div class="forgot-item">
        <label for="email">email</label>
        <input
          type="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model="email">
          <p v-if="!$v.email.email"> enter valid email</p>
          <p v-if="!$v.email.required && $v.email.$dirty"> email required</p>
      </div>
      <br>
      <div>
        <button
          class="mdl-button mdl-button--raised mdl-button--colored"
          :disabled="$v.$invalid"
          @click.prevent="onSubmit">
          send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      emailSent: false,
      inProgress: false,
    }
  },
  methods: {
    onSubmit () {
      this.inProgress = true
      this.emailSent = false
      const fd = new FormData()
      fd.append('email', this.email)
      axios.post('http://localhost:5001/password/reset/request', fd)
        .then(res => {
          if (res.data.authStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.authStatus === 'Pass') {
            console.log(res.data)
            this.emailSent = true
            this.inProgress = false
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    }
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  deactivated () {
    this.email = ''
    this.inProgress = false
  },
  validations: {
    email: {
      required,
      email
    }
  }
}

</script>

<style>
.sk-forgot-main{
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.forgot-heading{
  text-align: center;
}
.forgot-heading > h4{
  padding-top: 0px;
  margin-top: 0px;
}
.forgot-heading > span {
  font-size: 15px;
  color: #ff0800;
}
.email-msg {
  text-align: center;
  margin-right: auto;
  margin-left: auto;
  background-color: #B9D3D8;
  border-radius: 5px;
  width: 350px;
}
.forgot-form{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.forgot-item > label {
  font-size: 16px;
}
.forgot-item > p {
  margin: 0px;
  padding: 0px;
  color: #ff0800;
}
.forgot-item > input  {
  width:100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  /* border: 2px solid rgb(245,0,87, .15); */
  border: 2px solid rgb(176,176,176, .35);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</style>
