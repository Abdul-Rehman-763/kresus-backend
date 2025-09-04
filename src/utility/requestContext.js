// requestContext.js
const { AsyncLocalStorage } = require("async_hooks");
const storage = new AsyncLocalStorage();

module.exports = {
  middleware: (req, res, next) => {
    storage.run(new Map(), () => {
      storage.getStore().set("req", req);
      next();
    });
  },
  getRequest: () => {
    const store = storage.getStore();
    return store ? store.get("req") : null;
  }
};
