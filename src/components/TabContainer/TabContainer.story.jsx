/* Used dependencies */
import React, { Component } from 'react';
import { select, boolean, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import TabContainer from './TabContainer';

const items = [
  {
    id: 'identity',
    name: 'Identity',
    active: true,
    component: <h1>Identity</h1>,
  },
  {
    id: 'device-information',
    name: 'Device Information',
    active: false,
    component: <h1>Device Information</h1>,
  },
  {
    id: 'recent-events',
    name: 'Recent Events',
    active: false,
    component: <h1>Recent Events</h1>,
  },
  {
    id: 'state',
    name: 'State',
    active: false,
    component: <h1>State</h1>,
  },
  {
    id: 'logs',
    name: 'Logs',
    active: false,
    component: <h1>Logs</h1>,
  },
];

/* Button with label only */
class TabContainerSimple extends Component {
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
      <TabContainer
        design={select('design', ['normal', 'mini'], 'normal')}
        disabled={boolean('disabled', false)}
        currentItemId={currentItemId}
        items={object('items', itemsObj)}
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

storiesOf('Tab Container', module)
  .add('default', () => <TabContainerSimple />)
  .add('Edit Mode', () => (
    <TabContainerSimple
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
