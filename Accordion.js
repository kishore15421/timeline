/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Accordion = ({ label, accordionIcon, close, children }) => {
  const [isOpen, setIsOpen] = useState(true),
    ref = useRef();

  useEffect(() => {
    if (close) {
      toggleAccordion();
    }
  }, [close]);

  const openAccordion = () => {
    const element = ref.current,
      // get the height of the element's inner content, regardless of its actual size
      sectionHeight = element.scrollHeight;

    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + "px";

    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener("transitionend", function transitionFunc(e) {
      // remove this event listener so it only gets triggered once
      element.removeEventListener("transitionend", transitionFunc);

      // remove "height" from the element's inline styles, so it can return to its initial value
      element.style.height = null;
    });
  };

  const closeAccordion = () => {
    const element = ref.current,
      // get the height of the element's inner content, regardless of its actual size
      sectionHeight = element.scrollHeight,
      // temporarily disable all css transitions
      elementTransition = element.style.transition;
    element.style.transition = "";

    /* on the next frame (as soon as the previous style change has taken effect),
           explicitly set the element's height to its current pixel height, so we
           aren't transitioning out of 'auto'*/
    requestAnimationFrame(function () {
      element.style.height = sectionHeight + "px";
      element.style.transition = elementTransition;

      /*on the next frame (as soon as the previous style change has taken effect),
               have the element transition to height: 0*/
      requestAnimationFrame(function () {
        element.style.height = 0 + "px";
      });
    });
  };

  const toggleAccordion = () => {
    const open = !isOpen;

    if (open) {
      openAccordion();
    } else {
      closeAccordion();
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`accordion-wrapper ${
        isOpen ? "accordion-expanded" : "accordion-collapsed"
      }`}
    >
      <div className="accordion">
        <div className="accordion-header" onClick={toggleAccordion}>
          <div className="accordion-header-title">{label}</div>
          <span className="accordion-header-icon">
            {accordionIcon ? (
              accordionIcon
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 512"
              >
                <path d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z" />
              </svg>
            )}
          </span>
        </div>
        <div className="accordion-content" ref={ref}>
          <div className="accordion-inner-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

Accordion.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  accordionIcon: PropTypes.node,
  close: PropTypes.bool,
};
