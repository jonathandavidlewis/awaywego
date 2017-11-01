const oid = require('mongoose').Types.ObjectId;
const debug = process.env.DEBUG || false;
const User = require('../../../db/models/user.js');
const Friend = require('../../../db/models/friend.js');

module.exports = function(accessToken, empty, tokens, profile, done) {
  const userEmail = profile.emails[0].value;
  const googleId = profile.id;
  const name = profile.displayName;
  const newUser = {
    name: name,
    email: userEmail,
    googleId: googleId,
    googleAccessToken: accessToken,
    new: true
  };
  let profilePic = null;
  if (profile.photos && profile.photos[0]) {
    profilePic = profile.photos[0].value;
    newUser.profilePic = profilePic;
  }
  User.findOne({ googleId: googleId }).then((user) => {
    if (user) {
      user.update({googleAccessToken: accessToken}).then((user) => done(null, profile));
    } else {
      User.findOne({ email: userEmail }).then((user) => {
        profile.new = true; //this is a newly associated Google user. This prop can be used on first login
        if (user) {
          var googleUser = {googleId: googleId, googleAccessToken: accessToken};
          if (!user.profilePic && profilePic) {
            googleUser.profilePic = profilePic;
          }
          user.update(googleUser).then((user) => done(null, profile));
        } else {
          User.create(newUser).then((user) => {

            // once signed up - see if anyone has invited this user
            Friend.update({toEmail: user.email}, {toEmail: '', to: oid(user._id)})
              .catch(err => console.log('Error updating invite-signup: ', err));

            done(null, profile);
          }).catch((error) => console.log('There was an error creating/updating Google user: ', error));
        }
      });
    }
  });
};