import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, FormGroup, FormLabel, Button, Col, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin, userLogout } from '../store/user';


// Define yup schema for how to validate form fields
const loginUserSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string()
        .required("Password is required")
});

function LoginUser() {
    const loggedIn = useSelector(state => state.user.loggedIn);
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        const { username, password } = values;
        const { setSubmitting, resetForm } = actions;

        axios.post('/auth/login', {
            username,
            password
        })
            .then(res => {
                setSubmitting(false);
                // alert("Logged In");
                resetForm();
                console.log(res.data)
                dispatch(userLogin(res.data.user));
            })
            .catch(err=>{
                setSubmitting(false);
                resetForm();
                dispatch(userLogout())
            })
    };


    return (
        <Container>
            {loggedIn ? <Redirect to="/" /> : null}
            <hr />
            <h3>Login User</h3>
            <hr />
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                validationSchema={loginUserSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormGroup as={Row} controlId="formGroupUsername">
                            <FormLabel column sm="2">Username</FormLabel>
                            <Col sm="6">
                                <Field type="text" placeholder="Username" name="username"
                                    className={`form-control ${touched.username && errors.username ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage name="username" className="invalid-feedback" />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row} controlId="formGroupPassword">
                            <FormLabel column sm="2">Password</FormLabel>
                            <Col sm="6">
                                <Field type="password" placeholder="Password" name="password"
                                    className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage name="password" className="invalid-feedback" />
                            </Col>
                        </FormGroup>
                        <Row>
                            <Col sm={{ span: 8, offset: 2 }}>
                                <Button variant="success" type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default LoginUser;