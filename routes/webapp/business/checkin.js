
exports.get = function (req, res) {

	var db = req.db;
	var aptcollect = db.get("appointments");
	aptcollect.find({email: req.email, company: req.company}).then((appt) => {

		if(!appt){
			res.render('business/checkin', {layout: false, title: "Check in fail", failCheckIn: true})
			return;
		}
    
    res.render('business/checkin', {layout: false, title: 'Register'});
	});



};
