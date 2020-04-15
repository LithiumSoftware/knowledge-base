import { useMutation } from "@apollo/react-hooks";
import { Field, Formik } from 'formik';
import gql from "graphql-tag";
import * as React from "react";
import { Image, Text, TouchableOpacity, Alert} from 'react-native';
import styled from 'styled-components/native';
import * as Yup from "yup";
import { TextInput } from "react-native-paper";
import CREATE_USER_MUTATION from '../local_core/mutations/CREATE_USER_MUTATION';

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

function alert(nombre : string)  {Alert.alert(
  nombre,
  "My Alert Msg",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ],
  { cancelable: false }
)};

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
            signedUser: { id }
          }
        }) => {
          if (id && id > 0) {
            navigation.navigate("HomeScreen");
          }
        }
      )
      .catch(({ Errors,graphQLErrors }) => {
        const error = graphQLErrors?.map((err: any) => err?.message);
          setErrors({ server: error[0] });
      });
  };



  return (
    <Container>
      <Header>
        <Image resizeMode={'cover'}
          source={require('../assets/logo-lithium.png')}
        />
        <WelcomeText>{'Welcome to Lithium KB'}</WelcomeText>
      </Header>
      <Title>{'Sign up'}</Title>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmation: '' }}
        validationSchema={signupSchema}
        onSubmit={submition}>

        {({ values: { username, email, password, confirmation }, handleChange, handleSubmit, errors, touched, handleBlur }: { values: any, handleChange: any, handleSubmit: any, errors: any, touched: any, handleBlur: any }) => (
          <React.Fragment>

            {touched.username && errors?.username?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.username}</Text>
            }
            <Input>
              <Field
                component={TextInputCust}
                value={username}
                placeholder="Name..."
                placeholderTextColor="#003f5c"
                error={touched["username"] && errors["username"]?.length > 0}
                onBlur={handleBlur('username')}
                onChangeText={handleChange('username')} />
                
            </Input>

            {touched.email && errors?.email?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            }
            <Input>
              <Field
                component={TextInputCust}
                value={email}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                error={touched["email"] && errors["email"]?.length > 0}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')} />
            </Input>

            {touched.password && errors?.password?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            }
            <Input>
              <Field
                component={TextInputCust}
                value={password}
                secureTextEntry
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                error={touched["password"] && errors["password"]?.length > 0 }
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')} />
            </Input>

            {touched.confirmation && errors?.confirmation?.length &&
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmation}</Text>
            }
            <Input>
              <Field
                component={TextInputCust}
                value={confirmation}
                secureTextEntry
                placeholder="Confirmation..."
                placeholderTextColor="#003f5c"
                error={touched["confirmation"] && errors["confirmation"]?.length > 0}
                onBlur={handleBlur('confirmation')}
                onChangeText={handleChange('confirmation')} />
            </Input>


            {errors?.server &&
              <ErrorText>{errors.server}</ErrorText>
            } 
            <SignUpButton
              onPress={handleSubmit}>
              <SignUpText>SIGN UP</SignUpText>
            </SignUpButton>
          </React.Fragment>
        )}
      </Formik>
      <SignInFrame>
        <Text>{'Already have an acount? '}</Text>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <LoginText> LOGIN</LoginText>
        </TouchableOpacity>
      </SignInFrame>
    </Container>
  );
}

const Header = styled.View`
  margin-bottom: 25px;
  `;
 
const TextInputCust = styled(TextInput)`
  height: 50px;
  background-color: #FFFFFF;
  border: 1px #D3D3D3;
  border-bottom-width: 0px;
  `;

const Container = styled.View`
  flex: 1px;
  background-color: #FFFFFF;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px;
  `;

  const Title = styled.Text`
    font-weight: bold;
    font-size: 50px;
    color: #000000;
    margin-bottom: 40px;
    align-items: flex-start;
  `;

  const Input = styled.View`
    width: 80%;
    background-color: #FFFFFF;
    height: 55px;
    justify-content: center;
  `;

  const SignUpButton = styled.TouchableOpacity`
    width: 80%;
    background-color: #ffb900;
    border-radius: 25px;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 10px;
    `;

const SignInFrame = styled.View`
flex-direction: row;
margin-left: 40px;
`;

const LoginText = styled.Text`
    color: #ffb900;
`;

const SignUpText = styled.Text`
    color: black;
`;

const LoginQuestion = styled.Text`
    flex-direction: row;
`;

const WelcomeText = styled.Text`
    color: #ffb900;
`;

const SignInText = styled.Text`
    color: #ffb900;
`;

const ErrorText = styled.Text`
    color: red;
    fontSize: 15px;
    margin-top: 20px;
`;

export default SignUp;