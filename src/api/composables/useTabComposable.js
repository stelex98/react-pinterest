// WTF?? Why can not use be used as part of composable name here?
function tabComposable() {
  let focusableElements = [];
  let firstFocusableEl = null;
  let lastFocusableEl = null;

  const TAB_KEYCODE = 9;
  const KEY_NAME = "Tab";

  const handleKeydownEvent = (event) => {
    const isTabPressed =
      event.key === KEY_NAME || event.keyCode === TAB_KEYCODE;

    if (!isTabPressed) {
      return;
    }

    if (event.shiftKey) {
      /* shift + tab */
      handleShiftKey(event);
    } else {
      /* tab */
      handleTabKey(event);
    }
  };

  const handleShiftKey = (event) => {
    if (document.activeElement === firstFocusableEl) {
      lastFocusableEl.focus();
      event.preventDefault();
    }
  };

  const handleTabKey = (event) => {
    if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      event.preventDefault();
    }
  };

  const addTabIndexToEachElement = (elements = []) => {
    if (!elements.length) return;

    for (let el of elements) {
      el.setAttribute("tabindex", "0");
    }
  };

  const getExtremeElements = () => {
    return {
      firstFocusableEl: focusableElements[0],
      lastFocusableEl: focusableElements[focusableElements.length - 1],
    };
  };

  return {
    initTabHandle: (element = null) => {
      if (!!element) {
        focusableElements = element.querySelectorAll(".tab-element");
      }

      if (!focusableElements.length) {
        console.warn(
          "No one element has been found. Pls, check, if the class 'tab-element' has been added."
        );

        return;
      }

      // Set up default behaviour for using .focus() method from js
      addTabIndexToEachElement(focusableElements);

      firstFocusableEl = getExtremeElements().firstFocusableEl;
      lastFocusableEl = getExtremeElements().lastFocusableEl;

      console.log("All focusable elements: ", focusableElements);

      element.addEventListener("keydown", handleKeydownEvent);
    },
    destroyTabHandle: (element = null) => {
      if (!element) return;

      element.removeEventListener("keydown", handleKeydownEvent);
    },
  };
}

export default tabComposable;
