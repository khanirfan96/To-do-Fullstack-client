import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Grid, Input, Text } from "@chakra-ui/react"
import { useState,useEffect, useContext } from 'react'
import { AuthContext } from "../../auth/authcontext";

interface FormData {
    // first_name: string;
    // last_name: string;
    email: string;
    password: string;
    // phone: string;
}

const Login = () => {
    const { login } = useContext(AuthContext) || {};
    // const [form, setForm] = useState<FormData>({ first_name: '', last_name: '', email: '', password: '', phone: '' })
    const [form, setForm] = useState<FormData>({ email: '', password: ''})
    const [error, setError] = useState("");

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setForm(prev => ({ ...prev, [id]: value }));
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (login) {
                await login(form);
            }
        } catch (error) {
            setError("Login failed. Please check your credentials.");
        }
    };

    const handleSignUp = () => {
        console.log(form, 'form')
    }

    const errors = {
        // first_name: form.first_name === '',
        // last_name: form.last_name === '',
        email: form.email === '',
        password: form.password === '',
        // phone: form.phone === ''
    }
    return (
        <div className='bg-[url("../../assets/Hero.png")] h-screen w-full bg-cover flex items-center' >
            <Card width={'50%'} bg="rgba(255, 255, 255, 0.1)" backdropFilter="blur(3px)" border="1px solid rgba(255, 255, 255, 0.2)" boxShadow="lg" marginTop={"40"}>
                <CardHeader>
                    <Text color="white" fontSize="xl" fontWeight="semibold">Sign up</Text>
                </CardHeader>
                <CardBody>
                    <Grid templateColumns="repeat(2, 1fr)" gap="6">
                        {/* <FormControl isRequired isInvalid={errors.first_name}>
                            <FormLabel color="white">First Name</FormLabel>
                            <Input
                                type="text"
                                id="first_name"
                                placeholder='First Name'
                                value={form.first_name}
                                onChange={handleInputChange}
                                color={'white'}
                                bg="whiteAlpha.200"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                _placeholder={{ color: "whiteAlpha.500" }} />
                            {errors.first_name && (<FormErrorMessage>Email is required.</FormErrorMessage>)}
                        </FormControl>
                        <FormControl isRequired isInvalid={errors.last_name}>
                            <FormLabel color="white">Last Name</FormLabel>
                            <Input
                                type="text"
                                id="last_name"
                                placeholder='Last Name'
                                value={form.last_name}
                                onChange={handleInputChange}
                                color={'white'}
                                bg="whiteAlpha.200"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                _placeholder={{ color: "whiteAlpha.500" }}
                            />
                            {errors.last_name && (<FormErrorMessage>Last Name is required.</FormErrorMessage>)}
                        </FormControl> */}
                        <FormControl isRequired>
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
                                _placeholder={{ color: "whiteAlpha.500" }} />
                            {errors.password && (<FormErrorMessage>Password is required.</FormErrorMessage>)}
                        </FormControl>
                        {/* <FormControl isRequired isInvalid={errors.phone}>
                            <FormLabel color="white">Phone Number</FormLabel>
                            <Input
                                type="text"
                                id="phone"
                                placeholder='Phone Number'
                                value={form.phone}
                                onChange={handleInputChange}
                                color={'white'}
                                bg="whiteAlpha.200"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                _placeholder={{ color: "whiteAlpha.500" }} />
                            {errors.phone && (<FormErrorMessage>Phone Number is required.</FormErrorMessage>)}
                        </FormControl> */}
                    </Grid>
                </CardBody>
                <CardFooter justifyContent="flex-end" gap={4}>
                    <Button variant="outline" color="white">Cancel</Button>
                    <Button variant="solid" onClick={handleLogin}>Sign up</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login