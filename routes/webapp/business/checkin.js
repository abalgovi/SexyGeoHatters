
exports.get = function (req, res) {
	var email = req.query.email, comp = req.query.company;
	console.log(email);
	console.log(comp);
	if (!email && !comp){
		console.log("First time");
    	res.render('business/checkin', {layout: false, title: 'Check In'});
    	return;
	}

	var db = req.db;
	var aptcollect = db.get("appointments");
	aptcollect.find({email: email, company: comp}).then((appt) => {
        console.log(appt);
        console.log(appt.length);
		if(appt.length == 0){
			res.render('business/checkin', {layout: false, title: 'Check In', message: "Appointment not found", failCheckIn: true});
			console.log("sdfdsff");
			return;
		}
		res.render('business/checkin_successful', {layout: false, title: 'Check In Successful'});

	});



};
