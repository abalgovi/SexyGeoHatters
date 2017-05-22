var crypto = require('crypto');
var baby = require('babyparse');
var async = require('async');
var sendgridHelper = require('sendgrid').mail; 
var sendgrid = require('sendgrid')('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');
var ObjectId = require('mongodb').ObjectID;

 /**
 * Takes a req and res parameters and is inputted into function to get employee, notemployee, and business data.
 *
 * @param req and res The two parameters passed in to get the apprporiate employee,
 * @returns The appropriate data about the employee
 */
exports.get = function(req,res){
	
	var database =  req.db;
        var employeeDB = database.get('employees');
        var employee;
        var notemployee;
        var businessID = req.user[0].business.toString();

        async.parallel({
            employee: function(cb) {
                employeeDB.find({
                    registrationToken: {$exists: false}, 
                    business: ObjectId(businessID)
                }, function (err,results){
                        if( err ) { return next(err); }
                        if( !results ) { return next(new Error('Error finding employee')); }

                        employeee = results;
                        cb();
                });
            },
            nonemployee: function(cb) {
                employeeDB.find({
                    registrationToken: {$exists: true}, 
                    business: ObjectId(businessID)}, function (err,results){

                    if (err) {
                        console.log("Error finding nonemployees")
                        return next(err);
                    }
                    if(!results) {
                        return next(new Error('Error finding employee'));
                    }

                     notemployee = results;
                     cb();
                });
            }
        },

        function(err,results){

            if(err){
                throw err;
            }

            res.render('business/addemployees', {
                title: 'Express',
                notsigned: notemployee,
                signed: employeee,
                isOwner: req.user[0].admin,
                businessId: req.user[0].business,
                employees: "active"
            });

        });
}

/**
 * Takes a req and res parameters and is inputted into function to get employee, notemployee, and business data.
 *  Allows the User to input specified data and make changes
 * @param req and res The two parameters passed in to get the apprporiate employee,
 * @returns The appropriate data about the employee
 */
exports.post = function(req,res,next){

    var database =  req.db;
    var employeeDB = database.get('employees');
    var businessID = req.user[0].business;
    var name = req.body.inputName;
    var inputEmail = req.body.inputEmail;
    var inputPhone = req.body.inputPhone;

    var token = randomToken();

    var salt = crypto.randomBytes(128).toString('base64');
    var password;

    crypto.pbkdf2('password', salt, 10000, 512, function(err, dk) {
        password = dk;
        employeeDB.insert({
            business: businessID,
            fname: name,
            email: inputEmail,
            phone: inputPhone,
            registrationToken : token,
            admin: false,
            // password: password
            // need to create a randomly generated bCrypted Password
        });
        // can't use variables in an object's field. Instead, create the field outside, then put it as the text argument in sendgrid
       	
	var email = new sendgridHelper.Mail();
	email.setTemplateId('7d077a9a-8dd8-49fa-b7ba-aae35c72a323');
	email.setFrom(new sendgridHelper.Email('abalgovi@ucsd.edu'));
	
	// configure the email content
	personalization = new sendgridHelper.Personalization();
	personalization.addTo(new sendgridHelper.Email(inputEmail));
	personalization.setSubject('New Employee Signup');
	personalization.addHeader(new sendgridHelper.Header('X-Test','true'));
	personalization.addSubstitution(new sendgridHelper.Substitution('%name%',name));
	personalization.addSubstitution(new sendgridHelper.Substitution('%ownerOfOrganization%',req.user[0].fname + ' ' + req.user[0].lname));
	personalization.addSubstitution(new sendgridHelper.Substitution('%companyName%',ObjectId(businessID).toString()));
	personalization.addSubstitution(new sendgridHelper.Substitution('%token%',token));

	email.addPersonalization(personalization);
	var request = sendgrid.emptyRequest({
	
		method: 'POST',
		path: '/v3/mail/send',
		body: email.toJSON()

	});
	
	// send email
	sendgrid.API(request,function(error,response) {
		if(error) {
		  console.log(response.body);
		  return next(error);
		}
		console.log('sent email');
	});
 
        res.redirect('/addemployees');
    });
    
}


function randomToken() {
  return crypto.randomBytes(24).toString('hex');
}
