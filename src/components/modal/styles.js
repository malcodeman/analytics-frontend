import styled from "styled-components";

export const ModalHeader = styled.div`
  margin: 2rem 1.5rem 1rem 1.5rem;
  color: ${props => props.theme.colors.foreground};
  ${props => props.theme.typography.font550};
`;

export const ModalBody = styled.div`
  margin: 1rem 1.5rem;
  color: ${props => props.theme.colors.foregroundAlt};
  ${props => props.theme.typography.font200};
`;

export const ModalFooter = styled.div`
  padding: 0.5rem 0;
  margin: 0 1.5rem;
  text-align: right;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  ${props => props.theme.typography.font200};
`;
