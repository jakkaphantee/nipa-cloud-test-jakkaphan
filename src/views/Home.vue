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
  methods: {
    ...mapActions('objectDetection', {
      detectObjectFromImage: 'detectObjectFromImage'
    }),
    async onImageSelected(event) {
      const files = event.target?.files || []
      if (files.length > 0) {
        const base64ImageFile = await convertImageToBase64({ imageFile: files[0] })
        this.imageSource = base64ImageFile
        this.detectObjectFromImage({ base64ImageFile })
      } else {
        // error no image
      }
    }
  }
}
</script>
