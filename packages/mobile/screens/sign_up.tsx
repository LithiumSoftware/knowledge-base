import * as React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

// import {CREATE_USER_MUTATION} from "@workspace-library/core";

const CREATE_USER_MUTATION = gql`
  mutation signup($username: String, $email: String!, $password: String!) {
    signUpUser(userInput: { username: $username, email: $email, password: $password }) {
      id
    }
  }
`;

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your name")
    .min(4, "Name is too short")
    .max(12, "Thats a long name you have there"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Please enter the password"),
  confirmation: Yup.string()
    .required("Please enter the password confirmation")
    .oneOf([Yup.ref("password")], "Password does not match")
});

const SignUp = ({ navigation }: any) => {
  const [signUpUser, { data }] = useMutation(CREATE_USER_MUTATION);

  const submition = (values: any, { setErrors }: any) => {
    signUpUser({
      variables: {
        username: values.username,
        email: values.email,
        password: values.password
      }
    })
      .then(
        ({
          data: {
            signUpUser: { id }
          }
        }) => {
          if (id) {
            navigation.navigate("SignIn");
          }
          
        }
      )
      .catch(({ Errors,graphQLErrors }) => {
        const error = graphQLErrors?.map((err: any) => err?.message);
        setErrors({ server: error[0] });
      });
  };



  return (
    <View style={styles.container}>
      <View>
        <Image resizeMode={'cover'}
          source={require('../assets/logo-lithium.png')}
        />
        <Text style={styles.loginText} >{'Welcome to Lithium KB'}</Text>
      </View>
      <Text style={styles.title}>Sign up</Text>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmation: '' }}
        validationSchema={signupSchema}
        onSubmit={submition}>
        {({ values: { username, email, password, confirmation }, handleChange, handleSubmit, errors, touched, handleBlur }: { values: any, handleChange: any, handleSubmit: any, errors: any, touched: any, handleBlur: any }) => (
          <React.Fragment>

            {errors?.server &&
              <Text style={{ fontSize: 15, color: 'red' }}>{errors.server}</Text>
            }   

            {touched.username && errors?.username?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
            }
            <View style={styles.inputView} >
              <Field
                component={TextInput}
                style={styles.inputText}
                value={username}
                placeholder="Name..."
                placeholderTextColor="#003f5c"
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')} />
            </View>

            {touched.email && errors?.email?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <View style={styles.inputView} >
              <Field
                component={TextInput}
                style={styles.inputText}
                value={email}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                // error={touched["email"] && errors?["email"]?.length > 0 : ''}
                // helperText={touched["email"] && errors["email"]}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')} />
            </View>

            {touched.password && errors?.password?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }
            <View style={styles.inputView} >
              <Field
                component={TextInput}
                value={password}
                secureTextEntry
                style={styles.inputText}
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                // error={touched["password"] && errors?["password"]?.length > 0 : ''}
                // helperText={touched["password"] && errors["password"]}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')} />
            </View>

            {touched.confirmation && errors?.confirmation?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmation}</Text>
            }
            <View style={styles.inputView} >
              <Field
                component={TextInput}
                value={confirmation}
                secureTextEntry
                style={styles.inputText}
                placeholder="Confirmation..."
                placeholderTextColor="#003f5c"
                // error={touched["confirmation"] && errors?["confirmation"]?.length > 0 : ''}
                // helperText={touched["confirmation"] && errors["confirmation"]}
                onBlur={handleBlur('confirmation')}
                onChangeText={handleChange('confirmation')} />
            </View>

            <TouchableOpacity style={styles.signUpBtn}
              onPress={handleSubmit}>
              <Text style={styles.signUpText}>SIGN UP</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </Formik>
      <View style={styles.login}>
        <Text>{'Already have an acount? '}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.loginText}> LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#000000",
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    // borderRadius: 150,
    // outline:5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderColor: "#20232a",
    borderWidth: 1,
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  signUpBtn: {
    width: "80%",
    backgroundColor: "#ffb900",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "#ffb900"
  },
  signUpText: {
    color: "black"
  },
  login: {
    flexDirection: 'row',
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default SignUp;