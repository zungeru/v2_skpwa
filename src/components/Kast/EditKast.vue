<template>
  <!-- The Main Div -->
  <div class="sk-position-relative">

    <!-- The Header Div -->
    <!-- isLoading is vuex variable used for page reload -->
    <div class="sk-fixed-header" v-if="!isLoading">
      <div class="sk-fixed-header-item-flex">
        <span style="cursor: pointer;" @click="goBack">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <img src="../../assets/svg/backarrow.svg">
        </span>
        <span style="cursor: pointer;" @click="deleteCheck">
          <img src="../../assets/svg/delete.svg">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </span>
      </div>
    </div>

    <!-- The Loading Div -->
    <!-- loading variable => For the updating the kast -->
    <!-- kast-loader class from kast component -->
    <div v-if="loading" class="sk-loader"></div>

    <!-- The v-else to the Loading Div Above -->
    <div v-else>

      <div class="sk-auto-side-margin sk-main-padding" style="margin-top:50px;">
        <div style="text-align: center;" v-if="!picUploaded && !confirmDelete">
          <span
              class="sk-pink-link-sixteen"
              @click="onPickFile">
            reupload photo
          </span>
          <input
            type="file"
            style="display: none;"
            ref="fileInput"
            accept="image/*"
            multiple
            @change="onFilePicked">
        </div>
        <div v-if="picUploaded && !confirmDelete">
          <input
            type="file"
            style="display: none;"
            ref="fileUpdate"
            accept="image/*"
            multiple
            @change="onFilePicked">
          <ul style="text-align: center; padding-right: 30px;">
            <draggable v-model="pics">
              <li
                  v-for="p in pics"
                  :key="p.id"
                  style="display: inline; padding: 5px; cursor: pointer;">
                  <img v-bind:src="p.url" height="65" />
              </li>
            </draggable>
          </ul>
        </div>
        <hr v-if="!confirmDelete">
        <div
          v-if="picsLength > 1"
          style="color: #696969; font-size: 14px; text-align: center;"
          >drag photos to reorder
        </div>
        <div v-if="picUploaded && !confirmDelete" class="sk-gray-note">
          <span style="cursor: pointer;" @click="onPickFileChange">change photo<span v-if="picsLength > 1">s</span></span>
        </div>
        <form v-if="!confirmDelete" class="sk-form" action="#">
          <div class="sk-form-item">
            <label for="piece">piece</label><span>&nbsp;({{pieceCharsLeft()}})</span>
            <input
              type="text"
              name="piece"
              id="piece"
              maxlength="40"
              @input="$v.piece.$touch()"
              v-model="piece">
              <p v-if="!$v.piece.required && $v.piece.$dirty"> field required</p>
          </div>
          <br>
          <div class="sk-form-item">
            <label for="price">price</label>
            <input
              name="price"
              id="price"
              @input="$v.price.$touch()"
              v-model="price">
              <p v-if="!$v.price.required && $v.price.$dirty"> field required</p>
              <p v-if="!$v.price.decimal && $v.price.$dirty"> enter a dollar amount</p>
          </div>
          <br>
          <div class="sk-form-item">
            <label for="place">place</label>
            <input
              type="text"
              name="place"
              id="place"
              @input="$v.place.$touch()"
              v-model="place">
              <p v-if="!$v.place.required && $v.place.$dirty"> field required</p>
          </div>
          <br>
          <div class="sk-form-item">
            <label for="style-note">style note </label><span>&nbsp;({{noteCharsLeft()}})</span>
            <textarea
              type="text"
              name="style-note"
              id="style-note"
              maxlength="200"
              @input="$v.note.$touch()"
              v-model="note">
            </textarea>
            <p v-if="!$v.note.required && $v.note.$dirty"> field required</p>
          </div>
          <br>
          <div>
            <button
              class="mdl-button mdl-button--raised mdl-button--colored"
              :disabled="$v.$invalid"
              @click.prevent="onSubmit">
              submit
            </button>
          </div>
        </form>
      </div>
      <div v-if="confirmDelete" class="sk-auto-side-margin sk-no-content-main">
        <span style="font-size: 18px;">delete post?</span>
        <br><br>
        <span
          @click="deletePost"
          style="font-size: 17px; color: #ff0800; cursor:pointer;">
            delete
        </span>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span
          @click="deleteCancel"
          style="font-size: 17px; color: #137E8D; cursor:pointer;">
            cancel
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { required, maxLength, decimal } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data () {
    return {
      pics: [],
      picsLength: 0,
      picUploaded: false,
      piece: '',
      price: '',
      place: '',
      note: '',
      loading: false,
      confirmDelete: false
    }
  },
  watch: {
    $route (to, from) {
      if(to.params.post_id) {
        this.getPost()
      }
    }
  },
  components: {
    draggable
  },
  validations: {
    piece: {
      required,
      maxLen: maxLength(40)
    },
    note: {
      required,
      maxLen: maxLength(200)
    },
    price: {
      required,
      decimal
    },
    place: {
      required
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onPickFileChange () {
      this.$refs.fileUpdate.value = null
      this.pics = []
      this.picsLength = 0
      this.$refs.fileUpdate.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      if (files[0]) {
        this.pics.push({'id': 0, 'file': files[0], url: ''})
        this.picsLength++
      }
      if (files[1]) {
        this.pics.push({'id': 1, 'file': files[1], url: ''})
        this.picsLength++
      }
      if (files[2]) {
        this.pics.push({'id': 2, 'file': files[2], url: ''})
        this.picsLength++
      }

      for (let c of this.pics) {
        this.fileReader(c)
      }
      console.log(this.pics)
    },
    fileReader (file) {
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          file['url'] = fileReader.result
          if (this.pics.length === this.picsLength) {
            this.picUploaded = true
          }
        })
        fileReader.readAsDataURL(file['file'])
    },
    getPost () {
      const token = localStorage.getItem('token')
      const post_id = this.$route.params.post_id
      axios.get('http://localhost:5000/post/' + post_id,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            console.log(res.data)
            this.piece = res.data.post.piece
            this.price = res.data.post.price
            this.place = res.data.post.place
            this.note =  res.data.post.note
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    pieceCharsLeft () {
      return this.$v.piece.$params.maxLen.max - this.piece.length
    },
    noteCharsLeft() {
      return this.$v.note.$params.maxLen.max - this.note.length
    },
    onSubmit () {
      this.loading = true
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      const fd = new FormData()
      fd.append('post_id', this.$route.params.post_id)
      fd.append('piece', this.piece)
      fd.append('price', this.price)
      fd.append('place', this.place)
      fd.append('note', this.note)
      fd.append('pic_1', (this.pics[0] ? this.pics[0]['file'] : null))
      fd.append('pic_2', (this.pics[1] ? this.pics[1]['file'] : null))
      fd.append('pic_3', (this.pics[2] ? this.pics[2]['file'] : null))
      console.log(fd)
      axios.post('http://localhost:5000/post/update', fd, {
        headers:
          {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            this.loading = false
            this.$router.push({ name: 'userprofile', params: { username: username }})
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    },
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    deleteCheck (){
      this.confirmDelete = true
    },
    deleteCancel () {
      this.confirmDelete = false
    },
    deletePost () {
      const token = localStorage.getItem('token')
      const username = localStorage.getItem('username')
      const post_id = this.$route.params.post_id
      axios.get('http://localhost:5000/post/delete/' + post_id,
        { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => {
          if (res.data.skStatus === 'Fail') {
            this.$router.push({name: 'error'})
          }
          if (res.data.skStatus === 'Pass') {
            this.$router.push({ name: 'userprofile', params: { username: username }})
          }
        })
        .catch(err => this.$router.push({name: 'error'}))
    }
  },
  beforeMount () {
    this.getPost()
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
    this.confirmDelete = false
    this.loading = false
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
