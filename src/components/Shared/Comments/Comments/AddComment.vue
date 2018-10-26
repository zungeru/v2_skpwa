<template>
    <div class="main">
      <div class="add-comment-fixed-header">
        <div class="add-comment-header-item">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
            </svg>
          </span>
        </div>
      </div>
      <form class="comment-form" action="#">
            <label for="comment">add a comment...({{commentCharsLeft()}})</label>
            <hr>
            <textarea
              type="text"
              name="comment"
              id="comment"
              maxlength="200"
              placeholder="max 200 chars"
              @input="$v.comment.$touch()"
              v-model="comment">
            </textarea>
            <p v-if="!$v.comment.required && $v.comment.$dirty"> required</p>
          <div>
            <br>
            <button
              class="mdl-button mdl-button--raised mdl-button--colored"
              :disabled="$v.$invalid"
              @click.prevent="onSubmit">
              add
            </button>
          </div>
     </form>
    </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data () {
    return {
      comment: ''
    }
  },
  validations:{
    comment: {
      required,
      maxLen: maxLength(200)
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onSubmit () {
      const token = localStorage.getItem('token')
      const requesting_user = localStorage.getItem('username')
      const id = this.$route.params.post_id
      const fd = new FormData()
      fd.append('comment', this.comment)
      axios.post('http://localhost:5000/comment/create/' + id, fd, {
        headers:
          {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => console.log(error))
    },
    commentCharsLeft () {
      return this.$v.comment.$params.maxLen.max - this.comment.length
    }
  }
}
</script>

<style>
.main {
  position: relative;
}
.add-comment-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.add-comment-header-item {
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  display: flex;
  justify-content: flex-start;
}
.add-comment-header-item span {
  cursor: pointer;
}
.comment-form {
  margin-top: 60px;
  padding: 10px 30px 10px 30px;
  margin-right: auto;
  margin-left: auto;
  max-width: 500px;
}
textarea {
    width: 100%;
    height: 100px;
    padding: 10px 15px;
    box-sizing: border-box;
    border: 2px solid rgb(245,0,87, .15);
    border-radius: 5px;
    background-color: rgb(237,237,237, .4);
    resize: none;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;

}
</style>
