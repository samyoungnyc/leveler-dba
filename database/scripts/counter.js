let lastGroupCountRef = firebase.database().ref('lastGroup');
let maxGroupCountRef = firebase.database().ref('maxGroup');
lastGroupCountRef.on('child_changed', function(data) {
  window.lastCount = data.val();
});

async function getValues() {
  
  window.lastCount = await lastGroupCountRef.once('value', function(snapshot) {
    return snapshot;
  })
    .then(function(snapshot) {
      return window.lastCount = snapshot.val().count;
    });
		
  window.maxCount = await maxGroupCountRef.once('value', function(snapshot) {
    return snapshot;
  })
    .then(function(snapshot) {
      return window.maxCount = snapshot.val().count;
    });
}

function setGroupCount() {
  if (window.lastCount === window.maxCount) {
    window.nextGroup = 1;
  } else {
    window.nextGroup = window.lastCount + 1;
  }
    alert(`The group that you should donate to is ${window.nextGroup}`);
  updateLastCountDb();
}

function updateLastCountDb() {
  lastGroupCountRef.update({count: window.nextGroup});
}

async function testIt() {
  await setGroupCount();
  updateLastCountDb();
}
