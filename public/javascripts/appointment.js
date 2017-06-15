function getAppts() {
    
    var availBus = document.getElementById('availBusinesses'),
    prefDate = document.getElementById('preferedDate').value,
    business = availBus.options[availBus.selectedIndex].text;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
	    let resJson = JSON.parse(this.responseText);
            renderApptTags(resJson['hrs'],resJson['business']);
	    let business = document.createElement('p'); business.id = 'business';
	    document.getElementById('apptInfo').appendChild(business);
	}
    };
				
     xhttp.open("GET","/appointment?business=" + business + "&preferedDate="+prefDate,true);
     xhttp.send();

}
      

function renderForm(json) {
    
    var overlay = document.getElementById('overlay'),
	span = document.getElementsByClassName('close')[0];
    
    span.onclick = function() { overlay.style.display = "none"; }

    window.onclick = function(event) {
        if(event.target == overlay) overlay.style.display = "none";
    };

    // renders the company's form with the specified options
    $(document.getElementById('busForm')).formRender({ formData: json['formContent'],
	                                                   dataType: 'json' });
    
    overlay.style.display = "block";
    
} 


function getForm(url) {
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
	    let resJson = JSON.parse(this.responseText);
	    renderForm(resJson);
	}
    };
			
    xhttp.open("GET",url,true);
    xhttp.send();
}

function renderApptTags(apptTimes,business) {
    
    var elem = document.getElementById('apptInfo');
    elem.innerHTML = '';
		
    // for each day render a div and a list containing the hours of availability
    for(let appt in apptTimes) {
		    
        var newDay = document.createElement('div'); newDay.id = appt; newDay.className = 'day';
	var dayDay = document.createElement('h2');
	dayDay.innerHTML = appt;
	newDay.appendChild(dayDay);

	var ul = document.createElement('ul'), hours = apptTimes[appt];

	//create li for each hour
	for(let hr = 0; hr < hours.length; hr++) {
	    if(hours[hr] == -1) continue;

	    let hrElem = document.createElement('li'), link = document.createElement('button');

	    link.value = "/appointment?business=" + business + "&hr=" + hours[hr] + "&date=" + appt;
	    link.innerHTML = hours[hr] + ":00";
	    link.onclick = function() { getForm(link.value); };
			
	    // append elems accordingly <ul><li><button>
	    hrElem.appendChild(link);
	    ul.appendChild(hrElem);
	}
		
	newDay.appendChild(ul);
	elem.appendChild(newDay);
    }

}
            	    



