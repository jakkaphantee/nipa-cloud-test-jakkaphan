<template>
  <b-container>
    <input
      ref="imageSelector"
      type="file"
      accept="image/jpg, image/png, image/jpeg"
      hidden
      @change="onImageSelected($event)"
    >
    <b-button
      size="sm"
      @click="$refs.imageSelector.click()"
    >
      Select Image
    </b-button>
    <div>
      <img
        width="500px"
        :src="imageSource"
      />
    </div>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { convertImageToBase64 } from '@/helpers/convertImageToBase64'

export default {
  name: 'Home',
  data () {
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
