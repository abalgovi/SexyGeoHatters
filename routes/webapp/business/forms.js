var crypto = require('crypto');
var baby = require('babyparse');
var async = require('async');
var sendgrid = require('sendgrid')('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');
var ObjectId = require('mongodb').ObjectID;

 /**
 * Takes a req and res parameters and is inputted into function to get employee, notemployee, and business data.
 *
 * @param req and res The two parameters passed in to get the apprporiate employee,
 * @returns The appropriate data about the employee
 */

/**
 * Takes a req and res parameters and is inputted into function to get employee, notemployee, and business data.
 *  Allows the User to input specified data and make changes
 * @param req and res The two parameters passed in to get the apprporiate employee,
 * @returns The appropriate data about the employee
 */
exports.get = function(req,res,next){

    var database =  req.db;
    var employeeDB = database.get('employees');
    var businessID = req.user[0].business;
    var name = req.body.inputName;
    var inputEmail = req.body.inputEmail;
    var inputPhone = req.body.inputPhone;
    
    // construct response parameters for forms.handlebars to use
    var responseParams =  {
        title: 'Form Editor',
        isOwner: req.user[0].admin,
        businessId: req.user[0].business,
	formData: '',
        forms: "active"
    }

    // url parameters exist after the user submited a new form to store
    var formEdit = req.query.formEdit;
    if(formEdit) {
    	if(formEdit == 'success') responseParams.success = true;
    	else if(formEdit == 'error') responseParams.error = true;
	else responseParams.empty = true;
    }
    
    var formsCollection = req.db.get('forms');
    var businessID = req.user[0].business;

    // grab customized form from db if any
    formsCollection.findOne({businessId: businessID}).then((doc) => {
	if(doc != null && doc.businessId != null) responseParams.formData = doc.formParams;
    }).then(() => {
	
	var operationCollection = req.db.get('operationInfo');
	operationCollection.findOne({businessId: businessID},['-_id','-businessId']).then((doc) => {
	  if(doc) {
	      for(let key in doc) {
	          if(key == 'businessHours') {
		      for(let k in doc[key]) doc[key][k] = JSON.stringify(doc[key][k])
		      responseParams[key] = doc[key].toString();
		  }
		  else if(key == 'appointments') responseParams[key] = JSON.stringify(doc[key]);
		  else responseParams[key] = doc[key];
	      }
	  }
          res.render('business/forms', responseParams);
	});

    });

}

exports.post = function(req,res,next) {


    var businessID = req.user[0].business;
    var formJson = req.body.formData;

    // business Info
    if(!formJson) {
        var operationCollection = req.db.get('operationInfo');
	var operInfo = {
                         businessHours: [{dow: JSON.stringify(req.body.businessDays)}],
			 minTime: req.body.startTime,
			 maxTime: req.body.endTime,
		         businessId: businessID,
			 appointments: {}
	               };
	
	console.log(req.body);

	// for each appointment type save it and its duration
	for(let appts in req.body) {
	    if(appts.includes('appt') && !appts.includes('Dur')) {
	       var dur = 'appt' + appts.substring(4,appts.length - 4) + 'Dur';
	       if(appts.includes('Name')) operInfo.appointments[req.body[appts]] = req.body[dur];
	    }
	}
  
        // if info already exists update otherwise insert it	
	operationCollection.findOneAndUpdate({businessId: operInfo.businessId},operInfo).then((doc) => {
	    if(!doc.value && doc.lastErrorObject) operationCollection.insert(operInfo).then((doc) => {});
	});

	res.redirect('/forms');
	return;
    }
    
    
    // handle newly customized form
    var formsCollection = req.db.get('forms');
    if(!formJson || formJson.length <= 2) {
        res.redirect('/forms?formEdit=empty');
	return;
    }

    formsCollection.findOneAndUpdate({businessId: businessID},
		    {businessId: businessID, formParams: formJson}).then((doc) => {
	
	// if document is not in collection insert a new one
	if(!doc.value && doc.lastErrorObject)
	    formsCollection.insert({businessId: businessID, formParams: formJson}).then((newDoc) => {});
	return res.redirect('/forms?formEdit=success');

    }).catch((err) => {
	console.log('Error when updating form structure ' + err);
	res.redirect('/forms?formEdit=error');
    });

}
