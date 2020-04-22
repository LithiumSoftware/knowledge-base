import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  Field,
  Formik,
  FormikValues,
  FormikErrors,
  FormikTouched,
} from "formik";
import * as Yup from "yup";

import styled from "styled-components/native";
import { Eye, EyeOff } from "../assets/icons";

import { useLoginMutation } from "../local_core/generated/graphql";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: Yup.string().required("Required"),
});

export interface FormikProps {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  values: FormikValues;
  handleChange: (f: string) => void;
  errors: FormikErrors<FormikValues>;
  touched: FormikTouched<FormikValues>;
  handleBlur: (f: string) => void;
}

export interface Props {
  navigation: StackNavigationProp<any>;
}

const LogIn = ({ navigation }: Props) => {
  const [logInUser, { data }] = useLoginMutation();
  const [hidePw, setHidePw] = useState(true);

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
          console.log("Add session management");
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
      <Title>Login</Title>
      <View>
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
          }: FormikProps) => (
            <>
              <InputContainer>
                <StyledField
                  id="email"
                  name="email"
                  label="Name"
                  component={TextInput}
                  value={email}
                  placeholder="Name"
                  selectionColor="#ffb900"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange("email")}
                  error={touched.email && errors?.email?.length}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                />
              </InputContainer>

              <InputContainer>
                <StyledField
                  id="password"
                  name="password"
                  label="Password"
                  component={TextInput}
                  value={password}
                  secureTextEntry={hidePw}
                  placeholder="Password"
                  selectionColor="#ffb900"
                  placeholderTextColor="#003f5c"
                  onChangeText={handleChange("password")}
                  error={touched.password && errors?.password?.length}
                  onBlur={handleBlur("password")}
                />
                <StyledIconButton
                  icon={() => (hidePw ? <EyeOff /> : <Eye />)}
                  onPress={() => setHidePw(!hidePw)}
                />
              </InputContainer>

              <ForgotText>Forgot password?</ForgotText>

              {errors?.server && <ErrorText>{errors.server}</ErrorText>}
              <FormButton onPress={handleSubmit}>
                <ButtonText>LOGIN</ButtonText>
              </FormButton>
            </>
          )}
        </Formik>
        <Navigation>
          <Text>Don't have an acount?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <PrimaryText>SIGN UP</PrimaryText>
          </TouchableOpacity>
        </Navigation>
      </View>
    </Container>
  );
};

export const Header = () => {
  const StyledImage = styled(Image)`
    margin-bottom: 3%;
  `;

  const WelcomeText = styled.Text`
    color: #ffb900;
    font-size: 17px;
    font-weight: bold;
  `;

  return (
    <View>
      <StyledImage
        resizeMode={"contain"}
        source={require("../assets/logo-lithium.png")}
      />
      <WelcomeText>{"Welcome to Lithium KB"}</WelcomeText>
    </View>
  );
};

export default LogIn;

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: space-between;
  padding: 50px 30px 30px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 50px;
  color: #000;
  align-items: flex-start;
`;

export const InputContainer = styled.View`
  background-color: #fff;
  height: 65px;
  margin: 6px 0px;
  flex-wrap: nowrap;
`;

export const StyledField = styled(Field)`
  background-color: #e8e8e8;
  flex-grow: 1;
  position: relative;
`;

export const StyledIconButton = styled(IconButton)`
  align-self: flex-end;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const Navigation = styled.View`
  flex-direction: row
  justify-content: center;
  width: 100%;
  margin-top: 5%;
`;

export const ButtonText = styled.Text`
  color: black;
  font-weight: 700;
`;

export const Text = styled.Text`
  color: black;
`;

const ForgotText = styled.Text`
  margin-left: 4%;
  margin-top: 3%;
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 46%;
`;

export const PrimaryText = styled.Text`
  color: #ffb900;
  margin-left: 10px;
`;

export const FormButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #ffb900;
  border-radius: 25px;
  height: 50px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  display: flex;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 15px;
  margin-top: 20px;
`;
