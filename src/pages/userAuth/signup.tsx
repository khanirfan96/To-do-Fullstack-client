import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Grid, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/todo";
import CustomInput from "../../components/ui/input";

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
}

const SignUp = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const signup = useAuthStore(state => state.signup);
    const isLoading = useAuthStore(state => state.isLoading);
    const [form, setForm] = useState<FormData>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [showErrors, setShowErrors] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    }

    const handleGotoBack = () => {
        navigate("/login");
        setShowErrors(false)
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        setShowErrors(true)

        // Validate form
        if (Object.values(form).some(value => !value)) {
            toast({ title: "Error", description: "Please fill in all required fields", status: "error", duration: 3000, isClosable: true });
            return;
        }

        try {
            await signup(form);
            toast({ title: "Success", description: "Account created successfully! Please login.", status: "success", duration: 3000, isClosable: true });
            // Redirect is handled in the store
        } catch (error: any) {
            toast({ title: "Signup Failed", description: error.message || "Please check your details", status: "error", duration: 3000, isClosable: true });
        }
    }

    const errors = {
        first_name: form.first_name === '',
        last_name: form.last_name === '',
        email: form.email === '',
        password: form.password === '',
        phone: form.phone === ''
    }

    return (
        <div className='bg-[url("../../assets/Hero.png")] h-screen w-full bg-cover flex items-center'>
            <Card width={'50%'} bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(3px)" border="1px solid rgba(255, 255, 255, 0.2)" boxShadow="lg" marginTop={"40"}>
                <CardHeader>
                    <Text color="white" fontSize="xl" fontWeight="semibold">Sign up</Text>
                </CardHeader>
                <CardBody>
                    <Grid templateColumns="repeat(2, 1fr)" gap="6">
                        <CustomInput
                            id="first_name"
                            label="First Name"
                            type="text"
                            value={form.first_name}
                            handleInput={handleInputChange}
                            errorMessage={errors.email ? 'First Name is required' : ''}
                            placeholder="Enter your First Name"
                            showError={showErrors}
                        />
                        <CustomInput
                            type="text"
                            id="last_name"
                            placeholder='Last Name'
                            value={form.last_name}
                            handleInput={handleInputChange}
                            label="Last Name"
                            showError={showErrors}
                            errorMessage={errors.email ? 'Last Name is required' : ''}
                        />
                        <CustomInput
                            type='email'
                            id="email"
                            placeholder='Email'
                            value={form.email}
                            label="Email"
                            handleInput={handleInputChange}
                            showError={showErrors}
                            errorMessage={errors.email ? 'Email is required' : ''}
                        />
                        <CustomInput
                            type='password'
                            id='password'
                            placeholder='Password'
                            value={form.password}
                            label="Password"
                            handleInput={handleInputChange}
                            showError={showErrors}
                            errorMessage={errors.email ? 'Password is required' : ''}
                        />
                        <CustomInput
                            type="text"
                            id="phone"
                            placeholder='Mobile Number'
                            value={form.phone}
                            label="Mobile Number"
                            handleInput={handleInputChange}
                            showError={showErrors}
                            errorMessage={errors.email ? 'Mobile Number is required' : ''}

                        />
                    </Grid>
                </CardBody>
                <CardFooter justifyContent="flex-end" gap={4}>
                    <Button variant="outline" className="mx-2 bg-white text-[black]" onClick={handleGotoBack} >
                        Back
                    </Button>
                    <Button variant="solid" onClick={handleSignUp} isLoading={isLoading} loadingText="Signing up" >
                        Sign Up
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default SignUp;