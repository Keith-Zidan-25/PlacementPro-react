import axios from "axios";
import Swal from "sweetalert2";
import { z, ZodError } from "zod";
import React, { useState } from "react";
import p2 from '../assets/images/p1.png';
import { useNavigate } from "react-router-dom";
import * as Components from '../components/Components';
import LoadingScreen from "../components/LoadingScreen";

axios.defaults.withCredentials = true;

const signUpSchema = z.object({
    username: z.string().min(1, "Username can't be empty"),
    email: z.string().min(1, "Email can't be empty").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const signInSchema = z.object({
    username: z.string().min(1, "Username can't be empty"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const codeSchema = z.object({
    code: z.string().min(6, "OTP length is too small").regex(/^\d+$/, 'OTP should only consist of numbers')
});

export default function App() {
    const [signIn, toggle] = useState(true);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [verify, setVerifyStatus] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const data = {
            username: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            signUpSchema.parse(data);
            setErrors({});

            const response = await axios.post('http://localhost:3020/api/auth/signup', data);

            if (response.status === 200) {
                setLoading(false);
                Swal.fire(response.data.success, 'The verification code is sent to your Email', 'success');

                setVerifyStatus(true);
            }
        } catch (err) {

            if (err instanceof z.ZodError) {
                const formattedErrors = {};
                err.errors.forEach((e) => {
                    formattedErrors[e.path[0]] = e.message;
                });
                setErrors(formattedErrors);
            } else {
                console.error("Error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const data = {
            username: formData.get('name'),
            password: formData.get('password'),
        };

        try {
            signInSchema.parse(data);
            setErrors({});

            const response = await axios.post('http://localhost:3020/api/auth/signin', data);

            if (response.status === 200) {
                navigate(response.data.redirect);
            } else {
                setLoading(false);
                Swal.fire('Some Error Occurred', response.data.error, 'error');
            }
        } catch (err) {

            if (err instanceof z.ZodError) {
                const formattedErrors = {};
                err.errors.forEach((e) => {
                    formattedErrors[e.path[0]] = e.message;
                });
                setErrors(formattedErrors);
            } else {
                console.error("Error:", err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (event) => {
        console.log('Verification Started....');
        event.preventDefault();
        setLoading(true);
    
        const formData = new FormData(event.target);
        const codeData = { code: formData.get('code') };
    
        try {
            codeSchema.parse(codeData);
            setErrors({});
    
            const response = await axios.post('http://localhost:3020/api/auth/verify', codeData);
    
            if (response.status === 200) {
                Swal.fire(response.data.success, 'Welcome to PlacementPro!!', 'success')
                    .then(() => {
                        navigate(response.data.redirect);
                    })
                    .catch(() => setLoading(false));
            } else {
                setLoading(false);
                Swal.fire('An Error Occured', response.data.error, 'error');
            }
        } catch (err) {
            if (err instanceof ZodError) {
                const formattedErrors = {};
                err.errors.forEach((e) => {
                    formattedErrors[e.path[0]] = e.message;
                });
                setErrors(formattedErrors);
            } else {
                console.error("Error", err);
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <>
            {loading && (
                <div className="min-h-screen w-screen absolute inset-0 flex items-center justify-center bg-purple-700 z-20">
                    <LoadingScreen />
                </div>
            )}

            <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: `url(${p2})` }}>
                <div className="backdrop-blur-sm bg-white/30 p-20 rounded-md">
                    
                        {!verify && (
                            <Components.Container>
                                <Components.SignUpContainer signinIn={signIn}>
                                    <Components.Form onSubmit={handleSignUp}>
                                        <Components.Title>Create Account</Components.Title>
                                        <Components.Input type="text" name="name" placeholder="Name" />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

                                        <Components.Input type="email" name="email" placeholder="Email" />
                                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                                        <Components.Input type="password" name="password" placeholder="Password" />
                                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

                                        <Components.Button type="submit">Sign Up</Components.Button>
                                    </Components.Form>
                                </Components.SignUpContainer>

                                <Components.SignInContainer signinIn={signIn}>
                                    <Components.Form onSubmit={handleSignIn}>
                                        <Components.Title>Sign in</Components.Title>
                                        <Components.Input type="text" name="name" placeholder="Name" />
                                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}

                                        <Components.Input type="password" name="password" placeholder="Password" />
                                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

                                        <Components.Anchor href="#">Forgot your password?</Components.Anchor>
                                        <Components.Button type="submit">Sign In</Components.Button>
                                    </Components.Form>
                                </Components.SignInContainer>

                                <Components.OverlayContainer signinIn={signIn}>
                                    <Components.Overlay signinIn={signIn}>
                                        <Components.LeftOverlayPanel signinIn={signIn}>
                                            <Components.Title>Welcome Back!</Components.Title>
                                            <Components.Paragraph>
                                                To keep connected with us please login with your personal info.
                                            </Components.Paragraph>
                                            <Components.GhostButton onClick={() => toggle(true)}>
                                                Sign In
                                            </Components.GhostButton>
                                        </Components.LeftOverlayPanel>

                                        <Components.RightOverlayPanel signinIn={signIn}>
                                            <Components.Title>Hello, Friend!</Components.Title>
                                            <Components.Paragraph>
                                                Enter your personal details and start your journey with us.
                                            </Components.Paragraph>
                                            <Components.GhostButton onClick={() => toggle(false)}>
                                                Sign Up
                                            </Components.GhostButton>
                                        </Components.RightOverlayPanel>
                                    </Components.Overlay>
                                </Components.OverlayContainer>
                            </Components.Container>
                        )}

                        {verify && (
                            <Components.Container>
                                <Components.Form onSubmit={handleVerification}>
                                    <Components.Title>OTP Verification</Components.Title>
                                    <Components.Input type="text" name="code" placeholder="Enter OTP" />
                                    {errors.code && <span className="text-red-500 text-sm">{errors.code}</span>}

                                    <Components.Anchor href="#">Resend OTP</Components.Anchor>
                                    <Components.Button type="submit">Verify</Components.Button>
                                </Components.Form>
                            </Components.Container>
                        )}
                    
                </div>
            </div>
        </>
    );
}