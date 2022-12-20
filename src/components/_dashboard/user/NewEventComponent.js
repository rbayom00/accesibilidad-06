import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, TextField, FormControlLabel, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

export default function NewEventComponent() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: user.displayName || '',
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      about: user.about,
      isPublic: user.isPublic
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up('md')]: {
      height: '100%',
      width: '100%',
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={0}>
            <Card sx={{ py: 6, px: 3, textAlign: 'center' }}>
              <RootStyle>
                <CardContent
                  sx={{
                    p: { md: 0 },
                    pl: { md: 5 },
                    color: 'grey.800'
                  }}
                >
                  <Typography gutterBottom variant="h4">
                    Here you can create your own event
                  </Typography>

                  <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
                    Fill the details below and your event will be ready to go!
                  </Typography>
                </CardContent>
                <img
                  style={{ marginRight: 60 }}
                  src="/static/illustrations/eventmag_box_big.png"
                  height="180px"
                  width="180px"
                  alt="Box"
                />
              </RootStyle>
            </Card>
          </Grid>

          <Grid item xs={12} md={0}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 4 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Event header" />
                  <TextField fullWidth label="Location" />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Country" defaultValue={'Spain'} />
                </Stack>

                <TextField fullWidth multiline minRows={3} maxRows={3} label="Describe the event briefly" />

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="Price (€)" defaultValue={'0.00'} />
                  <TextField fullWidth label="Capacity" />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="City" />
                  <TextField fullWidth label="Zip/Code" />
                  <FormControlLabel
                    control={<Switch color="primary" defaultChecked />}
                    labelPlacement="start"
                    label="Public Event"
                    sx={{ ml: 5, textAlign: 'center' }}
                  />
                </Stack>
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Create the event
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
