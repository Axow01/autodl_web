
class DownloadItem {
	constructor(id, name, magnet, isDownload, type) {
		this.id = id;
		this.name = name;
		this.magnet = magnet;
		this.isDownload = isDownload;
		this.type = type;
	}
}

let downloadItems = [];

function downloadAll() {
	var downloadItemsJson = JSON.stringify(downloadItems);
	var xhttp = new XMLHttpRequest();

	console.log("est");
	xhttp.open("POST", "http://bigoula.ddns.net:8888/");
	xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(downloadItemsJson);
}

function selectForDl(index) {
	downloadItems[index].isDownload = true;
	console.log("change correctly");
}

function showResults() {
	var div = document.createElement("div");
	var ul = document.createElement("ul");

	div.setAttribute("name", "_results");
	for (var i = 0; i < downloadItems.length; i++) {
		var li = document.createElement("li");
		var button = document.createElement("button");

		button.setAttribute("onclick", "selectForDl(" + i + ")");
		button.textContent = "select";
		li.textContent = downloadItems[i].name;
		li.appendChild(button);
		ul.appendChild(li);
	}
	div.appendChild(ul);
	document.body.appendChild(div);
}

function sendRequest(event) {
	event.preventDefault(); // Prevent page reload
	console.log("sending request");
	var search = document.getElementsByName("_search")[0].value;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			var response = JSON.parse(this.responseText);
			downloadItems = [];

			for (var i = 0; i < response.length; i++) {
				var item = new DownloadItem(response[i].id, response[i].name, response[i].magnet, response[i].isDownload, response[i].type);
				downloadItems.push(item);
			}
			showResults();
		}
	};
	xhttp.open("GET", "http://bigoula.ddns.net:8888/?type=0&search=" + search + "&count=5&auto=0", true);
	xhttp.send();
}
