export default (
  element: HTMLElement,
  offset = 0,
  behavior: ScrollBehavior = 'smooth'
) => {
  if (!element) {
    return;
  }
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior,
  });
};
