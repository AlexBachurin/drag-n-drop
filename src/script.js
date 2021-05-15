//get elems
const dropArea = document.querySelector('.drag-area');

//global file variable 
let file;
//array with valid extensions
const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

//over drag area
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('area-active')
})

//leave drag area
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('area-active')
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
    }
})