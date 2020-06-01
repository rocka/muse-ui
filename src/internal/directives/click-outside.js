const clickoutsideContext = '@@clickoutsideContext';

export default {
  name: 'click-outside',
  bind (el, binding) {
    const documentHandler = function (e) {
      if (el.contains(e.target)) return;
      el[clickoutsideContext].bindingFn(e);
    };
    el[clickoutsideContext] = {
      documentHandler,
      bindingFn: binding.value
    };
    setTimeout(() => {
      document.addEventListener('click', documentHandler);
    }, 0);
  },

  update (el, binding) {
    el[clickoutsideContext].bindingFn = binding.value;
  },

  unbind (el) {
    document.removeEventListener('click', el[clickoutsideContext].documentHandler);
    delete el[clickoutsideContext];
  }
};
