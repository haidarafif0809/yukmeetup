'use strict';
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let events = [];
    for (var i = 0; i < 10; i++) {
      let eventOrganizer = faker.name.findName();
      let eventTitle = `Event For Meetup ${faker.company.companyName()}`;
      let UserId = 1;
      let dueDate = faker.date.future();
      events.push({
        eventTitle: eventTitle,
        eventOrganizer: eventOrganizer,
        UserId: UserId,
        dueDate: dueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert('Events', events, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
