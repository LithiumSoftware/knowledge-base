import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  Field,
  Formik,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from "formik";
import * as Yup from "yup";

import {
  Container,
  Header,
  Title,
  InputContainer,
  StyledField,
  FormButton,
  Navigation,
  ButtonText,
  Text,
  PrimaryText,
  ErrorText,
  StyledIconButton,
} from "./LogIn";
import { Eye, EyeOff } from "../assets/icons";
import styled from "styled-components/native";

import { useSignupMutation } from "../local_core/generated/graphql";

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

const SignUp = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const [signUpUser, { data }] = useSignupMutation();
  const [hidePw, setHidePw] = useState(true);
  const [hideRptPw, setHideRptPw] = useState(true);

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
      <Header />
      <Title>Sign up</Title>
      <View>
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
            <>
              <InputContainer>
                <StyledField
                  id="username"
                  label="Name"
                  component={TextInput}
                  value={username}
                  placeholder="Name"
                  selectionColor="#ffb900"
                  placeholderTextColor="#003f5c"
                  error={touched.username && errors?.username?.length}
                  onBlur={handleBlur("username")}
                  onChangeText={handleChange("username")}
                />
              </InputContainer>

              <InputContainer>
                <StyledField
                  id="email"
                  label="Email"
                  component={TextInput}
                  value={email}
                  placeholder="Email"
                  selectionColor="#ffb900"
                  placeholderTextColor="#003f5c"
                  error={touched.email && errors?.email?.length}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  keyboardType="email-address"
                />
              </InputContainer>
              <InputContainer>
                <StyledField
                  id="password"
                  label="Password"
                  component={TextInput}
                  value={password}
                  secureTextEntry={hidePw}
                  placeholder="Password"
                  selectionColor="#ffb900"
                  placeholderTextColor="#003f5c"
                  error={touched.password && errors.password?.length}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                />
                <StyledIconButton
                  icon={() => (hidePw ? <EyeOff /> : <Eye />)}
                  onPress={() => setHidePw(!hidePw)}
                />
              </InputContainer>

              <InputContainer style={{ marginBottom: "14%" }}>
                <StyledField
                  id="confirmation"
                  label="Repeat password"
                  component={TextInput}
                  value={confirmation}
                  secureTextEntry={hideRptPw}
                  placeholder="Repeat password"
                  selectionColor="#ffb900"
                  placeholderTextColor="#003f5c"
                  error={touched.confirmation && errors?.confirmation?.length}
                  onBlur={handleBlur("confirmation")}
                  onChangeText={handleChange("confirmation")}
                />
                <StyledIconButton
                  icon={() => (hideRptPw ? <EyeOff /> : <Eye />)}
                  onPress={() => setHideRptPw(!hideRptPw)}
                />
              </InputContainer>

              {errors?.server && <ErrorText>{errors.server}</ErrorText>}
              <FormButton onPress={handleSubmit}>
                <ButtonText>SIGN UP</ButtonText>
              </FormButton>
            </>
          )}
        </Formik>

        <Navigation>
          <Text>Already have an acount?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <PrimaryText>LOGIN</PrimaryText>
          </TouchableOpacity>
        </Navigation>
      </View>
    </Container>
  );
};

export default SignUp;
