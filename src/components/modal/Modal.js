import React, { createRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useLockBodyScroll, useKeyPress, useOnClickOutside } from "../../hooks";

import { SIZE, SIZE_WIDTH } from "./constants";

const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  width: 100%;
`;

const Dialog = styled.div`
  margin: 1rem;
  width: ${props => SIZE_WIDTH[props.size]};
  border-radius: ${props => props.theme.borders.radius200};
  background-color: ${props => props.theme.colors.backgroundPrimary};
`;

function Modal(props) {
  const { onClose, mountNode, isOpen, size, children } = props;
  const ref = createRef();

  useLockBodyScroll(isOpen);
  useKeyPress("Escape", onClose);
  useOnClickOutside(ref, onClose);

  if (!(mountNode instanceof HTMLElement)) {
    return null;
  } else if (!isOpen) {
    return null;
  }
  return createPortal(
    <Backdrop>
      <Wrapper>
        <Dialog ref={ref} size={size}>
          {children}
        </Dialog>
      </Wrapper>
    </Backdrop>,
    mountNode
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  mountNode: PropTypes.instanceOf(Element).isRequired,
  isOpen: PropTypes.bool,
  size: PropTypes.oneOf([SIZE.default, SIZE.full, SIZE.auto])
};

Modal.defaultProps = {
  mountNode: document.body,
  isOpen: false,
  size: SIZE.default
};

export default Modal;
