
/*
* ensure don't work in ensure without `chunkName`,
* but it is works in webpack1
* */

module.exports = {
  path: 'course/:courseId',

  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [

        {
          path: 'announcements',
          getChildRoutes(partialNextState, cb) {
            require.ensure([], (require) => {
              cb(null, [
                require('./routes/Announcements/routes/Announcement/')
              ])
            });
          },
          getComponents(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, {
                sidebar: require('./routes/Announcements/components/Sidebar'),
                main: require('./routes/Announcements/components/Announcements')
              })
            })
          }
        },

        // require('./routes/Announcements'),
        // require('./routes/Assignments'),
        // require('./routes/Grades'),

      ])
    })
  },

  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Course'))
    })
  }
}
