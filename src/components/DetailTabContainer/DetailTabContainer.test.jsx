import React from 'react';
import { mount } from 'enzyme';

import DetailTabContainer from './DetailTabContainer';

const items = [
  {
    id: 'identity',
    name: 'Identity',
    active: true,
    component: <h1>Identity</h1>,
    isDisabled: false,
  },
  {
    id: 'device-information',
    name: 'Device Information',
    active: false,
    component: <h1>Device Information</h1>,
    isDisabled: false,
  },
  {
    id: 'recent-events',
    name: 'Recent Events',
    active: false,
    component: <h1>Recent Events</h1>,
    isDisabled: false,
  },
  {
    id: 'state',
    name: 'State',
    active: false,
    component: <h1>State</h1>,
    isDisabled: true,
  },
  {
    id: 'logs',
    name: 'Logs',
    active: false,
    component: <h1>Logs</h1>,
    isDisabled: false,
  },
];

describe('Detail Tab Container', () => {
  // handle click function test
  test('onCloseClick', () => {
    const onCloseClick = jest.fn();
    const wrapper = mount(
      <DetailTabContainer
        design="normal"
        currentItemId={items[0].id}
        items={items}
        onClose={onCloseClick}
        onChangeItem={jest.fn()}
      />
    );
    wrapper
      .find('button[onClick]')
      .first()
      .simulate('click');
    expect(onCloseClick.mock.calls).toHaveLength(1);
  });
  test('onChangeItem', () => {
    const onChangeItem = jest.fn();
    const wrapper = mount(
      <DetailTabContainer
        design="normal"
        currentItemId={items[0].id}
        items={items}
        onClose={jest.fn()}
        onChangeItem={onChangeItem}
      />
    );
    wrapper
      .find('a')
      .last()
      .simulate('click');
    expect(onChangeItem.mock.calls).toHaveLength(1);
  });
  test('onEditClick', () => {
    const onEditClick = jest.fn();
    const wrapper = mount(
      <DetailTabContainer
        design="normal"
        currentItemId={items[0].id}
        items={items}
        onClose={jest.fn()}
        onChangeItem={jest.fn()}
        canEdit
        onEdit={onEditClick}
        editMode={{
          isActive: false,
          cancelLabel: 'Cancel',
          saveLabel: 'Save',
        }}
      />
    );
    wrapper
      .find('button[onClick]')
      .first()
      .simulate('click');
    expect(onEditClick.mock.calls).toHaveLength(1);
  });
});
