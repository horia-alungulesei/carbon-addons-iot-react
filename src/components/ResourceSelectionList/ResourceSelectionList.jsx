import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { COLORS } from '../../styles/styles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 0.875rem;
  flex-direction: column;
  background: white;
`;

const Header = styled.div`
  font-weight: bold;
  flex: 0;
  border-bottom: solid 1px ${COLORS.lightGrey};
  background: white;
`;

const ListItems = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
   {
    ${props =>
      props.selected
        ? `
          background: ${COLORS.extraLightGrey};
          border-left: solid 4px ${COLORS.blue};
        `
        : `
          cursor: pointer;
        `}
    flex: 0 0 32px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    border-bottom: solid 1px ${COLORS.lightGrey};
  }
`;

const ResourceSelectionListPropTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedItemId: PropTypes.string,
  onSelectItem: PropTypes.func.isRequired,
};

const ResourceSelectionListDefaultProps = {
  items: [],
  selectedItemId: undefined,
};

const ResourceSelectionList = ({ title, items, selectedItemId, onSelectItem }) => {
  return (
    <Container>
      <Header>{title}</Header>
      <ListItems>
        {items.map(({ id, name }) => (
          <ListItem selected={id === selectedItemId} onClick={() => onSelectItem(id)}>
            {name}
          </ListItem>
        ))}
      </ListItems>
    </Container>
  );
};

ResourceSelectionList.propTypes = ResourceSelectionListPropTypes;
ResourceSelectionList.defaultProps = ResourceSelectionListDefaultProps;
ResourceSelectionList.displayName = 'ResourceSelectionList';

export default ResourceSelectionList;
