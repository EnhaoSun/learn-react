/*
 * Promisification 仅适用于调用一次回调的函数。进一步的调用将被忽略
 */

// 用法：
// loadScript('path/script.js', (err, script) => {...})
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

// promise化loadScript
/*
 * 新的函数是对原始的 loadScript 函数的包装。
 * 新函数调用它，并提供了自己的回调来将其转换成 promise resolve/reject
 */
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// promisify(f, true) 来获取结果数组
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        // 我们自定义的 f 的回调
        if (err) {
          reject(err);
        } else {
          // 如果 manyArgs 被指定，则使用所有回调的结果 resolve
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);
      f.call(this, ...args);
    });
  };
}

// 用法：
f = promisify(loadScript, true);
f("./demo.js").then(
  (results) => {
    results.forEach((res) => {
      alert(`File location: ${res.src}`);
    });
  },
  (err) => console.log(err)
);
