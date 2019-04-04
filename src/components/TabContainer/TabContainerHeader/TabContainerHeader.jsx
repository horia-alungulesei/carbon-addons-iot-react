import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Tabs, Tab } from 'carbon-components-react';

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
    })
  ).isRequired,
  /** Callback when item is changed */
  onChangeItem: PropTypes.func.isRequired,
  /** Callback when edit */
  onEdit: PropTypes.func,
  /** Callback when close modal */
  onClose: PropTypes.func.isRequired,
  /** Can edit */
  canEdit: PropTypes.bool.isRequired,
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
  }).isRequired,
};

const defaultProps = {
  design: 'normal',
  disabled: false,
  onEdit: () => {},
};

const StyledCustomTableHeader = styled.div`
  background: #f5f8fb;
  border-bottom: 1px solid #dadada8c;
  nav ul {
    padding-left: 100px;
    margin: 0;
  }
  .bx--tabs__nav-item {
    line-height: 56px;
    padding-top: 0;
    padding-bottom: 0;
  }

  ${props => {
    const { design } = props;
    return design === 'mini'
      ? `
        height: 48px;
        line-height: 48px;
      `
      : '';
  }}
`;

const StyledTabs = styled(Tabs)`
  height: 56px;
`;

const StyledRightTab = styled.li`
  margin-left: auto;
  margin-right: 12px;
  line-height: 56px;
  ${props => {
    const { design } = props;
    return design === 'mini'
      ? `
        height: 48px;
        line-height: 48px;
      `
      : '';
  }}
`;

const StyledTab = styled(Tab)`
  a {
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    cursor: ${props => (props.disabled ? 'not-allowed' : '')};
  }

  ${props => {
    const { design } = props;
    return design === 'mini'
      ? `
        height: 48px;
        line-height: 48px;
      `
      : '';
  }};
`;

const TabContainerHeader = ({
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
  const isSelected = items.findIndex(({ id }) => id === currentItemId);

  const sectionTitle = items.map(({ id, name }) => (
    <StyledTab
      key={id}
      design={design}
      disabled={disabled}
      onClick={e => {
        if (!isSelected && !disabled && onChangeItem) {
          onChangeItem(id);
        } else {
          e.preventDefault();
        }
      }}
      onKeyDown={() => {}}
      label={name}
    />
  ));

  const rightMenu = (
    <StyledRightTab design={design}>
      {canEdit && !isEditMode ? (
        <Button
          kind="ghost"
          icon="edit"
          onClick={() => onEdit()}
          iconDescription="Edit"
          disabled={disabled}>
          Edit{' '}
        </Button>
      ) : (
        undefined
      )}
      <Button kind="ghost" icon="close" small onClick={() => onClose()} disabled={disabled} />
    </StyledRightTab>
  );

  const tabsSection = (
    <StyledCustomTableHeader design={design}>
      <StyledTabs selected={isSelected} tabContentClassName="tab-content">
        {sectionTitle}
        {rightMenu}
      </StyledTabs>
    </StyledCustomTableHeader>
  );
  return <Fragment>{tabsSection}</Fragment>;
};

TabContainerHeader.propTypes = propTypes;
TabContainerHeader.defaultProps = defaultProps;

export default TabContainerHeader;
