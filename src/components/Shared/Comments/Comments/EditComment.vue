<template>
    <div class="edit-comment-main">
      <div class="edit-comment-fixed-header">
        <div class="edit-comment-header-item">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span @click="goBack">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/>
            </svg>
          </span>
          <span @click="deleteComment">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 21h12V7H6v14zm2.46-9.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4h-3.5z"/>
            </svg>
          </span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
      <form class="edit-comment-form" action="#">
            <label for="comment">edit your comment...({{commentCharsLeft()}})</label>
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
              edit
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
    getComment () {
      const token = localStorage.getItem('token')
      const comment_id = this.$route.params.comment_id
      axios.get('http://localhost:5000/comment/' + comment_id,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          console.log(response.data)
          this.comment = response.data.comment.comment
        })
        .catch(error => console.log(error))
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onSubmit () {
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('comment_id', this.$route.params.comment_id)
      fd.append('comment', this.comment)
      axios.post('http://localhost:5000/comment/update', fd, {
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
    },
    deleteComment () {
      const token = localStorage.getItem('token')
      const comment_id = this.$route.params.comment_id
      axios.get('http://localhost:5000/comment/delete/' + comment_id,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => {
          console.log(response.data)
          this.goBack()
        })
        .catch(error => console.log(error))
    }
  },
  beforeMount () {
    this.getComment()
  },
  activated () {
    this.getComment()
  },
}
</script>

<style>
.edit-comment-main {
  position: relative;
}
.edit-comment-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.edit-comment-header-item {
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  justify-content: space-between;
  display: flex;
}
.edit-comment-header-item span {
  cursor: pointer;
}
.edit-comment-form {
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
