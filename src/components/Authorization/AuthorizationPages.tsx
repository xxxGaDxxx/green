import React from 'react';
import { useFormik } from 'formik';
import { observer } from 'mobx-react-lite';
import AppStore, { SetSettingsParams, STATUS } from '../../stor/AppStore';
import { AuthorizationHelper, initialForm } from './Authorization.helper';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

export const AuthorizationPages = observer(() => {
  const { checkData, loading, textErrors, status } = AppStore;

  const formik = useFormik<SetSettingsParams>({
    initialValues: initialForm,

    validationSchema: AuthorizationHelper.getValidationSchema(),

    onSubmit: (values: SetSettingsParams) => {
      console.log('values', values);
      checkData(values);
    },
  });

  console.log('for', formik);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems={'center'}
      height={'100%'}
    >
      <Grid
        item
        justifyContent="center"
        alignItems={'center'}
        style={styles.wrapper}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Заполните форму
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormControl fullWidth>
            <div style={styles.container}>
              <TextField
                type="text"
                margin="normal"
                size="small"
                label="Ваш ID"
                required
                {...formik.getFieldProps('idInstance')}
                error={
                  !!(formik.touched.idInstance && formik.errors.idInstance)
                }
              />
              {formik.touched.idInstance && formik.errors.idInstance && (
                <FormHelperText style={styles.helperText} error>
                  {formik.errors.idInstance}
                </FormHelperText>
              )}
            </div>

            <div style={styles.container}>
              <TextField
                type="text"
                margin="normal"
                size="small"
                label="Ваш токен"
                required
                {...formik.getFieldProps('apiTokenInstance')}
                error={
                  !!(
                    formik.touched.apiTokenInstance &&
                    formik.errors.apiTokenInstance
                  )
                }
              />
              {formik.touched.apiTokenInstance &&
                formik.errors.apiTokenInstance && (
                  <FormHelperText style={styles.helperText} error>
                    {formik.errors.apiTokenInstance}
                  </FormHelperText>
                )}
            </div>

            <div style={styles.container}>
              <TextField
                type="tel"
                margin={'normal'}
                size="small"
                label="Телефон собеседника"
                required
                {...formik.getFieldProps('phoneNumber')}
                error={
                  !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                }
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <FormHelperText style={styles.helperText} error>
                  {formik.errors.phoneNumber}
                </FormHelperText>
              )}
            </div>

            <div style={styles.container}>
              <Button
                type="submit"
                style={styles.button}
                variant="contained"
                size="small"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'создать чат'
                )}
              </Button>

              {status === STATUS.Error && (
                <FormHelperText style={styles.helperText} error>
                  {textErrors}
                </FormHelperText>
              )}
            </div>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
});

const styles = {
  wrapper: {
    padding: '20px',
    borderRadius: '10px',
    background: 'white',
    boxShadow: '0 5px 8px 5px rgba(0, 0, 0, 0.1)',
  },

  container: {
    position: 'relative' as 'relative',
    marginBottom: '5px',
  },

  helperText: {
    position: 'absolute' as 'absolute',
    bottom: '-10px',
    marginLeft: 0,
  },
  button: {
    position: 'relative' as 'relative',
    width: '100%',
    margin: '16px 0 8px 0',
    background: 'rgb(75,173,78)',
  },
};
