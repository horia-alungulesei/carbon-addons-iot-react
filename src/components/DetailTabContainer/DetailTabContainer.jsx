import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DetailTabContainerHeader from './DetailTabContainerHeader/DetailTabContainerHeader';
import DetailTabContainerFooter from './DetailTabContainerFooter/DetailTabContainerFooter';

const propTypes = {
  /** Component header design */
  design: PropTypes.oneOf(['normal', 'mini']),
  /** Header is disabled */
  disabled: PropTypes.bool,
  /** Current item selected id */
  currentItemId: PropTypes.string.isRequired,
  /** Object for content items */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      component: PropTypes.element.isRequired,
      isDisabled: PropTypes.bool.isRequired,
    })
  ).isRequired,
  /** Callback when item is changed */
  onChangeItem: PropTypes.func.isRequired,
  /** Callback when edit */
  onEdit: PropTypes.func,
  /** Callback when close modal */
  onClose: PropTypes.func.isRequired,
  /** Can edit */
  canEdit: PropTypes.bool,
  /** component to show in footer. */
  editMode: PropTypes.shape({
    /** Edit mode active */
    isActive: PropTypes.bool,
    /** Callback when cancel edit */
    onCancel: PropTypes.func,
    /** Callback when save edit */
    onSave: PropTypes.func,
    /** Internationalized label for the word 'Cancel' */
    cancelLabel: PropTypes.string,
    /** Internationalized label for the word 'Save' */
    saveLabel: PropTypes.string,
  }),
};

const defaultProps = {
  design: 'normal',
  disabled: false,
  canEdit: false,
  onEdit: () => {},
  editMode: {},
};

const StyledTabContainerContent = styled.div`
  padding: 32px 80px 32px 100px;
`;

const StyledTabContainer = styled.div`
  border: 1px solid #a2a2a28c;
  border-top: none;
  background: #ffffff;
`;

const DetailTabContainer = ({
  design,
  disabled,
  items,
  currentItemId,
  onChangeItem,
  onEdit,
  onClose,
  canEdit,
  editMode,
}) => {
  const isEditMode = canEdit && editMode && editMode.isActive;

  const header = (
    <DetailTabContainerHeader
      design={design}
      disabled={disabled}
      currentItemId={currentItemId}
      items={items}
      onChangeItem={onChangeItem}
      onEdit={onEdit}
      onClose={onClose}
      canEdit={canEdit}
      editMode={editMode}
    />
  );

  const footer = isEditMode ? (
    <DetailTabContainerFooter
      onSave={editMode.onSave}
      onCancel={editMode.onCancel}
      saveLabel={editMode.saveLabel}
      cancelLabel={editMode.cancelLabel}
    />
  ) : (
    undefined
  );

  const selectedItemObj = items.find(({ id }) => currentItemId === id);
  const contentSection = (
    <StyledTabContainerContent>
      <div
        id={`${selectedItemObj.id}-content`}
        role="tabpanel"
        aria-labelledby={`${selectedItemObj.id}-content`}>
        {selectedItemObj.component}
      </div>
    </StyledTabContainerContent>
  );

  return (
    <StyledTabContainer>
      {header}
      {contentSection}
      {footer}
    </StyledTabContainer>
  );
};

DetailTabContainer.propTypes = propTypes;
DetailTabContainer.defaultProps = defaultProps;

export default DetailTabContainer;
