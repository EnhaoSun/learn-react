class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve); // function() { native code }
    // 1 秒后使用 this.num*2 进行 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

function runThenable() {
  new Promise((resolve) => resolve(1))
    .then((result) => {
      return new Thenable(result); // (*)
    })
    .then((res) => console.log(res)); // 1000ms 后显示 2
}

function fetchUrl() {
  let promise = fetch(
    "https://zh.javascript.info/article/promise-chaining/user.json"
  )
    /*
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    console.log(text); //{"name": "iliakan", "isAdmin": true}
  });
*/
    // 使用箭头函数
    .then((response) => response.json());

  promise.then((user) => console.log(user.name));
  promise
    .then((user) => fetch(`https://api.github.com/users/${user.name}`))
    .then((response) => response.json())
    .then((githubUser) => {
      console.log(githubUser);
    });
}

function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
