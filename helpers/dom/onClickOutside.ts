import { parentHasClass } from "./parentHasClass";

import type { RefObject, SyntheticEvent } from "react";
type OnClickOutsideOptions = {
  ref?: RefObject<any>;
  triggerOnRightClick?: boolean;
  excludedClasses?: string[];
  createExcludedClass?: boolean;
  excludedElements?: HTMLElement[];
};

let callbacks: Function[];

export const onClickOutside = (
  el: RefObject<HTMLElement>,
  cb: (e: MouseEvent | SyntheticEvent) => void,
  options: OnClickOutsideOptions = {}
) => {
  if (!callbacks) {
    callbacks = [];
    document.addEventListener("mousedown", (e) => {
      callbacks.forEach((cb) => cb(e));
    });
  }

  let excludedClass: string;
  const isExcluded = (target: HTMLElement) => {
    const excludedClasses = (options && options.excludedClasses) || [];
    if (
      options.excludedElements &&
      (options.excludedElements.includes(target) ||
        options.excludedElements.find((el) => el.contains(target)))
    )
      return true;
    if (excludedClass) excludedClasses.push(excludedClass);
    if (!excludedClasses.length) return false;
    return parentHasClass(target, ...excludedClasses);
  };

  const onClickOutside = (e: MouseEvent) => {
    // check if right click => do nothing
    if (e.button <= 1 || options.triggerOnRightClick) {
      if (!el.current || el.current.contains(e.target as HTMLElement)) return;
      if (!isExcluded(e.target as HTMLElement)) cb(e);
    }
  };

  callbacks.push(onClickOutside);
  return () => callbacks.splice(callbacks.indexOf(onClickOutside), 1);
};
