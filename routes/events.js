const express = require('express');
const router = express.Router();
const models = require('../models');
const sequelize = require('sequelize');
const app = express();
const auth = require('../helpers/auth');


router.get('/',auth.isLogin,function(req,res){
  models.Event.findAll({
    where: {
      UserId: req.session.user.id
    }
  })
    .then((dataEvent) =>{
      let obj = {
        dataEvent: dataEvent
      }
      res.render('events/listEvents.ejs',obj)
    })
})

router.get('/add',auth.isLogin,function(req,res){
  let errorMessage;
  if(req.query===null){
    errorMessage = null
  } else {
    errorMessage = req.query.err
  }
  res.render('events/addEvent.ejs',{err:errorMessage})
})

router.post('/add',auth.isLogin,function(req,res){
  models.Event.create({
    eventTitle: req.body.newEventTitle,
    eventOrganizer: req.body.newEventOrganizer,
    dueDate: req.body.newDueDate,
    UserId: req.session.user.id,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(() =>{
    res.redirect('/events')
  }).catch((err) =>{
    res.redirect(`/events/add?err=${err.message}`)
  })
})

router.get('/edit/:id',auth.isLogin,function(req,res){
  models.Event.findById(req.params.id).then(dataEvent =>{
    let errorMessage;
    if(req.query===null){
      errorMessage = null
    } else {
      errorMessage = req.query.err
    }
    let obj = {
      id: dataEvent.id,
      eventTitle: dataEvent.eventTitle,
      eventOrganizer: dataEvent.eventOrganizer,
      dueDate: dataEvent.dueDate,
      userId: dataEvent.UserId
    }
    res.render('events/editEvent.ejs',{obj:obj,err:errorMessage})
  })
})

router.post('/edit/:id',auth.isLogin,function(req,res){
  models.Event.update({
    eventTitle: req.body.newEventTitle,
    eventOrganizer: req.body.newEventOrganizer,
    dueDate: req.body.newDueDate,
    UserId: req.body.newUserId
  },{where:{id:req.body.id}})
   .then(() =>{
     res.redirect('/events')
   }).catch((err) =>{
     res.redirect(`/events/edit/${req.params.id}?err=${err.message}`)
   })
})

router.get('/delete/:id',auth.isLogin,function(req,res){
  models.Event.destroy({
    where:{id:req.params.id}
  }).then(() =>{
    res.redirect('/events')
  })
})

router.get('/listAttendance/:id',auth.isLogin,function(req,res){
  models.Attendee.findOne({
    include:[{model:models.User}],
    where:{EventId:req.params.id}
  }).then((dataUser) =>{
    let obj = {
      data: dataUser
    }
    res.render('events/listAttendance.ejs',obj)
    // res.send(dataUser);
  })
})

module.exports = router;
