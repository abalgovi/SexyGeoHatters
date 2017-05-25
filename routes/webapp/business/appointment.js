
exports.get = function(req,res) {

	var companyName = req.query.business;
	var businessCollection = req.db.get('businesses');
	var companies = [];
	
	// find all businesses and return their names
	businessCollection.find({},{fields: {companyName: 1, _id: 1}}).each((company,{close,pause,resume}) => {
		companies[company['_id']] = company.companyName;
	}).then(() => {
	        
		// fetch the form associated with the selected company
		var formsCollection = req.db.get('forms'), formData = '', companyNames = [];
	        formsCollection.find({}).then((form) => {
		    
		    if(!form) return;

		    // select companies that have a form
		    for(let i = 0; i < form.length; i++) {
		       if(companies[form[i].businessId]) {
		           companyNames.push(companies[form[i].businessId]);
			   if(companies[form[i].businessId] == companyName) formData = form[i].formParams;
		       }
		    }

                }).then(() => {

		    // if a business has been selected then reveal its associated form, otherwise show dropdown
		    if(!companyName) {
	                res.render('business/appointment', { title: 'Select a business',
				                             layout: false,
							     companies: companyNames });
	    	        return;
		    }
	            console.log(formData); 
		    res.render('business/appointment',{ title: 'Make an Appointment',
				                        layout: false,
						        companies: companyNames,
						        formData: formData });
	       });

       });
}

exports.post = function(req,res) {
}

