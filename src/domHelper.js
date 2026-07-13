export function makeElement(type, className, textContent) {
  const thing = document.createElement(type)
  thing.className = className
  thing.textContent = textContent
  return thing
};