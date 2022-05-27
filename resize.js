const resize = (file, width=320, height=320)=> new Promise(resolve => {

	const reader = new FileReader();

	reader.onload = () =>{
		const img = new Image();

		const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

		img.onload = () =>{
			canvas.width = width
			canvas.height = height

			ctx.drawImage(img, 0, 0, img.width, img.height,  0, 0, canvas.width, canvas.height); // destination rectangle
			const imageUrl = canvas.toDataURL(file.type, 0.95)
			canvas.toBlob( blob => resolve([blob, imageUrl]), file.type, 0.95)
		}

		img.src = reader.result;
	}

	reader.readAsDataURL(file);

})

export default resize

