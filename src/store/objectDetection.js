import {
	detectObjectFromImage
} from '@/service/nvision/objectDetection.api'

import {
	START_IMAGE_DETECTION,
	IMAGE_DETECTION_SUCCESS,
	IMAGE_DETECTION_FAILURE
} from './types'

const state = () => ({
	detectedObject: {
		isLoading: false,
		isSuccess: false,
		data: {},
		errorMessage: ''
	}
})

const getters = {
	isDetectObjectError: (state) => {
		if (!state.detectedObject.isLoading) {
			return !state.detectedObject.isSuccess
		}
		return false
	}
}

const mutations = {
	[START_IMAGE_DETECTION]: (state) => {
		state.detectedObject = {
			...state.detectedObject,
			isLoading: true,
			isSuccess: false
		}
	},
	[IMAGE_DETECTION_SUCCESS]: (state, response) => {
		state.detectedObject = {
			...state.detectedObject,
			isLoading: false,
			isSuccess: true,
			data: response
		}
	},
	[IMAGE_DETECTION_FAILURE]: (state, error) => {
		state.detectedObject = {
			...state.detectedObject,
			isLoading: false,
			isSuccess: false,
			errorMessage: error.messagge
		}
	},
}

const actions = {
	detectObjectFromImage: async ({ commit }, { base64ImageFile }) => {
		commit(START_IMAGE_DETECTION)
		try {
			const replacedBase64String = base64ImageFile.replace('data:', '').replace(/^.+,/, '')
			const response = await detectObjectFromImage({ base64ImageFile: replacedBase64String })
			commit(IMAGE_DETECTION_SUCCESS, response)
		} catch (error) {
			commit(IMAGE_DETECTION_FAILURE, error.response?.data)
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}
