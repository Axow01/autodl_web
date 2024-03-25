
// type 0 == piratebay & type 1 == yts.mx

class DownloadItem {
	constructor(id, name, magnet, isDownload, type, uniqueID) {
		this.id = id;
		this.name = name;
		this.magnet = magnet;
		this.isDownload = isDownload;
		this.type = type;
		this.uniqueID = uniqueID;
	}
}

let downloadItems = [];
let selectedItems = [];

// function downloadAll() {
// 	var downloadItemsJson = JSON.stringify(downloadItems);
// 	var xhttp = new XMLHttpRequest();

// 	console.log("est");
// 	xhttp.open("POST", "http://bigoula.ddns.net:8888/");
// 	xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
// 	xhttp.setRequestHeader("Content-Type", "application/json");
// 	xhttp.send(downloadItemsJson);
// }

async function downloadAll(uniqueID) {
	uniqueID = unn();
	downloadItems.forEach((element) => {
		if (element.isDownload == true) {
			element.uniqueID = uniqueID;
			selectedItems.push(element);
		}
	})
	var downlaodItemsJson = JSON.stringify(selectedItems);
	var te = {
		selectedElement: downlaodItemsJson
	};
	await fetch('getjj.php', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: downlaodItemsJson
	})
	console.log(selectedItems);
	selectedItems.splice(0, selectedItems.length);
	downloadItems.splice(0, downloadItems.length);
	console.log(selectedItems, downloadItems);
	fetch("http://bigoula.ddns.net:8888/", {
		method: "POST",
		mode: "no-cors",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json"
		},
		body: downlaodItemsJson
	});
	var oldResults = document.getElementsByName("_results");
	for (var i = 0; oldResults[i]; i++) {
		console.log("iterations...");
		oldResults[i].parentNode.removeChild(oldResults[i]);
	}
	return downlaodItemsJson;
}

function selectForDl(index) {
	if (downloadItems[index].isDownload) {
		document.querySelector('#downRes' + index).style.color = 'white';
		downloadItems[index].isDownload = false;
	}
	else {
		downloadItems[index].isDownload = true;
		document.querySelector('#downRes' + index).style.color = '#06b86b';
	}
}

function showResults() {
	var div = document.createElement("div");
	var ul = document.createElement("ul");

	document.querySelector('.loading-logo').style.display = 'none';
	div.setAttribute("name", "_results");
	div.setAttribute("class", "_resultsClass");
	for (let i = 0; i < downloadItems.length; i++) {
		var li = document.createElement("li");
		var button = document.createElement("button");

		button.setAttribute("onclick", "selectForDl(" + i + ")");
		button.textContent = downloadItems[i].name;
		button.setAttribute("id", "downRes" + i);
		li.appendChild(button);
		ul.appendChild(li);
	}
	div.appendChild(ul);
	document.body.appendChild(div);
}

function loading() {
	var lol = document.querySelector(".loading-logo");

	lol.style.display = 'block';
}

function sendRequest(event) {
	var oldResults = document.getElementsByName("_results");
	for (var i = 0; oldResults[i]; i++) {
		console.log("iterations...");
		oldResults[i].parentNode.removeChild(oldResults[i]);
	}
	event.preventDefault(); // Prevent page reload
	console.log("sending request");
	var search = document.getElementsByName("_search")[0].value;
	document.getElementsByName("_search")[0].value = "";
	if (search == "")
		return;
	var type = 1; // movie by default.
	var automode = 0; // By default off.
	if (document.getElementsByName("_tvshow")[0].checked)
		type = 0;
	if (document.getElementsByName("_automode")[0].checked)
		automode = 1;
	loading();
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
	xhttp.open("GET", "http://bigoula.ddns.net:8888/?type=" + type + "&search=" + search + "&count=20&auto=" + automode, true);
	xhttp.send();
}
