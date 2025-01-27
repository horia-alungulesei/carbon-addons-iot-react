import React, { Component } from 'react';
import { select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Bee32 from '@carbon/icons-react/lib/bee/32';
import Edit from '@carbon/icons-react/lib/edit/16';

import ResourceList from './ResourceList';

const resourceData = [
  {
    id: 'row-0',
    title: 'Item A',
    description:
      'Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.',
  },
  {
    id: 'row-1',
    title: 'Item B',
    description:
      'Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.',
  },
  {
    id: 'row-2',
    title: 'Item C',
    description:
      'Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed. Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.Lorem ipsun dolor sit amet, consectetur adipiscing elit. Nunc dui magna, finibus id tortor sed.',
  },
];

/* Resource List simple */
class ResourceListSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemId: '',
    };
  }

  render = () => {
    const { currentItemId } = this.state;

    return (
      <ResourceList
        {...this.props}
        design={select('Resource list design', ['normal', 'inline'], 'normal')}
        data={resourceData}
        currentItemId={currentItemId}
        onRowClick={itemId => this.setState({ currentItemId: itemId })}
      />
    );
  };
}

storiesOf('Watson IoT|ResourceList', module)
  .add('default', () => <ResourceListSimple />)
  .add('with extra content', () => (
    <ResourceListSimple
      extraContent={resourceData.map(i => (
        <div>
          <h5>{i.id}</h5>
          <Bee32 />
        </div>
      ))}
    />
  ))
  .add('with action', () => (
    <ResourceList
      design={select('Resource list design', ['normal', 'inline'], 'normal')}
      data={resourceData}
      customAction={{
        onClick: action('customAction.onClick'),
        label: 'Configure',
        icon: () => <Edit />,
      }}
    />
  ));
