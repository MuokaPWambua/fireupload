import resize from './resize'
import firebase from 'firebase/compat/app';
import "firebase/compat/storage"


const upload = async (file, config, width=320, height=320) => {

    if(file == null) alert('file required');

    firebase.initializeApp(config);

	const storage = firebase.storage(),
    filename =  file.name.split('.')[0] + width.toString() + '.' + file.name.split('.').pop(),
    resized = await resize(file, width, height),

    uploadUrl = () => new Promise(resolve =>(
    
    storage.ref(filename).put(resized[0]).on("state_changed" , console.log('files uploading done'), alert,
    () => storage.ref().child(filename).getDownloadURL().then(url =>resolve(url)))))

    return await uploadUrl()
}

export default upload
