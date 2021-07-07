'use strict';
//import express & create router
const express = require('express');
const router = express.Router();
const UserModel = require("../models/Users");
const LinkModel = require("../models/Links");

//route for home page and redirect
router.get('/:redirect?', async (req, res) => {
    //if there is a redirect
    if(!!req.params.redirect)
    {
        console.log(req.params.redirect);
        //get target URL
        const targetURL = await LinkModel.getTargetUrl(req.params.redirect);
        //Update click count for the uuid
        const response = await LinkModel.updateClicks(req.params.redirect);
        //Find the user associated with this uuid
        const thisUser = await LinkModel.findUser(req.params.redirect);
        //Increment the user's total clicks by one
        const addTotal = await UserModel.updateTotalClicks(thisUser);
        console.log(targetURL);
        res.redirect("http://" + targetURL.target_url);
        //res.redirect(targetURL.target_url);
    }
    else
    {
        console.log("no redirect");
        res.render('template', {
            locals: {
                title: 'Home Page',
                is_logged_in: req.session.is_logged_in,
                user_first_name: req.session.first_name
            },
            partials: {
                body: 'partials/home'
            }
        })
    }
})


//export the router for use in the app
module.exports = router
