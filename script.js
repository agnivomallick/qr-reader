const wrapper = document.querySelector('.wrapper'),
uploadBox = wrapper.querySelector('.upload'),
form = uploadBox.querySelector('form'),
fileInp = form.querySelector('input'),
img = form.querySelector('img'),
infoText = form.querySelector("p"),
txt = wrapper.querySelector('textarea'),
btnContainer = wrapper.querySelector('.btns'),
btns = btnContainer.querySelectorAll('button');

form.addEventListener('click', () => fileInp.click());
if(!fileInp) {
    alert("You have not chosen any file");
}


function fetchReq(formData, file) {
    infoText.innerText = "Scanning QR Code..."
    fetch("http://api.qrserver.com/v1/read-qr-code/", {method:"POST", body:formData}).then((res) => res.json()).then((content) => {
        img.src = URL.createObjectURL(file);
        content = content[0].symbol[0].data;
        txt.value = content;
        infoText.innerText = "Upload QR Code To Scan";
        wrapper.classList.add('active');
    })
}

btns.forEach((btn)=>{
    btn.addEventListener('click', ()=> {
        if(btn.id == "copy") {
            navigator.clipboard.writeText(txt.value);
        } else {
            wrapper.classList.remove('active');
        }
    })
})
fileInp.addEventListener('change', ()=> {
    let file = fileInp.files[0];
    var fdata = new FormData();
    fdata.append("file", file);
    fetchReq(fdata, file);
})