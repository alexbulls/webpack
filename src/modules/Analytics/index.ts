import * as $ from 'jquery';

function createAnalytics() {
  let counter: number = 0;
  let isDestroyed: boolean = false;

  const listener = ():number => counter++;

  $(document).on('click', listener);

  return {
    destroy() {
      isDestroyed = true;
      $(document).off('click', listener);
    },
    getClicks() {
      return isDestroyed ? 'Analytics is destroyed' : counter;
    }
  }
}

window['analytics'] = createAnalytics();