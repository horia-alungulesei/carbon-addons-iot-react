import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'carbon-components-react';

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
      /** item is disabled */
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
  .bx--tabs {
    height: 56px;
  }

  ${props =>
    props.design === 'mini'
      ? `
        height: 48px;
        line-height: 48px;
      `
      : ''}
`;

const StyledTabs = styled.ul`
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

const StyledTab = styled.li`
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

const StyledTabLink = styled.a`
  ${props => {
    const { disabled } = props;
    return disabled
      ? `
        opacity: 0.5;
        cursor: not-allowed;
      `
      : '';
  }};
`;

const DetailTabContainerHeader = ({
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

  const sectionTitle = items.map(({ id, name, isDisabled }, idx) => {
    const isSelected = id === currentItemId;
    return (
      <StyledTab
        key={`${id}-tab`}
        design={design}
        className={['bx--tabs__nav-item', isSelected ? 'bx--tabs__nav-item--selected' : ''].join(
          ' '
        )}
        role="presentation">
        <StyledTabLink
          key={`${id}-tab-link`}
          disabled={disabled || isDisabled}
          className="bx--tabs__nav-link"
          onClick={() => {
            if (!isSelected && !disabled && !isDisabled && onChangeItem) {
              onChangeItem(id);
            }
          }}
          role="tab"
          aria-controls={`tab-panel-${idx}`}
          aria-selected={isSelected ? 'true' : 'false'}>
          {name}
        </StyledTabLink>
      </StyledTab>
    );
  });

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
      <nav className="bx--tabs" role="navigation">
        <div className="bx--tabs-trigger" tabIndex="0" role="tabpanel">
          <svg
            className="bx--dropdown__arrow"
            width="10"
            height="5"
            viewBox="0 0 10 5"
            fillRule="evenodd">
            <path d="M10 0L5 5 0 0z" />
          </svg>
        </div>
        <StyledTabs className="bx--tabs__nav bx--tabs__nav--hidden" role="tablist">
          {sectionTitle}
          {rightMenu}
        </StyledTabs>
      </nav>
    </StyledCustomTableHeader>
  );

  return <Fragment>{tabsSection}</Fragment>;
};

DetailTabContainerHeader.propTypes = propTypes;
DetailTabContainerHeader.defaultProps = defaultProps;

export default DetailTabContainerHeader;
