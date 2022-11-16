function promiseAll() {
  Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
  ]).then(alert); // 1,2,3 当上面这些 promise 准备好时：每个 promise 都贡献了数组中的一个元素
}

/*
通过 GitHub 用户名来获取一个 GitHub 用户数组中用户的信息
*/

function showGithubUsersInfo() {
  let names = ["iliakan", "remy", "jeresig"];

  let requests = names.map((name) =>
    fetch(`https://api.github.com/users/${name}`)
  );

  Promise.all(requests)
    .then((responses) => {
      // 所有响应都被成功 resolved
      for (let response of responses) {
        alert(`${response.url}: ${response.status}`); // 对应每个 url 都显示 200
      }

      return responses;
    })
    // 将响应数组映射（map）到 response.json() 数组中以读取它们的内容
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    // 所有 JSON 结果都被解析："users" 是它们的数组
    .then((users) => users.forEach((user) => alert(user.name)));
}

/*
 * Promise.allSettled 等待所有的 promise 都被 settle，无论结果如何
 * 例如，我们想要获取（fetch）多个用户的信息。即使其中一个请求失败，我们仍然对其他的感兴趣
 */
function promiseAllSettled() {
  let urls = [
    "https://api.github.com/users/iliakan",
    "https://api.github.com/users/remy",
    "https://no-such-url",
  ];

  Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
    console.log(results);
    results.forEach((result, index) => {
      if (result.status == "fulfilled") {
        alert(`${urls[index]}: ${result.value.status}`);
      }

      if (result.status == "rejected") {
        alert(`${urls[index]}: ${result.reason}`);
      }
    });
  });
}

/*
 * 与 Promise.all 类似，但只等待第一个 settled 的 promise 并获取其结果（或 error）。
 */
function promiseRace() {
  // 这里第一个 promise 最快，所以它变成了结果。
  // 第一个 settled 的 promise “赢得了比赛”之后，所有进一步的 result/error 都会被忽略。
  Promise.race([
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Whoops!")), 2000)
    ),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
  ]).then(alert); // 1
}

/*
 * Promise.any 只等待第一个 fulfilled 的 promise，并将这个 fulfilled 的 promise 返回。
 * 如果给出的 promise 都 rejected，那么返回的 promise 会带有 AggregateError
 * —— 一个特殊的 error 对象，在其 errors 属性中存储着所有 promise error
 */
function promiseAny() {
  // 这里的第一个 promise 是最快的，但 rejected 了，所以第二个 promise 则成为了结果。
  // 在第一个(第二个promise) fulfilled 的 promise “赢得比赛”后，所有进一步的结果都将被忽略
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Whoops!")), 1000)
    ),
    new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
    new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
  ]).then(alert); // 1

  // 所有 promise 都失败的例子
  // 在 AggregateError 错误类型的 error 实例的 errors 属性中可以访问到失败的 promise 的 error 对象
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Ouch!")), 1000)
    ),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Error!")), 2000)
    ),
  ]).catch((error) => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ouch!
    console.log(error.errors[1]); // Error: Error!
  });
}
