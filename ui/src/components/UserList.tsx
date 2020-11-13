import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { Party } from '@daml/types';
import { PlasmaDonor } from '@daml-ts/covid19-plasma-donation-app-0.1.0/lib/PlasmaDonation';

type Props = {
  users: PlasmaDonor[];
  onFollow: (userToFollow: Party) => void;
}

/**
 * React component to display a list of `User`s.
 * Every party in the list can be added as a friend.
 */
const UserList: React.FC<Props> = ({users, onFollow}) => {
  return (
    <List divided relaxed>
      {[...users].sort((x, y) => x.donor.localeCompare(y.donor)).map(user =>
        <List.Item key={user.donor}>
          <List.Icon name='user' />
          <List.Content>
            <List.Content floated='right'>
              <Icon
                name='add user'
                link
                className='test-select-add-user-icon'
                onClick={() => onFollow(user.donor)} />
            </List.Content>
            <List.Header className='test-select-user-in-network'>{user.donor} with Address: {user.address}</List.Header>
          </List.Content>
          <List.List>
            {/* {[...user.following].sort((x, y) => x.localeCompare(y)).map(userToFollow =>
              <List.Item key={userToFollow}>
                <List.Content floated='right'>
                  <Icon
                    name='add user'
                    link
                    className='test-select-add-user-following-icon'
                    onClick={() => onFollow(userToFollow)} />
                </List.Content>
                <List.Icon name='user outline' />
                <List.Content>
                  <List.Header>{userToFollow}</List.Header>
                </List.Content>
              </List.Item>
            )} */}
          </List.List>
        </List.Item>
      )}
    </List>
  );
};

export default UserList;
