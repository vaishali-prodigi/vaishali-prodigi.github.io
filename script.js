/**
 * @author Vaishali.Goyal
 */

	
function getData(arr){	
	
	var current_page = 1;
	var items_per_page = 5;
	
	var options = "<option value='all'>All</option>";
	
	temp = {};
	// Store each of the elements in an object keyed of of the name field.  If there is a collision (the name already exists) then it is just replaced with the most recent one.
	for(var i=0; i<arr.length; i++){
		temp[arr[i].paymentStatus] = arr[i];		
	}
	
	for(var option in temp){
		options += "<option value='" + option + "'>" + option + "</option>";		
	}
	
	document.getElementById('payment-status').innerHTML = options;
	
	/* End of Payment Status */
	
		
    var items = "";
    for (var i = 0; i < arr.length; i++) {       
        if(i + 1 === items_per_page){
        	items += "<option selected value='" + (i + 1) + "'>" + (i + 1) + "</option> ";
        }
        else{
        	items += "<option value='" + (i + 1) + "'>" + (i + 1) + "</option> ";
        }
    }
    document.getElementById("items").innerHTML = items;
    
    /* End of Items Per Page */
   
	
	document.getElementById('btn_prev').addEventListener('click', function prevPage(){
		if (current_page > 1) {
	        current_page--;
	        changePage(current_page);
	    }
	});
	
	document.getElementById('btn_next').addEventListener('click', function nextPage(){
		if (current_page < numPages()) {
	        current_page++;
	        changePage(current_page);
	    }
	});
	
	
	document.getElementById('items').addEventListener('change', function(){
		console.log(this.value);
		items_per_page = this.value;
		changePage(page);
	});
	
	document.getElementById('payment-status').addEventListener('change', function(){
		status = this.value;
		filterData(status);
	});
	
	function filterData(filter){
		filteredData = [];
		
		if(filter === "all"){
			filteredData = arr;
			console.log(arr);
		}
		else{
			for(var i=0; i<arr.length; i++){
				if(arr[i].paymentStatus === filter){
					filteredData.push(arr[i]);
					console.log(arr[i].paymentStatus);
				}
				
			}
			//console.log(filteredData);
			//console.log(filteredData.length);
		}
		tableData(filteredData);
	}
	
	function tableData(filteredData){
		var tbody = document.getElementsByTagName("tbody");
		
		console.log(filteredData);
	    var tableData = '';
		for(var i = 0;  i < filteredData.length; i++){
			tableData += '<tr>';
			tableData += '<td>' + filteredData[i].paymentId + '</td>';
			tableData += '<td>' + filteredData[i].orderDate + '</td>';
			tableData += '<td>' + filteredData[i].merchatId + '</td>';
			tableData += '<td>' + filteredData[i].customerEmail + '</td>';
			tableData += '<td>' + filteredData[i].amount + '</td>';
			tableData += '<td>' + filteredData[i].paymentStatus + '</td>';
			tableData += '</tr>';
		}
		//console.log(tableData);
		tbody[0].innerHTML = tableData;
	}
	
	function numPages(){
		return Math.ceil(arr.length / items_per_page);
	}
	
	
	function changePage(page){
		var btn_next = document.getElementById("btn_next");
	    var btn_prev = document.getElementById("btn_prev");
	    var tbody = document.getElementsByTagName("tbody");
	 
	    // Validate page
	    if (page < 1){
	    	page = 1;
	    }
	    if (page > numPages()){
	    	page = numPages();
		}
		
	    
	
	    count = [];
		for(var i = (page-1) * items_per_page; i < (page * items_per_page) && i < arr.length; i++){
			count.push(arr[i]);
		}
		console.log(count);
		tableData(count);
	    
	
	    if (page == 1) {
	        btn_prev.style.visibility = "hidden";
	    } else {
	        btn_prev.style.visibility = "visible";
	    }
	
	    if (page == numPages()) {
	        btn_next.style.visibility = "hidden";
	    } else {
	        btn_next.style.visibility = "visible";
	    }
	}
	changePage(1);
}






