const _parentHasClass = (element: HTMLElement, classname: string) => {
  if (
    element.className &&
    element.className.split &&
    element.className.split(" ").indexOf(classname) >= 0
  )
    return true;
  return (
    element.parentNode &&
    parentHasClass(element.parentNode as HTMLElement, classname)
  );
};

export const parentHasClass = (
  element: HTMLElement,
  ...classNames: string[]
) => {
  for (let i = 0, iLength = classNames.length; i < iLength; i++) {
    if (_parentHasClass(element, classNames[i])) return true;
  }
  return false;
};
