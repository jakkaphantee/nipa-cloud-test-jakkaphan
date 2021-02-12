<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { convertImageToBase64 } from '@/helpers/convertImageToBase64'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState('objectDetection', {
      isObjectDetecting: state => state.detectedObject.isLoading,
      detectedObjectData: state => state.detectedObject.data
    }),
    ...mapGetters('objectDetection', {
      isDetectObjectError: 'isDetectObjectError'
    })
  },
  methods: {
    ...mapActions('objectDetection', {
      detectObjectFromImage: 'detectObjectFromImage'
    }),
  }
}
</script>
