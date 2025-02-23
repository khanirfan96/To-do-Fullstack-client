import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Grid, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/todo";

interface FormData {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const login = useAuthStore(state => state.login);
    const isLoading = useAuthStore(state => state.isLoading);
    const [form, setForm] = useState<FormData>({ email: '', password: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form
        if (!form.email || !form.password) {
            toast({ title: "Error", description: "Please fill in all required fields", status: "error", duration: 3000, isClosable: true });
            return;
        }

        try {
            await login(form);
            // Redirect is handled in the store
        } catch (error: any) {
            toast({ title: "Login Failed", description: error.message || "Please check your credentials", status: "error", duration: 3000, isClosable: true });
        }
    };

    const handleSignUp = () => {
        navigate('/signup');
    }

    const handleCancel = () => {
        setForm({ email: '', password: '' });
    }

    const errors = {
        email: form.email === '',
        password: form.password === '',
    }

    return (
        <div className='bg-[url("../../assets/Hero.png")] h-screen w-full bg-cover flex items-center'>
            <Card width={'50%'} bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(3px)" border="1px solid rgba(255, 255, 255, 0.2)" boxShadow="lg" marginTop={"40"}>
                <CardHeader>
                    <Text color="white" fontSize="xl" fontWeight="semibold">Login</Text>
                </CardHeader>
                <CardBody>
                    <Grid templateColumns="repeat(2, 1fr)" gap="6">
                        <FormControl isRequired isInvalid={errors.email}>
                            <FormLabel color="white">Email</FormLabel>
                            <Input
                                type='email'
                                id="email"
                                placeholder='Email'
                                value={form.email}
                                onChange={handleInputChange}
                                color={'white'}
                                bg="whiteAlpha.200"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                _placeholder={{ color: "whiteAlpha.500" }}
                            />
                            {errors.email && (<FormErrorMessage>Email is required.</FormErrorMessage>)}
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.password}>
                            <FormLabel color="white">Password</FormLabel>
                            <Input
                                type='password'
                                id='password'
                                placeholder='Password'
                                value={form.password}
                                onChange={handleInputChange}
                                color={'white'}
                                bg="whiteAlpha.200"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                _placeholder={{ color: "whiteAlpha.500" }}
                            />
                            {errors.password && (<FormErrorMessage>Password is required.</FormErrorMessage>)}
                        </FormControl>
                    </Grid>
                    <Text className="flex flex-row justify-end items-center p-3 text-lg" color={"white"}>
                        New to Health Cart!
                        <Button variant="outline" className="mx-2 bg-white text-black" onClick={handleSignUp}>
                            Sign Up
                        </Button>
                    </Text>
                </CardBody>
                <CardFooter justifyContent="flex-end">
                    <Button 
                        variant="outline" 
                        className="text-black bg-white px-2 mx-3" 
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="solid" 
                        onClick={handleLogin} 
                        // isLoading={isLoading}
                        // loadingText="Logging in"
                    >
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login;