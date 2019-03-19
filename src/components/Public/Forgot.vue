<template>
  <div class="sk-auto-side-margin sk-main-padding">
    <div class="sk-auth-heading">
      <h4>forgot password</h4>
      <span style="color: #ff0800;">enter email for password reset link</span>
    </div>
    <br/>
    <div v-if="emailSent" class="sk-info-msg">
      <span>sent you a link if the email is registered</span>
    </div>
    <div v-if="inProgress" class="tags-loader"></div>
    <br/>
    <form class="sk-form" action="#" >
      <div class="sk-form-item">
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
