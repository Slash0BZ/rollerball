var imageSrc = "texture/square.png";
function addNewRow(x, y, z){
	var table = document.getElementById("pointsDB");
	if (validate(table.rows.length, x, y, z, true) == false){
		console.log("validation falied at addNewRow()");
		return -1;
	}
	var row = document.createElement("tr");
	var set = [];
	set[0] = x;
	set[1] = y;
	set[2] = z;
	for(var i = 0; i < 3; i++){
		var cell = document.createElement("td");
		var cellText = document.createTextNode(set[i]);
		cell.appendChild(cellText);
		row.appendChild(cell);
	}
	table.appendChild(row);
	return table.rows.length - 1;
}
function validate(idx, x, y, z, newflag){
	var table = document.getElementById("pointsDB");
	var phase_1 = false;
	if (x == -1)
		x = table.rows[idx].cells[0].innerHTML;
	if (y == -1)
		y = table.rows[idx].cells[1].innerHTML;
	if (z == -1)
		z = table.rows[idx].cells[2].innerHTML;
	if (idx == 0) phase_1 = true;
	if (phase_1 == false){
		var c_x = table.rows[idx - 1].cells[0].innerHTML;
		var c_y = table.rows[idx - 1].cells[1].innerHTML;
		var c_z = table.rows[idx - 1].cells[2].innerHTML;
		if (Math.pow((x - c_x), 2) + 
			Math.pow((y - c_y), 2) + 
			Math.pow((z - c_z), 2) > 16){
				return false;
		}
	}

	if (idx == table.rows.length - 1) return true;
	if (newflag == true) return true;
	c_x = table.rows[idx + 1].cells[0].innerHTML;
	c_y = table.rows[idx + 1].cells[1].innerHTML;
	c_z = table.rows[idx + 1].cells[2].innerHTML;
	if (Math.pow((x - c_x), 2) + 
		Math.pow((y - c_y), 2) + 
		Math.pow((z - c_z), 2) > 16) return false;
	return true;
	
}
function modify(idx, x, y, z){
	/*
	if (validate(idx, x, y, z, false) == false){
		console.log("modify validation failed");
		return false;
	}
	*/
	var table = document.getElementById("pointsDB");
	if (x != -1)
		table.rows[idx].cells[0].innerHTML = x;
	if (y != -1)
		table.rows[idx].cells[1].innerHTML = y;
	if (z != -1)
		table.rows[idx].cells[2].innerHTML = z;
	return true;
}
function initTable(){
	addNewRow(66, 60.8, 55);
	addNewRow(64, 60.6, 55);
	addNewRow(62, 60.4, 55);
	addNewRow(60, 60, 55);
	addNewRow(60, 57, 55);
	addNewRow(59, 55, 55);
	addNewRow(58, 53, 55);
	addNewRow(57, 52, 55);
	addNewRow(56, 51, 55);
	addNewRow(54, 50, 55);
	addNewRow(52, 49, 55);
	addNewRow(49, 49, 55);
	addNewRow(47, 50, 55);
	addNewRow(45, 51, 55);
	addNewRow(44, 53, 55);
	addNewRow(43, 55, 55);
	addNewRow(42, 57.5, 55);
	addNewRow(41, 60.5, 55);
	addNewRow(40, 60.5, 55);
	addNewRow(39.5, 60.5, 55);
}
function clickDot(dotID){
	alert(dotID);
}
function mouseupDot(dotID, event){
if(dotID < 20){
	var newX = event.clientX;
	var newY = event.clientY;
	var newRX = newX / 5;
	var newRY = (500 - newY) / 5;
	modify(dotID, newRX, newRY, -1);
	var table = document.getElementById("pointsDB");
	var img = document.getElementById(dotID);
	img.style = "position:absolute; left:" + table.rows[dotID].cells[0].innerHTML * 5
			  + "px; top:" + (100 - table.rows[dotID].cells[1].innerHTML) * 5 + "px";
	var img2 = document.getElementById(parseInt(dotID) + 20);
	img2.style = "position:absolute; left:" + table.rows[dotID].cells[0].innerHTML * 5
			  + "px; top:" + (100 - table.rows[dotID].cells[2].innerHTML ) * 5 + "px";
}
else{
	var newX = event.clientX - 520;
	var newZ = event.clientY;
	var newRX = newX / 5;
	var newRZ = (500 - newZ) / 5;
	modify(dotID - 20, newRX, -1, newRZ);
	var table = document.getElementById("pointsDB");
	var img = document.getElementById(dotID);
	img.style = "position:absolute; left:" + table.rows[dotID - 20].cells[0].innerHTML * 5
			  + "px; top:" + (100 - table.rows[dotID - 20].cells[2].innerHTML) * 5 + "px";
	var img2 = document.getElementById(dotID - 20);
	img2.style = "position:absolute; left:" + table.rows[dotID - 20].cells[0].innerHTML * 5
			  + "px; top:" + (100 - table.rows[dotID - 20].cells[1].innerHTML) * 5 + "px";
}
}
function initXYcanvas(){
	var xyCanvas = document.getElementById("xyCanvas");
	var table = document.getElementById("pointsDB");
	for(var i = 0; i < table.rows.length; i++){
		var img = document.createElement("img");
		img.src = imageSrc;
		img.id = i;
		img.style = "position:absolute; padding:0px; left:" + table.rows[i].cells[0].innerHTML * 5
				  + "px; top:" + (100 - table.rows[i].cells[1].innerHTML) * 5 + "px";
		img.setAttribute('class', 'draggable');
		img.dragable = "true";
		xyCanvas.appendChild(img);
	}
}

function initXZcanvas(){
	var xzCanvas = document.getElementById("xzCanvas");
	var table = document.getElementById("pointsDB");
	for(var i = 0; i < table.rows.length; i++){
		var img = document.createElement("img");
		img.src = imageSrc;
		img.id = i + 20;
		var leftDistance = table.rows[i].cells[0].innerHTML * 5;
		var topDistance = (100 - table.rows[i].cells[2].innerHTML) * 5 ;
		img.style = "position:absolute; padding:0px; left:" + leftDistance 
				  + "px; top:" + topDistance + "px";
		img.setAttribute('class', 'draggable');
		img.dragable = "true";
		xzCanvas.appendChild(img);
	}
}
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    /*
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    */
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
    	mouseupDot(event.target.id, event);
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

function init(){
	initTable();
	initXYcanvas();
	initXZcanvas();
}

init();

