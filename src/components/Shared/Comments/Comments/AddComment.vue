<template>
    <div class="add-comment-main">

      <!-- Fixed Header -->
      <div class="add-comment-fixed-header" v-if="!isLoading" >
        <div class="add-comment-header-item">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span @click="goBack">
            <img src="../../../../assets/svg/backarrow.svg">
          </span>
        </div>
      </div>
      <!-- End Fixed Header -->


      <!-- Add Comment Form -->
      <form class="add-comment-form" action="#">
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
     <!-- End Add Comment Form -->

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
  computed: {
    isLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    onSubmit () {
      const token = localStorage.getItem('token')
      const id = this.$route.params.post_id
      const fd = new FormData()
      fd.append('comment', this.comment)
      axios.post('http://localhost:5000/comment/create/' + id, fd, {
        headers:
          {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if(res.data.skStatus === 'Fail') {
          this.$router.push({name: 'error'})
        }
        if (res.data.skStatus === 'Pass') {
          this.comment = ''
          window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
      })
      .catch(err => this.$router.push({name: 'error'}))
    },
    commentCharsLeft () {
      return this.$v.comment.$params.maxLen.max - this.comment.length
    }
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  },
  beforeRouteEnter (to, from, next) {
    const now = (new Date()).getTime()
    const expDate = (new Date(localStorage.getItem('expirationDate'))).getTime()
    const noToken = !localStorage.getItem('token')
    if ( (noToken) || (now >= expDate) ) {
      next('/login')
    } else {
      next()
    }
  }
}
</script>

<style>
.add-comment-main {
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
.add-comment-form {
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
