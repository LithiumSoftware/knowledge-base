import { useMutation } from "@apollo/react-hooks";
import { Field , Formik } from 'formik';
import * as React from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from "yup";
import gql from "graphql-tag";
// import {LOG_IN_MUTATION} from "@workspace-library/core";

const LOG_IN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    logInUser(userInput: { email: $email, password: $password }) {
      id
    }
  }
`;

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email")
        .required("Please enter an email"),
    password: Yup.string().required("Required")
});


export default function SignUp({ navigation }: { navigation: any }) {
    const [logInUser, { data }] = useMutation(LOG_IN_MUTATION);

    const submition = (values: any, { setErrors }: any) => {
        logInUser({
            variables: {
                email: values.email,
                password: values.password
            }
        })
            .then(
                ({
                    data: {
                        logInUser: { id }
                    }
                }) => {
                    navigation.navigate("home")
                }
            )
            .catch(({ graphQLErrors }) => {
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
                <Text style={styles.welcomeText} >{'Welcome to Lithium KB'}</Text>
            </View>
            <Text style={styles.title}>Login</Text>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={submition}
            >
                {({ values: { email, password }, handleChange, handleSubmit, errors, touched, handleBlur, }:
                    { handleSubmit: any, values: any, handleChange: any, errors: any, touched: any, handleBlur: any }) => (
                        <React.Fragment>
                            {errors?.server &&
                                <Text style={{ fontSize: 15, color: 'red' }}>{errors.server}</Text>
                            }   

                            {touched.email && errors?.email?.length &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            <View style={styles.inputView} > 
                       
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                component={TextInput}
                                style={styles.inputText}
                                value={email}
                                placeholder="Email..."
                                placeholderTextColor="#003f5c"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                            />
                             </View> 
                            
                            {touched.password && errors?.password?.length &&
                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                             <View style={styles.inputView} > 

                            <Field
                                id="password"
                                name="password"
                                type="password"
                                component={TextInput}
                                value={password}
                                secureTextEntry
                                style={styles.inputText}
                                placeholder="Password..."
                                placeholderTextColor="#003f5c"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                             </View> 

                            <Text style={styles.signInText} >{'Forgot de password?'}</Text>

                            <TouchableOpacity
                                style={styles.signUpBtn}
                                onPress={handleSubmit}>
                                <Text style={styles.signInText}>SIGN IN</Text>
                            </TouchableOpacity>
                        </React.Fragment> 
                         
                    )}
            </Formik>
            <View style={styles.singUp}>
                <Text>{'Do not have an acount?'}</Text>
                <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }}>
                    <Text style={styles.signUpText}> SIGN UP</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

function authenticate({ user, password }: { user: string, password: string }) {

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
    welcomeText: {
        color: "#ffb900"
    },
    signUpText: {
        color: "#ffb900"
    },
    signInText: {
        color: "black"
    },
    singUp: {
        flexDirection: 'row',
    },
    logo: {
        width: 50,
        height: 50,
    },
});