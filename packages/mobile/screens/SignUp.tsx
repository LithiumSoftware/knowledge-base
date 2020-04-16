import {
  Field,
  Formik,
  FormikValues,
  FormikErrors,
  FormikTouched,
} from "formik";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";
import * as Yup from "yup";
import { useSignupMutation } from "../local_core/generated/graphql";
import { StackNavigationProp } from '@react-navigation/stack';

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
    .oneOf([Yup.ref("password")], "Password does not match"),
});

const SignUp = ({navigation} : { navigation: StackNavigationProp<any> }) => {
  const [signUpUser, { data }] = useSignupMutation();

  const submition = (
    values: FormikValues,
    { setErrors }: { setErrors: (errors: FormikErrors<FormikValues>) => void }
  ) => {
    signUpUser({
      variables: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    })
      .then(({ data }) => {
        if (data?.signedUser?.id) {
          navigation.navigate("HomeScreen");
        }
      })
      .catch(({ Errors, graphQLErrors }) => {
        const error = graphQLErrors?.map((err: any) => err?.message);
        setErrors({ server: error[0] });
      });
  };

  return (
    <Container>
      <Header>
        <Image
          resizeMode={"cover"}
          source={require("../assets/logo-lithium.png")}
        />
        <WelcomeText>Welcome to Lithium KB</WelcomeText>
      </Header>
      <Title>Sign up</Title>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmation: "",
        }}
        validationSchema={signupSchema}
        onSubmit={submition}
      >
        {({
          values: { username, email, password, confirmation },
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        }: {
          values: FormikValues;
          handleChange: (f: string) => void;
          handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
          errors: FormikErrors<FormikValues>;
          touched: FormikTouched<FormikValues>;
          handleBlur: (f: string) => void;
        }) => (
          <React.Fragment>
            {touched.username && errors?.username?.length && (
              <ErrorTextFields>{errors.username}</ErrorTextFields>
            )}
            <Input>
              <Field
                component={TextInputCust}
                value={username}
                placeholder="Name..."
                placeholderTextColor="#003f5c"
                error={touched.username && errors?.username?.length}
                onBlur={handleBlur("username")}
                onChangeText={handleChange("username")}
              />
            </Input>

            {touched.email && errors?.email?.length && (
              <ErrorTextFields>{errors.email}</ErrorTextFields>
            )}
            <Input>
              <Field
                component={TextInputCust}
                value={email}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                error={touched.email && errors?.email?.length}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
              />
            </Input>

            {touched.password && errors?.password?.length && (
              <ErrorTextFields>{errors.password}</ErrorTextFields>
            )}
            <Input>
              <Field
                component={TextInputCust}
                value={password}
                secureTextEntry
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                error={touched.password && errors.password?.length}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
              />
            </Input>

            {touched.confirmation && errors?.confirmation?.length && (
              <ErrorTextFields>{errors.confirmation}</ErrorTextFields>
            )}
            <Input>
              <Field
                component={TextInputCust}
                value={confirmation}
                secureTextEntry
                placeholder="Confirmation..."
                placeholderTextColor="#003f5c"
                error={touched.confirmation && errors?.confirmation?.length}
                onBlur={handleBlur("confirmation")}
                onChangeText={handleChange("confirmation")}
              />
            </Input>

            {errors?.server && <ErrorText>{errors.server}</ErrorText>}
            <SignUpButton onPress={handleSubmit}>
              <SignUpText>SIGN UP</SignUpText>
            </SignUpButton>
          </React.Fragment>
        )}
      </Formik>
      <LoginFrame>
        <LoginQuestion>Already have an acount?</LoginQuestion>

        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <LoginText> LOGIN</LoginText>
        </TouchableOpacity>
      </LoginFrame>
    </Container>
  );
};

const Header = styled.View`
  margin-bottom: 25px;
`;

const TextInputCust = styled(TextInput)`
  height: 50px;
  background-color: #ffffff;
  border: 1px #d3d3d3;
  border-bottom-width: 0px;
`;

const Container = styled.View`
  flex: 1px;
  background-color: #ffffff;
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
  background-color: #ffffff;
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

const LoginFrame = styled.View`
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
  fontsize: 15px;
  margin-top: 20px;
`;

const ErrorTextFields = styled.Text`
  color: red;
  fontsize: 10px;
`;

export default SignUp;
