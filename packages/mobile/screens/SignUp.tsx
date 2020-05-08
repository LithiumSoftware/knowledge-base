import React, { useState } from "react";
import {
  AsyncStorage,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { TextInput, HelperText } from "react-native-paper";
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
  FormikProps,
  Props,
} from "./LogIn";
import { Eye, EyeOff } from "../assets/icons";
import { useSignupMutation } from "../local_core/generated/graphql";

const SignUp = ({
  navigation,
  route: {
    params: { setUser },
  },
}: Props) => {
  const [signUpUser, { data }] = useSignupMutation();
  const [hidePw, setHidePw] = useState(true);
  const [hideRptPw, setHideRptPw] = useState(true);

  const submition = (
    values: FormikValues,
    { setSubmitting, setErrors }: SubmitionProps
  ) => {
    signUpUser({
      variables: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
    })
      .then(
        ({
          data: {
            signedUser: { id },
          },
        }) => {
          if (id) {
            AsyncStorage.setItem("logged_in", id).then(() => setUser(true));
          }
        }
      )
      .catch((err) => {
        if (err.message.includes("Both")) {
          setErrors({
            username: "Username is already in use.",
            email: "Email address is already in use.",
          });
        } else {
          if (err.message.includes("Username")) {
            setErrors({
              username: err?.graphQLErrors?.map((x) => x.message),
            });
          } else {
            setErrors({
              email: err?.graphQLErrors?.map((x) => x.message),
            });
          }
        }
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
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }: FormikProps) => (
            <>
              <View
                style={{
                  height: Dimensions.get("window").height * 0.52,
                }}
              >
                <InputContainer>
                  <TextInput
                    label="Name"
                    placeholder="Name"
                    selectionColor="#ffb900"
                    value={username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                  />
                  <HelperText type="error" visible={true}>
                    {touched.username && errors?.username
                      ? errors?.username
                      : ""}
                  </HelperText>
                </InputContainer>
                <InputContainer>
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    selectionColor="#ffb900"
                    value={email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    keyboardType="email-address"
                  />
                  <HelperText type="error" visible={true}>
                    {touched.email && errors?.email ? errors?.email : ""}
                  </HelperText>
                </InputContainer>
                <InputContainer>
                  <TextInput
                    label="Password"
                    placeholder="Password"
                    selectionColor="#ffb900"
                    secureTextEntry={hidePw}
                    value={password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <HelperText type="error" visible={true}>
                    {touched.password && errors?.password
                      ? errors?.password
                      : ""}
                  </HelperText>
                  <StyledIconButton
                    icon={() => (hidePw ? <EyeOff /> : <Eye />)}
                    onPress={() => setHidePw(!hidePw)}
                  />
                </InputContainer>
                <InputContainer style={{ marginBottom: "14%" }}>
                  <TextInput
                    label="Repeat password"
                    placeholder="Repeat password"
                    selectionColor="#ffb900"
                    secureTextEntry={hidePw}
                    value={confirmation}
                    onChangeText={handleChange("confirmation")}
                    onBlur={handleBlur("confirmation")}
                  />
                  <HelperText type="error" visible={true}>
                    {touched.confirmation && errors?.confirmation
                      ? errors?.confirmation
                      : ""}
                  </HelperText>
                  <StyledIconButton
                    icon={() => (hidePw ? <EyeOff /> : <Eye />)}
                    onPress={() => setHidePw(!hidePw)}
                  />
                </InputContainer>
              </View>
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

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please enter your name")
    .min(4, "Name is too short")
    .max(12, "Thats a long name you have there"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string()
    .required("Please enter the password")
    .min(8, "Password is too short"),
  confirmation: Yup.string()
    .required("Please enter the password confirmation")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

interface SubmitionProps {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: FormikErrors<FormikValues>) => void;
}

export default SignUp;
