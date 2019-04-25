/* Used dependencies */
import React, { Component } from 'react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

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
    isDisabled: true,
  },
];

/* Button with label only */
class DetailTabContainerSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: items.map(i => i),
      currentItemId: 'identity',
    };
  }

  render = () => {
    const { items: itemsObj, currentItemId } = this.state;

    return (
      <DetailTabContainer
        design={select('design', ['normal', 'mini'], 'normal')}
        disabled={boolean('disabled', false)}
        currentItemId={currentItemId}
        items={itemsObj}
        onClose={() => {
          window.alert('closing');
        }}
        onChangeItem={itemId =>
          this.setState({
            items: itemsObj.map(i => ({
              ...i,
              active: i.id === itemId,
              id: i.id,
              name: i.name,
            })),
            currentItemId: itemId,
          })
        }
        {...this.props}
      />
    );
  };
}

storiesOf('Detail Tab Container', module)
  .add('Stateful Example', () => <DetailTabContainerSimple />)
  .add('default', () => (
    <DetailTabContainer
      design={select('design', ['normal', 'mini'], 'normal')}
      disabled={boolean('disabled', false)}
      currentItemId="identity"
      items={items}
      onClose={() => {
        window.alert('closing');
      }}
      onChangeItem={() => {}}
    />
  ))
  .add('Edit Mode', () => (
    <DetailTabContainerSimple
      canEdit={boolean('canEdit', true)}
      editMode={{
        isActive: boolean('Edit mode - active', false),
        onCancel: () => alert('Cancel edit'),
        onSave: () => alert('Save edit '),
        cancelLabel: text('Cancel', 'Cancel'),
        saveLabel: text('Save', 'Save'),
      }}
    />
  ));
