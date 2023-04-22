async function APIRequest(method, resource, body ) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, "https://mighty-badlands-72624.herokuapp.com/http://144.24.15.152:4000/api/" + resource, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error(xhr.statusText));
            //resolve(null);
          }
        }
      };
      xhr.onerror = function () {
        reject(new Error('Network error'));
      };
      xhr.send(JSON.stringify(body));
    });
    
}

export default APIRequest;