import { browser } from '$app/environment';

export function highScore() {
  let saved = browser ? localStorage.getItem("highscore") : null;
  let data = $state(saved ? Number(saved) : 0);

  $effect(() => {
    if (browser) {
      localStorage.setItem("highscore", data);
    }
  });

  return {
    get value() { return data; },
    set value(v) { data = v; }
  };
}