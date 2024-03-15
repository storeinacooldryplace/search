let history;

function handleResponse(data) {
  let resultsDiv = document.getElementById("searchresults");
  console.log("handleResponse just received from fetch")
  console.log(data)

  let ul = document.createElement('ul');
  resultsDiv.appendChild(ul);

  for (let i = 0, ie = data.length; i < ie; ++i) {
    let a = document.createElement('a');
    a.href = data[i].url;
    a.textContent = data[i].title;
    a.addEventListener('click', onAnchorClick);

    let li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  }
}

console.log("public!")

function handleResponse(data) {
  let resultsDiv = document.getElementById("searchresults");
  console.log("inside handleResponse, data: ")
  console.log(data)

  let ul = document.createElement('ul');
  resultsDiv.appendChild(ul);

  for (let i = 0, ie = data.length; i < ie; ++i) {
    let a = document.createElement('a');
    a.href = data[i].url;
    a.textContent = data[i].title;
    a.addEventListener('click', onAnchorClick);

    let li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  }
}

function onAnchorClick(event) {
  chrome.tabs.create({
    selected: true,
    url: event.srcElement.href
  });
  return false;
}

fetch('/api')
  .then(response => {
    if (!response.ok) {
      throw new Error('couldnt get from server');
    }
    return response.json(); // Parse the JSON response
  })
  .then(data => {
    history = data;

 handleResponse(history);
    console.log("fetch jsut sent to handleResponse")
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
