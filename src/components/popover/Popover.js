import React, { cloneElement, useState, useRef } from "react";
import PropTypes from "prop-types";
import usePopper from "use-popper";

import { useKeyPress, useOnClickOutside } from "../../hooks";
import util from "../../util";

function Popover(props) {
  const {
    placement,
    overlay,
    shouldCloseOnExternalClick,
    isVisible,
    children
  } = props;
  const { reference, popper } = usePopper({ placement });
  const [visible, setVisible] = useState(false);
  const isShown = visible || isVisible;
  const ref = useRef();

  function close() {
    setVisible(false);
  }

  function handleToggle() {
    const state = visible ? false : true;

    setVisible(state);
  }

  useKeyPress("Escape", close);
  useOnClickOutside(ref, shouldCloseOnExternalClick && close);

  return (
    <>
      {cloneElement(children, {
        ref: reference.ref,
        onClick: handleToggle
      })}
      {isShown &&
        cloneElement(overlay({ close }), {
          ref: util.mergeRefs(ref, popper.ref),
          style: popper.styles
        })}
    </>
  );
}

Popover.propTypes = {
  placement: PropTypes.oneOf([
    "auto",
    "auto-start",
    "auto-end",
    "top",
    "top-start",
    "top-end",
    "right",
    "right-start",
    "right-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end"
  ]),
  overlay: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isVisible: PropTypes.bool,
  shouldCloseOnExternalClick: PropTypes.bool
};

Popover.defaultProps = {
  placement: "bottom-start",
  isVisible: false,
  shouldCloseOnExternalClick: true
};

export default Popover;
