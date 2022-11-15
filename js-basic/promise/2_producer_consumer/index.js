function promiseDemo() {
  let promise = new Promise(function (resolve, reject) {
    // 当 promise 被构造完成时，自动执行此函数

    // 1 秒后发出工作已经被完成的信号，并带有结果 "done"
    setTimeout(() => resolve("done"), 1000);
  });

  promise.then((res) => {
    console.log("promise1 result is: ", res);
  });

  let promise2 = new Promise(function (resolve, reject) {
    resolve("done");
    // reject(new Error("Whoops!"));
  });

  promise2.then(
    (result) => console.log("promise2 result: ", result),
    (error) => console.log("promise2 error: ", error)
  );

  promise2.then(null, () => console.log("Catched error: promise2")); //等价于catch
  // promise2.catch(() => console.log("Catched error: promise2"));

  let promise3 = new Promise(function (resolve, reject) {
    reject(new Error("promise3 Whoops!"));
  })
    .finally(() => console.log("promise3 ready!"))
    .catch((err) => console.log("promise3 error: ", err));
}
// promiseDemo()

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.append(script);
  });
}
