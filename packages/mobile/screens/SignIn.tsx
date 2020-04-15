import { useMutation } from "@apollo/react-hooks";
import { Field, Formik } from 'formik';
import gql from "graphql-tag";
import * as React from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from "react-native-paper";
import styled from 'styled-components/native';
import * as Yup from "yup";
import {useLoginMutation} from '../local_core/generated/graphql';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter an email"),
    password: Yup.string().required("Required")
});

// const [loginMutation, { data, loading, error }] = useLoginMutation({
//     *   variables: {
//     *      identifier: // value for 'identifier'
//     *      password: // value for 'password'
//     *   },
//     * });

export default function SignUp({ navigation }: { navigation: any }) {
    const [logInUser, { data }] = useLoginMutation();

    const submition = (values: any, { setErrors }: any) => {
        logInUser({
            variables: {
                identifier: values.email,
                password: values.password
            }
        })
            .then(
                ({
                    data
                }) => {
                    if (data?.loggedUser?.id) {
                        navigation.navigate("HomeScreen");
                    }
                }
            )
            .catch(({ Errors, graphQLErrors }) => {
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
            <Title>Login</Title>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={submition}
            >
                {({ values: { email, password }, handleChange, handleSubmit, errors, touched, handleBlur, }:
                    { handleSubmit: any, values: any, handleChange: any, errors: any, touched: any, handleBlur: any }) => (
                        <React.Fragment>

                            {touched.email && errors?.email?.length &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            <Input>

                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    component={TextInputCust}
                                    value={email}
                                    placeholder="Email..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleChange('email')}
                                    error={touched["email"] && errors["email"]?.length > 0}
                                    onBlur={handleBlur('email')}
                                />
                            </Input>

                            {touched.password && errors?.password?.length &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            <Input >

                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    component={TextInputCust}
                                    value={password}
                                    secureTextEntry
                                    placeholder="Password..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleChange('password')}
                                    error={touched["password"] && errors["password"]?.length > 0}
                                    onBlur={handleBlur('password')}
                                />
                            </Input>

                            <ForgotText >{'Forgot de password?'}</ForgotText>

                            {errors?.server &&
                                <ErrorText>{errors.server}</ErrorText>
                            } 
                            <SignInButton
                                onPress={handleSubmit}>
                                <SignInText>SIGN IN</SignInText>
                            </SignInButton>
                        </React.Fragment>


                    )}
            </Formik>
            <SignUpFrame>
                <Text>{'Do not have an acount?'}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
                    <SignUpText> SIGN UP</SignUpText>
                </TouchableOpacity>
            </SignUpFrame>

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

const SignInButton = styled.TouchableOpacity`
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
    margin-left: 30px;
    `;

const LoginText = styled.Text`
    color: #ffb900
`;

const SignInText = styled.Text`
    color: black
`;

const ForgotText = styled.Text`
    margin-top: 10px;
    color: black;
    font-size: 10px;

`;

const WelcomeText = styled.Text`
    color: #ffb900
`;

const SignUpText = styled.Text`
    color: #ffb900
`;

const ErrorText = styled.Text`
    color: red;
    fontSize: 15px;
    margin-top: 20px;
`;
