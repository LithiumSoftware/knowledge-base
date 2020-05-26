import React, { useState } from "react";
import {
  AsyncStorage,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  Text as ReactText,
} from "react-native";
import { TextInput, IconButton, HelperText } from "react-native-paper";
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

const LogIn = ({
  navigation,
  route: {
    params: { setUser },
  },
}: Props) => {
  const [logInUser, { data }] = useLoginMutation();
  const [hidePw, setHidePw] = useState(true);

  const submition = (
    values: FormikValues,
    { setSubmitting, setErrors }: SubmitionProps
  ) => {
    logInUser({
      variables: {
        identifier: values.email,
        password: values.password,
      },
    })
      .then(
        ({
          data: {
            loggedUser: { id },
          },
        }) => {
          if (id) {
            AsyncStorage.setItem("logged_in", id).then(() => setUser(true));
          }
        }
      )
      .catch((err) => {
        if (err.message.includes("email")) {
          setErrors({
            email: err?.graphQLErrors?.map((x) => x.message),
          });
        } else {
          setErrors({
            password: err?.graphQLErrors?.map((x) => x.message),
          });
        }
        setSubmitting(false);
      });
  };

  return (
    <Container
      contentContainerStyle={{
        backgroundColor: "#ffffff",
        paddingTop: 50,
        paddingRight: 30,
        paddingBottom: 275,
        paddingLeft: 30,
      }}
    >
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
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }: FormikProps) => (
            <>
              <View
                style={{
                  height: Dimensions.get("window").height - 350,
                }}
              >
                <InputContainer>
                  <TextInput
                    label="Name or email"
                    placeholder="Name or email"
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
              </View>
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
  const WelcomeText = styled.Text`
    color: #ffb900;
    font-size: 17px;
    font-weight: bold;
  `;

  return (
    <View>
      <Image
        style={{ marginBottom: "5%", width: 115, height: 38 }}
        source={require("../assets/lithium-logo.png")}
      />
      <WelcomeText>{"Welcome to Lithium KB."}</WelcomeText>
    </View>
  );
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Please enter a username or email"),
  password: Yup.string().required("Please enter the password"),
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
  route: any;
}

export const Container = styled.ScrollView`
  flex: 1;
`;

export const Title = styled.Text`
  padding-top: 30px;
  padding-bottom: 25px;
  font-weight: bold;
  font-size: 46px;
  color: #000;
  align-items: flex-start;
`;

export const InputContainer = styled.View`
  background-color: #fff;
  flex-wrap: nowrap;
  padding-bottom: 5px;
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
  align-items: center;
  padding-top: 20px;
  padding-bottom: 5px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-weight: 700;
`;

export const Text = styled(ReactText)`
  color: black;
`;

export const PrimaryText = styled.Text`
  color: #ffb900;
  margin-left: 10px;
`;

export const FormButton = styled.TouchableOpacity`
  width: 100%;
  background-color: #ffb900;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 15px;
  margin-top: 20px;
`;

interface SubmitionProps {
  setSubmitting: (isSubmitting: boolean) => void;
  setErrors: (errors: FormikErrors<FormikValues>) => void;
}

export default LogIn;
