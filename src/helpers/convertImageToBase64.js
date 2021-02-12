export const convertImageToBase64 = ({ imageFile }) => new Promise((resolve, reject) => {
	const allowImageTypes = ['image/jpg', 'image/png', 'image/jpeg']
	if (allowImageTypes.includes(imageFile.type)) {
		const reader = new FileReader()
		reader.readAsDataURL(imageFile)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	} else {
		// reject wrong type error
	}
})
