import { capitalCase } from 'change-case';
// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import NewEventComponent from '../../components/_dashboard/user/NewEventComponent';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const ACCOUNT_TABS = [
    {
      value: '',
      icon: '',
      component: <NewEventComponent />
    }
  ];

  return (
    <Page title="New Event | EventMag">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack>
          <Tabs
            value={0}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
          >
            
            <Tab disableRipple key={ACCOUNT_TABS[0].value} label={capitalCase(ACCOUNT_TABS[0].value)} icon={''} value={''} />
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            return <Box key={ACCOUNT_TABS[0].value}>{ACCOUNT_TABS[0].component}</Box>
          })}
        </Stack>
      </Container>
    </Page>
  );
}
