import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import ResourceSelectionList from './ResourceSelectionList';

storiesOf('ResourceSelectionList (Experimental)', module).add('default', () => (
  <div style={{ width: 200, height: 800, position: 'relative' }}>
    <ResourceSelectionList
      title="Precious Gems"
      items={[
        { id: 'a', name: 'Amethyst' },
        { id: 'b', name: 'Beryl' },
        { id: 'c', name: 'Calcite' },
        { id: 'd', name: 'Diamond' },
        { id: 'e', name: 'Emerald' },
        { id: 'f', name: 'Fuchsite' },
        { id: 'g', name: 'Garnet' },
      ]}
      selectedItemId="b"
      onSelectItem={action('onSelectItem')}
    />
  </div>
));
