import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Typography} from 'channels-components/components';
import {ThemeProvider, createTheme} from 'channels-components/apis';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {ScrollView} from 'react-native';

const customTheme = createTheme({
  colors: {
    primary: 'purple',
  },
});

const validationSchema = Yup.object({
  firstName: Yup.string().required('Required!'),
  lastName: Yup.string().required('Required!'),
  email: Yup.string().email('Please provide valid email').required('Required!'),
  password: Yup.string()
    .min(6, 'Min of 6 characters')
    .max(20, 'Max of 20 characters')
    .required('Required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm password should match password')
    .required('Required!'),
});

const registerHandler = async formData => {
  return new Promise((resolve, reject) => {
    if (formData.email === 'hello@gmail.com') {
      reject({
        email: 'Email already taken',
      });
      return;
    }

    setTimeout(() => {
      resolve('ok');
    }, 2500);
  });
};

const App = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit,
  });

  async function onSubmit(values) {
    try {
      formik.setSubmitting(true);
      await registerHandler(values);
      formik.resetForm();
    } catch (error) {
      formik.setErrors(error);
    } finally {
      formik.setSubmitting(true);
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <ScrollView style={styles.screen}>
        <Typography variant="h1">Register Form</Typography>

        <View style={styles.spacing}>
          <Typography
            variant="body1"
            style={
              formik.touched.firstName && formik.errors.firstName
                ? styles.error
                : {}
            }>
            First Name
          </Typography>
          <Input
            value={formik.values.firstName}
            onChangeText={formik.handleChange('firstName')}
            onBlur={formik.handleBlur('firstName')}
            style={
              formik.touched.firstName && formik.errors.firstName
                ? styles.error
                : {}
            }
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <Typography variant="body2" style={styles.error}>
              {formik.errors.firstName}
            </Typography>
          )}
        </View>

        <View style={styles.spacing}>
          <Typography
            variant="body1"
            style={
              formik.touched.lastName && formik.errors.lastName
                ? styles.error
                : {}
            }>
            Last Name
          </Typography>
          <Input
            value={formik.values.lastName}
            onChangeText={formik.handleChange('lastName')}
            onBlur={formik.handleBlur('lastName')}
            style={
              formik.touched.lastName && formik.errors.lastName
                ? styles.error
                : {}
            }
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <Typography variant="body2" style={styles.error}>
              {formik.errors.lastName}
            </Typography>
          )}
        </View>

        <View style={styles.spacing}>
          <Typography
            variant="body1"
            style={
              formik.touched.email && formik.errors.email ? styles.error : {}
            }>
            Email Name
          </Typography>
          <Input
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            style={
              formik.touched.email && formik.errors.email ? styles.error : {}
            }
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant="body2" style={styles.error}>
              {formik.errors.email}
            </Typography>
          )}
        </View>

        <View style={styles.spacing}>
          <Typography
            variant="body1"
            style={
              formik.touched.password && formik.errors.password
                ? styles.error
                : {}
            }>
            Password
          </Typography>
          <Input
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry
            style={
              formik.touched.password && formik.errors.password
                ? styles.error
                : {}
            }
          />
          {formik.touched.password && formik.errors.password && (
            <Typography variant="body2" style={styles.error}>
              {formik.errors.password}
            </Typography>
          )}
        </View>

        <View style={styles.spacing}>
          <Typography
            variant="body1"
            style={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? styles.error
                : {}
            }>
            Confirm Password
          </Typography>
          <Input
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            secureTextEntry
            style={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? styles.error
                : {}
            }
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <Typography variant="body2" style={styles.error}>
              {formik.errors.confirmPassword}
            </Typography>
          )}
        </View>

        <View style={styles.spacing}>
          <Button
            title="Sign up"
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
            disabled={
              formik.isSubmitting ||
              !formik.isValid ||
              (!formik.dirty && formik.isValid)
            }
          />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    padding: 16,
  },
  spacing: {
    marginVertical: 5,
  },
  error: {
    borderColor: 'red',
    color: 'red',
  },
});
