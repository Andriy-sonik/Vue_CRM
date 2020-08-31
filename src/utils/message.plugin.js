import localizeFilter from "../filters/localize.filter";
export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    Vue.prototype.$message = function(text) {
      // eslint-disable-next-line no-undef
      M.toast({ html: text, classes: "massage_green" });
    };

    Vue.prototype.$error = function(html) {
      // eslint-disable-next-line no-undef
      M.toast({ html: `[${localizeFilter('error')}]: ${html}`,classes: "message_error" });
    };
  }
};
