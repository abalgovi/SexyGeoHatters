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

    var responseParams =  {
        title: 'Form Editor',
        isOwner: req.user[0].admin,
        businessId: req.user[0].business,
        employees: "active" 
    }

    var formEdit = req.query.formEdit;
    if(formEdit) {
    	if(formEdit == 'success') responseParams.success = true;
    	else if(formEdit == 'error') responseParams.error = true;
	else responseParams.empty = true;
    }

    res.render('business/forms', responseParams);
}

exports.post = function(req,res,next) {

    var formsCollection = req.db.get('forms');
    var businessID = req.user[0].business;
    var formJson = req.body.formData;

    if(formJson == null || formJson.length <= 2) {
        res.redirect('/forms?formEdit=empty');
	return;
    }

    formsCollection.findOneAndUpdate({businessId: businessID},
		    {businessId: businessID, formFields: formJson}).then((doc) => {
	
	// if document is not in collection insert a new one
	if(!doc.value && doc.lastErrorObject)
	    formsCollection.insert({businessId: businessID, formParams: formJson}).then((newDoc) => {});
	return res.redirect('/forms?formEdit=success');

    }).catch((err) => {
	console.log('Error when updating form structure ' + err);
	res.redirect('/forms?formEdit=error');
    });
    

}
