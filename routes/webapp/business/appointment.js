
exports.get = function(req,res) {

	var companyName = req.query.business, preferedDate = req.query.preferedDate;
	var businessCollection = req.db.get('businesses');
	var options = {};

	if(companyName) {

	    var appointmentCollection = req.db.get('appointments'), formsCollection = req.db.get('forms');

	    if(!req.query.date) {
                getAvailableDates(req.db,preferedDate,companyName).then((hours) => {
		   console.log(hours);
	           res.writeHead(200,{'Content-Type': 'application/json'});
	           res.end(JSON.stringify({hrs: hours, business: companyName}));
	        });
	    } else {
              
	      // fetch the form to display
	      businessCollection.findOne({'companyName': companyName}, {'_id': 1}).then((company) => {
		  formsCollection.findOne({'businessId': company['_id']}).then((form) => {
		      res.writeHead(200,{'Content-Type': 'application/json'});
	              res.end(JSON.stringify({ formContent: form['formParams'],
					       business: companyName,
					       date: req.query.date }));
		  });
	      });

	   }
	    
	} else {
	    
	    var formsCollection = req.db.get('forms'), companyNames = [];
	    formsCollection.find({}, ['businessId','formParams']).then((forms) => {
	    
	        if(!forms) return;
	        options = {title: 'Select a business', layout: false};
	    
	        let businessIds = {};
	        for(let form in forms) businessIds[forms[form].businessId] = forms[form].formParams;
	        var selectedBusiness = null;

	        // for each business determine whether there is a corresponding form
	        businessCollection.find({},['_id','companyName']).then((businesses) => {
	        
	            if(!businesses) return;
		
		    // save businesses that have a form
		    for(let business in businesses) {
		       business = businesses[business]
	               if(businessIds[business['_id']]) companyNames.push(business.companyName);
		    }
		
		    options.companies = companyNames;
		    res.render('business/appointment',options);

	        });

            });

	}

		
}



function getAvailableDates(db,preferedDate,companyName,res) {

    var businessCollection = db.get('businesses'), id = '';
    return businessCollection.findOne({companyName: companyName}, '_id').then((docs) => {
        id = docs['_id'];
    }).then(() => {
        
	var operationCollection = db.get('operationInfo');
        return operationCollection.findOne({businessId: id},'-_id').then((operInfo) => {
	    
	    var appointmentCollection = db.get('appointments');
	    var searchParams = {company: companyName, startTime: {'$gt': new Date(preferedDate)}};
	    var sortBy = { "sort" : {'startTime': 1},"fields" : {'startTime': 1, 'endTime':
	    1,'duration': 1}};
            
	    return appointmentCollection.find(searchParams,sortBy).then((docs) => {
               
	       // for each hour within the selected week, return every hour that is not taken
	       var currDate = new Date(preferedDate), weekLater = new Date(preferedDate),
	       availableHrs = {},ttlHours = [];
	       weekLater.setDate(weekLater.getDate() + 7);

	       var endHr = operInfo.maxTime.split(':'), srtHr = operInfo.minTime.split(':');
	       srtHr[0] = parseInt(srtHr[0]); endHr[0] = parseInt(endHr[0]);

	       // generate all possible business hours
               for(;srtHr[0] < endHr[0]; srtHr[0] += 1) {  ttlHours.push(srtHr[0]); }

	       // for each day within the week, find open hours
	       for(;currDate.getDate() < weekLater.getDate(); currDate.setDate(currDate.getDate() + 1)) {

	       	  // if you're not working on this day go to next day
		  if(operInfo.businessHours[0].dow.indexOf(currDate.getDay()) == -1) continue;
		  var index = currDate.toString().substring(0,15);
	          availableHrs[index] = Array.from(ttlHours);
	          
		  // for each appointment
		  for(let i = 0; i < docs.length; i++) {
		      
		      // if the current date != appt date, then all hours are available
		      if(currDate.getDate() != docs[i].startTime.getDate()) continue;

		      var stDate = docs[i].startTime.getDate();
		      var indexOf = ttlHours.indexOf(docs[i].startTime.getUTCHours());
		      
		      // remove hours depending on the duration of appointment
		      for(let hr = 0; hr < docs[i].duration; hr++) {
			  availableHrs[index][indexOf++] = -1;
		      }
	          }

		  var apptDur = parseInt(operInfo['appointments'].selectedAppt) - 1,
		  currDay = Array.from(availableHrs[index]), checkSlots = true;

		  // use sliding window to eliminate times that don't work for appointment's duration
		  /*for(let i = 0; i < currDay.length - apptDur;) {
	              
		      if(!checkSlots) {
		          if(currDay[i+apptDur] != -1) i++;
			  else {
			      checkSlots = true;
			      for(let y = i; i < apptDur + i; y++) currDay[y] = -1;
			      i += apptDur;
			  }	  
			  continue;
		      }

		      checkSlots = false;
		      for(let j = i; j < apptDur + i; j++) {
		          if(currDay[j] == -1) {
			      i = j + 1;
			      currDay[i] = -1;
		              checkSlots = true;
			      break;
			  }
		      }

		      if(!checkSlots) i++;
	          }*/

	       }
               
	       return availableHrs;

            });
	});
    });


}


exports.post = function(req,res) {
	
	// grab required fields and store the rest as an array in the database
	var formContents = req.body;
	var apptInfo = {};
        
	console.log(req.body);
	// store all form values
	for(let key in formContents) apptInfo[key] = formContents[key];
	
	apptInfo['startTime'] = new Date();
	apptInfo['endTime'] = new Date();
	apptInfo['endTime'].setHours( parseInt(apptInfo['startTime'].getHours()) + 
		               	      parseInt(apptInfo['duration']));
        
	var appointments = req.db.get('appointments');
	appointments.insert(apptInfo).then((docs) => {	
		res.redirect('appointmentConfirmation',{time: dateTime});
	}).catch((err) => {
	    console.log(err);
	    res.redirect('/');
	});

}

