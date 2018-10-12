<template>
  <div class="edit-profile-main">
    <div class="edit-heading">
      <h5>Update Login Info</h5>
    </div>
    <br>
    <form class="edit-form" action="#">

      <span
        v-if="!updateEmail"
        @click="showEmail">UPDATE EMAIL</span>
      <span
        v-else
        @click="hideEmail">CANCEL UPDATE EMAIL</span>

      <br>
      <br>

      <div v-if="updateEmail">
        <div class="edit-item">
          <label for="currentemail">current email</label>
          <input
            type="email"
            placeholder="midoexo@exascale.com"
            disabled
            id="currentemail">
        </div>
        <br>
        <div class="edit-item">
          <label for="newemail">new email</label>
          <input
            type="email"
            id="newemail">
        </div>
      </div>

      <br>
      <br>

      <span
        v-if="!updatePassword"
        @click="showPassword">UPDATE PASSWORD</span>
      <span
        v-else
        @click="hidePassword">CANCEL UPDATE PASSWORD</span>

      <br>
      <br>

      <div v-if="updatePassword">
        <div class="edit-item">
          <label for="newpassword">new password</label>
          <input
            type="password"
            id="newpassword">
        </div>
        <br>
        <div class="edit-item">
          <label for="confirmpassword">confirm new password</label>
          <input
            type="password"
            id="confirmpassword">
        </div>
      </div>

      <br>
      <hr>
      <br>

      <div class="edit-item">
        <label for="oldpassword">enter current password to confirm updates</label>
        <input
          type="password"
          id="oldpassword">
      </div>

      <br>

      <div>
        <button
          class="mdl-button mdl-button--raised mdl-button--colored"
          @click.prevent="onSubmit">
          update
        </button>
      </div>

    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      updateEmail: false,
      updatePassword: false
    }
  },
  methods: {
    showEmail () {
      this.updateEmail = true
    },
    hideEmail () {
      this.updateEmail = false
    },
    showPassword () {
      this.updatePassword = true
    },
    hidePassword () {
      this.updatePassword = false
    }
  }
}
</script>

<style>
.edit-profile-main{
  padding: 20px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
.edit-heading{
  text-align: center;
}
.edit-form{
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 0px;
  max-width: 500px;
}
.edit-form > span {
  color: gray;
  cursor: pointer;
  font-weight: 500;
  border: 3px solid #E8E8E8;
  padding: 5px;
  border-radius: 7px;
}
.edit-item > label {
  font-size: 16px;
}
.edit-item > p {
  margin: 0px;
  padding: 0px;
  color: gray;
}
.edit-item > input  {
  width:100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 2px solid rgb(245,0,87, .15);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
</style>
