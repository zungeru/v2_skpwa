<template>
    <div class="sk-position-relative">

      <!-- Edit Comment Header -->
      <div class="sk-fixed-header" v-if="!isLoading">
        <div class="sk-fixed-header-item-flex">

          <span @click="goBack">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <img style="cursor: pointer;" src="../../../../assets/svg/backarrow.svg">
          </span>
          <span @click="deleteCheck">
            <img style="cursor: pointer;" src="../../../../assets/svg/delete.svg">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          </span>
        </div>
      </div>
      <!-- End Edit Comment Header -->

      <div v-if="confirmDelete" class="sk-auto-side-margin sk-no-content-main">
        <span style="font-size: 18px;">delete comment?</span>
        <br><br>
        <span
          @click="deleteComment"
          style="font-size: 18px; color: #ff0800; font-weight:500; cursor:pointer;">
            delete
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span
          @click="deleteCancel"
          style="font-size: 18px; color: #137E8D; font-weight:500; cursor:pointer;">
            cancel
        </span>
      </div>

      <div v-else>
        <form class="add-comment-form sk-auto-side-margin" action="#">
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

    </div>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data () {
    return {
      comment: '',
      confirmDelete: false
    }
  },
  validations: {
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
    getComment () {
      const token = localStorage.getItem('token')
      const commentId = this.$route.params.comment_id
      axios.get('http://localhost:5000/comment/' + commentId,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          console.log(res.data)
          if(res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if(res.data.skStatus === 'Pass') {
            this.comment = res.data.comment.comment
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
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
        { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if(res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if(res.data.skStatus === 'Pass') {
            this.goBack()
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    commentCharsLeft () {
      return this.$v.comment.$params.maxLen.max - this.comment.length
    },
    deleteCheck (){
      this.confirmDelete = true
    },
    deleteCancel () {
      this.confirmDelete = false
    },
    deleteComment () {
      const token = localStorage.getItem('token')
      const commentId = this.$route.params.comment_id
      axios.get('http://localhost:5000/comment/delete/' + commentId,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if(res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if(res.data.skStatus === 'Pass') {
            this.goBack()
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    }
  },
  activated () {
    this.getComment()
    document.querySelector('.mdl-layout__content').scrollTop = 0
    this.confirmDelete = false
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
