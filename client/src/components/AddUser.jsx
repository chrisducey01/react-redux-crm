import React from 'react';
import { Container, FormGroup, FormLabel, Button, Col, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';

// Adding to yup schema to compare fields (i.e. passwords match)
function equalTo(ref, msg) {
    return this.test({
        name: 'equalTo',
        exclusive: false,
        message: msg || 'Values must be the same',
        params: {
            reference: ref.path
        },
        test: function (value) {
            return value === this.resolve(ref)
        }
    })
};
Yup.addMethod(Yup.string, 'equalTo', equalTo);

// Define yup schema for how to validate form fields
const addUserSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First name is required"),
    lastName: Yup.string()
        .required("Last name is required"),
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string()
        .required("Password is required"),
    confirmPassword: Yup.string()
        .required("Password is required")
        .equalTo(Yup.ref('password'), "Passwords must match")
});

function AddUser() {
    const handleSubmit = (values, actions) => {
        const { firstName, lastName, username, password, role } = values;
        const { setSubmitting, resetForm } = actions;

        axios.post('/auth/signup', {
            firstName,
            lastName,
            username,
            password,
            role
        })
            .then(res => {
                setSubmitting(false);
                alert("User added to db");
                resetForm();
            })
    }

    return (
        <Container>
            <hr />
            <h3>Add New User</h3>
            <hr />
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                    role: "user"
                }}
                validationSchema={addUserSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormGroup as={Row} controlId="formGroupFirstName">
                            <FormLabel column sm="2">First Name</FormLabel>
                            <Col sm="6">
                                <Field type="text" placeholder="First Name" name="firstName"
                                    className={`form-control ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage name="firstName" className="invalid-feedback" />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row} controlId="formGroupLastName">
                            <FormLabel column sm="2">Last Name</FormLabel>
                            <Col sm="6">
                                <Field type="text" placeholder="Last Name" name="lastName"
                                    className={`form-control ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage name="lastName" className="invalid-feedback" />
                            </Col>
                        </FormGroup>
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
                        <FormGroup as={Row} controlId="formGroupConfirmPassword">
                            <FormLabel column sm="2">Confirm Password</FormLabel>
                            <Col sm="6">
                                <Field type="password" placeholder="Confirm Password" name="confirmPassword"
                                    className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""}`}
                                />
                                <ErrorMessage name="confirmPassword" className="invalid-feedback" />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row} controlId="formGroupRole">
                            <FormLabel column sm="2">Role</FormLabel>
                            <Col sm="6">
                                <Field as="select" name="role" >
                                    <option>user</option>
                                    <option>admin</option>
                                </Field>
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

export default AddUser;