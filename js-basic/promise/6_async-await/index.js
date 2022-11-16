/*
 * 在函数前面的 “async” 这个单词表达了一个简单的事情：
 * 即这个函数总是返回一个 promise。
 * 其他值将自动被包装在一个 resolved 的 promise 中。
 */

async function f1() {
  return 1;
}

f1().then(alert);

/*
 * await只在async函数内工作
 */

async function f2() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done!");
    }, 2000);
  });

  let result = await promise; // 等待，直到 promise resolve (*)
  alert(result);
  /*
   * 在 promise settle 时，拿到 result 作为结果继续往下执行。
   * 所以上面这段代码在两秒后显示 “done!”。
   */
  /*
   * await 实际上会暂停函数的执行，直到 promise 状态变为 settled，
   * 然后以 promise 的结果继续执行。
   * 这个行为不会耗费任何 CPU 资源，因为 JavaScript 引擎可以同时处理其他任务：
   * 执行其他脚本，处理事件等。
   */
}

f2();

async function showAvatar() {
  // 读取我们的 JSON
  let response = await fetch(
    "https://zh.javascript.info/article/promise-chaining/user.json"
  );
  let user = await response.json();

  // 读取github用户信息
  let githubReponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubReponse.json();

  // 显示头像
  let img = document.createElement("img");
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 等待3秒
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();
  return githubUser;
}

showAvatar();
