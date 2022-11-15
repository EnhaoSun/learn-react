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
