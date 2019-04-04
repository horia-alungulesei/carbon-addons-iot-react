import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'carbon-components-react';

const propTypes = {
  /** Callback when saved */
  onSave: PropTypes.number.isRequired,
  /** Callback when cancelled */
  onCancel: PropTypes.number.isRequired,
  /** Internationalized label for the word 'Save' */
  saveLabel: PropTypes.string,
  /** Internationalized label for the word 'Cancel' */
  cancelLabel: PropTypes.string,
};

const defaultProps = {
  saveLabel: 'Save',
  cancelLabel: 'Cancel',
};

const StyledFooter = styled.div`
  &&& {
    height: 72px;
    align-items: center;
    padding-left: 48px;
    padding-right: 48px;
  }

  margin-left: 0 !important;
  margin-right: 0 !important;
`;

const TabContainerFooter = ({ onSave, onCancel, saveLabel, cancelLabel }) => (
  <StyledFooter className="bx--modal-footer">
    <Button onClick={onCancel} kind="secondary">
      {cancelLabel}
    </Button>
    <Button onClick={onSave}>{saveLabel}</Button>
  </StyledFooter>
);

TabContainerFooter.propTypes = propTypes;
TabContainerFooter.defaultProps = defaultProps;

export default TabContainerFooter;
