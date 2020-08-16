function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  localStorage.setItem("user", profile.getName());
  localStorage.setItem("photo", profile.getImageUrl());
  
  window.location = "index.html";
}



function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    location.href ="login.html"
  });
}

function onLoad() {
  gapi.load('auth2', function() {
    gapi.auth2.init();
  });
}

  
  
  



  

