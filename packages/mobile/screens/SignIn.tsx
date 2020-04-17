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
import { useLoginMutation } from "../local_core/generated/graphql";
import { StackNavigationProp } from "@react-navigation/stack";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required"),
});

export default function SignUp({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const [logInUser, { data }] = useLoginMutation();

  const submition = (
    values: FormikValues,
    { setErrors }: { setErrors: (errors: FormikErrors<FormikValues>) => void }
  ) => {
    logInUser({
      variables: {
        identifier: values.email,
        password: values.password,
      },
    })
      .then(({ data }) => {
        if (data?.loggedUser?.id) {
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
        <WelcomeText>{"Welcome to Lithium KB"}</WelcomeText>
      </Header>
      <Title>Login</Title>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={submition}
      >
        {({
          values: { email, password },
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
        }: {
          handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
          values: FormikValues;
          handleChange: (f: string) => void;
          errors: FormikErrors<FormikValues>;
          touched: FormikTouched<FormikValues>;
          handleBlur: (f: string) => void;
        }) => (
          <React.Fragment>
            <InputContainer>
              <Field
                id="email"
                name="email"
                label="Email"
                component={TextInput}
                value={email}
                placeholder="Email..."
                placeholderTextColor="#003f5c"
                onChangeText={handleChange("email")}
                error={touched.email && errors?.email?.length}
                onBlur={handleBlur("email")}
                mode="outlined"
              />
            </InputContainer>

            <InputContainer>
              <Field
                id="password"
                name="password"
                label="Password"
                component={TextInput}
                value={password}
                secureTextEntry
                placeholder="Password..."
                placeholderTextColor="#003f5c"
                onChangeText={handleChange("password")}
                error={touched.password && errors?.password?.length}
                onBlur={handleBlur("password")}
                mode="outlined"
              />
            </InputContainer>

            <ForgotText>Forgot de password?</ForgotText>

            {errors?.server && <ErrorText>{errors.server}</ErrorText>}
            <LoginButton onPress={handleSubmit}>
              <LoginText>LOGIN</LoginText>
            </LoginButton>
          </React.Fragment>
        )}
      </Formik>
      <SignUpFrame>
        <Text>Do not have an acount?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <SignUpText> SIGN UP</SignUpText>
        </TouchableOpacity>
      </SignUpFrame>
    </Container>
  );
}

const Header = styled.View`
  margin-bottom: 25px;
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

const InputContainer = styled.View`
  width: 80%;
  background-color: #ffffff;
  height: 65px; 
  justify-content: center;
`;

const LoginButton = styled.TouchableOpacity`
  width: 80%;
  background-color: #ffb900;
  border-radius: 25px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const SignUpFrame = styled.View`
    flex-direction: row
    margin-top: 20px;
    margin-left: 30px;
    `;

const LoginText = styled.Text`
  color: black;
`;

const Text = styled.Text`
  color: black;
`;

const ForgotText = styled.Text`
  margin-top: 10px;
  color: black;
  font-size: 10px;
`;

const WelcomeText = styled.Text`
  color: #ffb900;
  fontSize: 17px;
`;

const SignUpText = styled.Text`
  color: #ffb900;
`;

const ErrorText = styled.Text`
  color: red;
  fontSize: 15px;
  margin-top: 20px;
`;
