//get elems
const dropArea = document.querySelector('.drag-area'),
    areaText = document.querySelector('.drag__header'),
    browseBtn = document.querySelector('.drag__browseBtn');

//global file variable 
let file;
//array with valid extensions
const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

//over drag area
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('area-active')
    areaText.textContent = "Release to upload file"
})

//leave drag area
dropArea.addEventListener('dragleave', (e) => {
    const rect = dropArea.getBoundingClientRect();
    //fix for firing dragLeave when we hover on button
    //if we outside drag area coords then do things
    if (e.clientY < rect.top || e.clientY >= rect.bottom || e.clientX <= rect.left || e.clientX >= rect.right) {
        dropArea.classList.remove('area-active')
        areaText.textContent = 'Drag & Drop to Upload File'
    }
})
//drop file in area
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    //getting file, and if multiple files are selected get only first one
    file = e.dataTransfer.files[0];
    console.log(file);
    //get file type
    const fileType = file.type;
    console.log(fileType)
    if (validExtensions.includes(fileType)) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
            const fileUrl = fileReader.result;
            console.log(fileUrl);
            const img = `<img src="${fileUrl}">` // create and img tag and pass file url in src
            dropArea.innerHTML = img;
        }
        fileReader.readAsDataURL(file);
    } else {
        console.log('not valid')
        dropArea.classList.remove('area-active')
    }
})
//browse button 