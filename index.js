// import firebase from 'firebase';

// const config = {
//   databaseURL: "https://terra-lander.firebaseio.com",
// };
// firebase.initializeApp(config);


// window.onload = function () {

//   const dbRefObject = firebase.database().ref('scores').orderByChild('score').limitToLast(5);

//   dbRefObject.on('value', snap => {
//     tableReset();
//     highScores = scoreParser(snap.val());
//     tableSetup(highScores);
//   })
  
//   firstdraw();
// }