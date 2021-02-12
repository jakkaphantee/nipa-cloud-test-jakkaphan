import {
	objectDetectionService
} from './nvisionInstance'

const detectObjectFromImage = ({ base64ImageFile }) => objectDetectionService.predict({
	rawData: base64ImageFile,
	outputVisualizedImage: true
})

export {
	detectObjectFromImage
}
