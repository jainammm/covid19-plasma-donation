import React, { useMemo } from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
import { Party } from '@daml/types';
import { PlasmaDonor } from '@daml-ts/covid19-plasma-donation-app-0.1.0/lib/PlasmaDonation';
import { useParty, useExerciseByKey, useStreamFetchByKey, useStreamQuery } from '@daml/react';
import UserList from './UserList';
import PartyListEdit from './PartyListEdit';

const MainView: React.FC = () => {
  const username = useParty();
  const myUserResult = useStreamFetchByKey(PlasmaDonor, () => username, [username]);
  console.log("My user result")
  console.log(myUserResult)
  const myUser = myUserResult.contract?.payload;
  const allDonors = useStreamQuery(PlasmaDonor).contracts;

  // Sorted list of users that are following the current user
  const plasmaDonors = useMemo(() =>
    allDonors
    .map(user => user.payload),
    [allDonors, username]);

  const exerciseFollow = useExerciseByKey(PlasmaDonor.BecomeDonor);

  const becomeDonor = async (donorAddress: string): Promise<boolean> => {
    try {
      await exerciseFollow(username, {donorAddress});
      return true;
    } catch (error) {
      alert("Unknown error:\n" + JSON.stringify(error));
      return false;
    }
  }

  return (
    <Container>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                {myUser ? `Welcome, ${myUser.donor}!` : 'Loading...'}
            </Header>

            <Segment>
              <Header as='h2'>
                <Icon name='user' />
                <Header.Content>
                  {myUser?.donor ?? 'Loading...'}
                  <Header.Subheader>All the donors present</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <PartyListEdit
                onAddParty={becomeDonor}
              />
            </Segment>
            <Segment>
              <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                  The Network
                  <Header.Subheader>My followers and users they are following</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <UserList
                users={plasmaDonors}
                onFollow={becomeDonor}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
