const url = "http://localhost:3000/api/";

function getAllUser() {
    const req = new XMLHttpRequest();

    req.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let respons = JSON.parse(this.response);
            console.log(respons.status);
            console.log(respons.statusText);
            console.log(respons.data);
        }
    };

    req.open('GET', url);
    req.send();
}
