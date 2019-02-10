<template>
  <!-- The Main Div -->
  <div class="edit-kast-main">

    <!-- The Header Div -->
    <!-- isLoading is vuex variable used for page reload -->
    <div class="edit-kast-fixed-header" v-if="!isLoading">
      <div class="edit-kast-header-item">
        <span @click="goBack">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <img src="../../assets/svg/backarrow.svg">
        </span>
        <span @click="deleteCheck">
          <img src="../../assets/svg/delete.svg">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </span>
      </div>
    </div>


    <!-- The Loading Div -->
    <!-- loading variable => For the updating the kast -->
    <!-- kast-loader class from kast component -->
    <div v-if="loading" class="kast-loader"></div>

    <!-- The v-else to the Loading Div Above -->
    <div v-else>

      <div class="edit-kast-body">
        <div class="edit-kast-pics" v-if="!picUploaded && !confirmDelete">
          <span
              class="edit-kast-button"
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
          <ul>
            <draggable v-model="pics">
              <li v-for="p in pics" :key="p.id">
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
        <div v-if="picUploaded && !confirmDelete" class="edit-change-photo">
          <span style="cursor: pointer;" @click="onPickFileChange">change photo<span v-if="picsLength > 1">s</span></span>
        </div>
        <form v-if="!confirmDelete" class="edit-form-main" action="#">
          <div class="edit-form-item">
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
          <div class="edit-form-item">
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
          <div class="edit-form-item">
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
          <div class="edit-form-item">
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
      <div v-if="confirmDelete" class="confirm-delete">
        <span style="font-size: 18px;">delete post?</span>
        <br><br>
        <span
          @click="deletePost"
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
    </div>
    <!-- Here -->

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
      // this.picsLength = event.target.files.length
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
        .then(response => {
          console.log(response.data)
          this.piece = response.data.post.piece
          this.price = response.data.post.price
          this.place = response.data.post.place
          this.note =  response.data.post.note
        })
        .catch(error => console.log(error))
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
      let vm = this
      axios.post('http://localhost:5000/post/update', fd, {
        headers:
          {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
          console.log(res)
          vm.loading = false
          vm.$router.push({ name: 'post', params: { post_id: res.data.post_id } })
        })
        .catch(error => console.log(error))
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
        .then(response => {
          console.log(response.data)
          this.$router.replace({ name: 'userprofile', params: { username: username }})
        })
        .catch(error => console.log(error))
    }
  },
  beforeMount () {
    this.getPost()
  },
  activated () {
    document.querySelector('.mdl-layout__content').scrollTop = 0
  }
}
</script>

<style>
.edit-kast-main {
  position: relative;
}
.edit-kast-fixed-header {
  position: fixed;
  top: 0px;
  background-color: #ededed;
  margin-top: 56px;
  height: 45px;
  width: 100%;
}
.edit-kast-header-item {
  margin-right: auto;
  margin-left: auto;
  margin-top: 12px;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
}
.edit-kast-header-item span {
  cursor: pointer;
}
.edit-kast-body {
  padding: 0px 15px 10px 15px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 70px;
  max-width: 500px;
}
.edit-kast-pics {
  text-align: center;
}
.edit-form-main {
  padding: 0px 15px 10px 15px;
}
.edit-form-item > label {
  font-size: 16px;
}
.edit-form-item > p {
  margin: 0px;
  padding: 0px;
  color: #f50057;
}
.edit-form-item > input  {
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
.edit-form-item > textarea {
  width: 100%;
  height: 100px;
  padding: 10px 15px;
  box-sizing: border-box;
  /* border: 2px solid rgb(245,0,87, .15); */
  border: 2px solid rgb(176,176,176, .35);
  border-radius: 5px;
  background-color: rgb(237,237,237, .4);
  resize: none;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
}
.edit-kast-button {
  color: #ff0800;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  padding-top:10px;
  padding-bottom: 10px;
  cursor: pointer;
}
.edit-change-photo{
  color: #ff0800;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  padding-top:10px;
  padding-bottom: 10px;
}
.confirm-delete{
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  max-width: 500px;
  text-align: center;
}
</style>
