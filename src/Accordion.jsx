import { useState } from "react";

/* eslint-disable react/prop-types */
function Accordion({ title, children, isOpenDefault }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div
        className="accordion-header"
        onClick={toggleAccordion}
        style={{ cursor: "pointer" }}
      >
        <h4 className="accordion-title">
          {title} <span>{isOpen ? "-" : "+"}</span>
        </h4>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default Accordion;
