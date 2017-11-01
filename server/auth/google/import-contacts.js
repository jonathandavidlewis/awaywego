


console.log("ACCESS:", accessToken);
console.log("REFRESH:", refreshToken);
console.log("PROFILE:___:", profile);
//add userAccessTokenToUser
// googleAccessToken
request.get({
  url: 'https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&pageSize=2000',
  headers: {
    'Authorization': 'Bearer ' + refreshToken.access_token,
    'Content-Type': 'application/json'
  },
  //qs: qs,//Optional to get limit, max results etc
  method: 'GET'
}, function (err, response, body) {
  if (err) {
    console.log(err);
  }
  console.log('RESPONSE:____');
  console.log('BODY:____');
  console.log(typeof body);
  console.log(Array.isArray(JSON.parse(body).connections));
  const contactList = [];

  const loadContacts = function (contacts) {
    contacts.forEach((connection) => {
      if (connection.emailAddresses) {
        contactList.push(connection.emailAddresses[0].value);
      }
    });
  };

  let responseBody = body;

  loadContacts(JSON.parse(body).connections);

  //while (responseBody.nextPageToken) {   }
  console.log(contactList);
  console.log(req);

});