import keycode from 'keycode';
let tabPressed = false;
let listening = false;

function listenForTabPresses () {
  if (!listening) {
    typeof window !== 'undefined' && window.addEventListener('keydown', (event) => {
      tabPressed = keycode(event) === 'tab';
    });
    listening = true;
  }
}

const keyboardcontext = '@@keyboardcontext';
export default {
  name: 'keyboard-focus',
  bind (el, binding) {
    listenForTabPresses();
    let timer;
    const handleFocus = (e) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        if (tabPressed) {
          el[keyboardcontext].bindingFn(e);
          tabPressed = false;
        }
      }, 150);
    };

    el[keyboardcontext] = {
      handleFocus,
      bindingFn: binding.value
    };
    el.addEventListener('focus', handleFocus);
    el.addEventListener('blur', () => {
      if (timer) clearTimeout(timer);
    });
  },
  update (el, binding) {
    el[keyboardcontext].methodName = binding.expression;
    el[keyboardcontext].bindingFn = binding.value;
  },
  unbind (el) {
    el.removeEventListener('focus', el[keyboardcontext].handleFocus);
    delete el[keyboardcontext];
  }
};
