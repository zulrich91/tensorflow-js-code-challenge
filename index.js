async function RunModel(){

	const model = tf.sequential();
	var layer = {inputShape:[1], units:1};
	var loss = "meanSquaredError";
	var optimizer = "sgd";
	var metric = "accuracy";
	var e = document.getElementById("layer");
	var selected_layer = e.options[e.selectedIndex].text;
	/*Ensure the user selected a supported layer*/
	if (selected_layer.toLowerCase() == "dense"){
		document.getElementById('Results').innerText = ' ';
		document.getElementById("layer_error").innerHTML = " ";
		document.getElementById('opt_error').innerText = ' ';
		model.add(tf.layers.dense(layer));
	} else {
		document.getElementById('Results').innerText = ' ';
		document.getElementById("layer_error").innerHTML = "Layer not yet supported, only the Dense layer supported for now";
	}

	var opt = document.getElementById("optimiser");
	var selected_opt = opt.options[e.selectedIndex].text;
	var lss = document.getElementById("loss");
	var selected_loss= lss.options[e.selectedIndex].text;
	var met = document.getElementById("metric");
	var selected_met = met.options[e.selectedIndex].text;
	/*Verify the user's selections before compiling and fitting the model*/
	if (selected_opt.toLowerCase() =='sgd' && selected_loss.toLowerCase()=="mean squared error" && selected_met.toLowerCase()=="accuracy"){
		model.compile({
		loss:loss,
		optimizer: optimizer,
		metrics:[metric]
		});
		const data = tf.tensor2d([1,2,3,4,5,6,7,8], [8,1]);
		const labels = tf.tensor2d([-1,-2,-3,-4,-5,-6,-7,-8], [8,1]);
		await model.fit(data, labels, {epochs:50});
		/*Get the value of the prediction and display it in the html div with id Results*/
		document.getElementById('Results').innerText = model.predict(tf.tensor2d([15],[1,1])).toFloat();
	} else {
		document.getElementById('Results').innerText = ' ';
		document.getElementById("opt_error").innerHTML = 'Selected optimiser, metric or loss function not yet supported';
	}
}

/*RunModel();*/

function GetSelectedValue(){
	var e = document.getElementById("layer");
	var result = e.options[e.selectedIndex].value;
	
	document.getElementById("layer_result").innerHTML = result;
}

function GetSelectedText(){
	var e = document.getElementById("layer");
	var result = e.options[e.selectedIndex].text;
	
	document.getElementById("layer_result").innerHTML = result;
}




