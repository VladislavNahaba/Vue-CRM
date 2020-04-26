export default {
  bind(el, {value, arg}) {
    const positions = ['top', 'right', 'bottom', 'left'];
    window.M.Tooltip.init(el, {
      html: value,
      position: positions.includes(arg) ? arg : 'bottom'
    });
  },
  unbind(el) {
    const instance = window.M.Tooltip.getInstance(el);
    if (instance && instance.destroy) {
      instance.destroy();
    }
  }
}
