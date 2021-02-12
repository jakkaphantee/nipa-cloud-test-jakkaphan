<template>
	<div class="base-card shadow">
		<div>
			<video ref="videoStream" autoplay width="720px" height="fit-content" />
		</div>
		<canvas ref="videoCanvas" hidden />
		<div>
			<b-button class="white-button" size="sm" @click="takeScreenShot()">
				<img src="@/assets/static/camera_shutter.svg" height="30px" width="30px" />
			</b-button>
		</div>
		<div class="mt-2">
			<input
				ref="imageSelector"
				type="file"
				accept="image/jpg, image/png, image/jpeg"
				hidden
				@change="onImageSelected($event)"
			>
			<b-button class="white-button ml-2" size="sm" @click="$refs.imageSelector.click()">
				Browse in your computer
			</b-button>
		</div>
	</div>
</template>

<script>
import { convertImageToBase64 } from '@/helpers/convertImageToBase64'

export default {
	data() {
		return {
			videoStream: {},
			testSrc: ''
		}
	},
	mounted() {
		this.requestCameraAccess()
	},
	methods: {
		async requestCameraAccess() {
			// request camera access
			const videoRequirement = {
				video: {
					width: {
						min: 1280,
						ideal: 1920,
						max: 2560,
					},
					height: {
						min: 720,
						ideal: 1080,
						max: 1440,
					}
				}
			}
			try {
				if (
					'mediaDevices' in navigator &&
					'getUserMedia' in navigator.mediaDevices
				) {
					const videoStream = await navigator.mediaDevices.getUserMedia(videoRequirement)
					this.$refs.videoStream.srcObject = videoStream
				} else {
					Promise.reject({ error: 'NO_CAMERA' })
				}
			} catch (error) {
				alert('Please allow camera access')
			}
		},
		takeScreenShot() {
			const videoStream = this.$refs.videoStream
			const videoCanvas = this.$refs.videoCanvas
			videoCanvas.width = videoStream.videoWidth
			videoCanvas.height = videoStream.videoHeight
			videoCanvas.getContext("2d").drawImage(videoStream, 0, 0)
			const base64ImageFile = videoCanvas.toDataURL('image/jpeg')
			this.$emit('setLoadingImage', base64ImageFile)
		},
		async onImageSelected(event) {
      const files = event.target?.files || []
      if (files.length > 0) {
        const base64ImageFile = await convertImageToBase64({ imageFile: files[0] })
        this.imageSource = base64ImageFile
				this.$emit('setLoadingImage', base64ImageFile)
      } else {
        // error no image
      }
      this.$refs.imageSelector.value = ''
    }
	}
}
</script>

<style lang="scss" scoped>
.white-button {
	background-color: white;
	color: #2d2d2d;

	&:hover {
		background-color: gainsboro;
	}

	&:active {
		background-color: darkgray !important;
		box-shadow: none !important;
	}

	&:focus {
		box-shadow: none !important;
	}
}
</style>
