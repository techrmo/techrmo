type AllowedElements = {
  INPUT: HTMLInputElement,
  TEXTAREA: HTMLTextAreaElement,
};
type AllowedKeys = keyof AllowedElements;

const isAllowedElement = <T extends AllowedKeys>
  (element: Element | null, type: T): element is AllowedElements[T] => element?.tagName === type;

export const getAllowedElement = <T extends AllowedKeys>(element: Element | null, type: T) => {
  if (isAllowedElement(element, type)) {
    return element;
  }

  return null;
};
