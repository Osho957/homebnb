// el-transition@0.0.7 downloaded from https://ga.jspm.io/npm:el-transition@0.0.7/index.js

async function enter(t, e = null) {
  t.classList.remove("hidden");
  await transition("enter", t, e);
}
async function leave(t, e = null) {
  await transition("leave", t, e);
  t.classList.add("hidden");
}
async function toggle(t, e = null) {
  t.classList.contains("hidden") ? await enter(t, e) : await leave(t, e);
}
async function transition(t, e, s) {
  const n = e.dataset;
  const a = s ? `${s}-${t}` : t;
  let i = `transition${t.charAt(0).toUpperCase() + t.slice(1)}`;
  const o = n[i] ? n[i].split(" ") : [a];
  const r = n[`${i}Start`] ? n[`${i}Start`].split(" ") : [`${a}-start`];
  const l = n[`${i}End`] ? n[`${i}End`].split(" ") : [`${a}-end`];
  addClasses(e, o);
  addClasses(e, r);
  await nextFrame();
  removeClasses(e, r);
  addClasses(e, l);
  await afterTransition(e);
  removeClasses(e, l);
  removeClasses(e, o);
}
function addClasses(t, e) {
  t.classList.add(...e);
}
function removeClasses(t, e) {
  t.classList.remove(...e);
}
function nextFrame() {
  return new Promise((t) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(t);
    });
  });
}
function afterTransition(t) {
  return new Promise((e) => {
    const s = getComputedStyle(t).transitionDuration.split(",")[0];
    const n = 1e3 * Number(s.replace("s", ""));
    setTimeout(() => {
      e();
    }, n);
  });
}
export { enter, leave, toggle };
