<template>
    <div class="sk-position-relative">

      <!-- Fixed Header -->
      <div class="sk-fixed-header" v-if="!isLoading" >
        <div class="sk-fixed-header-item-flex-3">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span @click="goBack">
            <img style="cursor: pointer;" src="../../../../assets/svg/backarrow.svg">
          </span>
        </div>
      </div>
      <!-- End Fixed Header -->


      <!-- Add Comment Form -->
      <form class="add-comment-form sk-auto-side-margin" action="#">
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
