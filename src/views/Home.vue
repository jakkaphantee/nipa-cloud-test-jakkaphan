<template>
  <b-container class="pt-4 pb-4">
    <VideoCamera @setLoadingImage="setLoadingImage" />
    <div
      v-if="imageSource !== ''"
      class="base-card shadow mt-4"
    >
      <div v-if="isObjectDetecting" class="loading-container">
        <b-spinner class="float-center" variant="light" type="grow" />
      </div>
      <img
        :class="isObjectDetecting ? 'on-image-loading' : ''"
        width="800px"
        :src="imageSource"
      />
    </div>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import VideoCamera from '@/components/VideoCamera'

export default {
  name: 'Home',
  components: {
    VideoCamera
  },
  data() {
    return {
      imageSource: ''
    }
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
  watch: {
    isObjectDetecting(newValue) {
      if (!newValue) {
        if (!this.isDetectObjectError) {
          this.detectedObjects = this.detectedObjectData.detected_objects
          this.imageSource = 'data:image/*;base64,' + this.detectedObjectData.raw_data
        } else {
          // error
        }
      }
    }
  },
  methods: {
    ...mapActions('objectDetection', {
      detectObjectFromImage: 'detectObjectFromImage'
    }),
    setLoadingImage(base64ImageFile) {
      this.imageSource = base64ImageFile
      this.detectObjectFromImage({ base64ImageFile })
    }
  }
}
</script>

<style lang="scss" scoped>
.on-image-loading {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

.loading-container {
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
  z-index: 9999;
}
</style>
