var express = require('express')
	, router = express.Router()

var db = require('../db/db')
// var collection = db.get().collection('newsletter')

router.post('/newsletter', function(req, res) {
	db.newsletter.save({email: req.body.email, country: req.body.country, postal: req.body.postal, optIn: req.body.artistContact}, function(err, saved) {
		if( err || !saved ) {
			res.status(400).json({
		      error: {
		        message: 'There was an error while signing up for the newsletter.',
		      }
		    });
		}
		else {
		    res.status(200).json({
		      success: {
		        message: 'You have successfully signed up.'
		      }
		    });
		}
	    res.end();
	});
})


module.exports = router