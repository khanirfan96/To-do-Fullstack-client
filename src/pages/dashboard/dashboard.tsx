import React, { useState } from 'react'
import Navbar from '../navbar'
import { Card, CardBody, CardHeader, Grid, GridItem, Box, Text, Stack, Image } from '@chakra-ui/react';
import { Pie, PieChart } from 'recharts';

const Dashboard = () => {
    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    return (
        <div className='min-h-screen w-full bg-white'>
            <Navbar />
            <Box p={8} className='bg-gray-100 shadow-sm rounded-lg'>
                <Grid templateColumns="repeat(3, 1fr)" gap={8} className='p-8'>
                    <GridItem className='flex flex-col'>
                        <Card className='h-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
                            <Box className='flex flex-row justify-between items-center px-2'>
                                <CardHeader className='text-lg font-semibold text-gray-800'>To-Do List</CardHeader>
                                <Image src="../../../assets/Todo.png" className='w-10 h-10' />
                            </Box>
                            <CardBody>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Total Todo's : </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Active Todo's: </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Inactive Todo's: </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Deleted Todo's: </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem className='flex flex-col'>
                        <Card className='h-full bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
                            <Box className='flex flex-row justify-between items-center px-2'>
                                <CardHeader className='text-lg font-semibold text-gray-800'>Calorie Tracker</CardHeader>
                                <Image src="../../../assets/Calorie.png" className='w-10 h-15' />
                            </Box>
                            <CardBody>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Total Calories : </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Changed Ingredients: </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Changed Dish: </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                                <Box className='flex flex-row text-center items-center px-2'>
                                    <Text className='text-sm font-medium text-gray-700'>Deleted Dish: </Text>
                                    <Text className='text-xs px-2 text-gray-600'>20</Text>
                                </Box>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem className='flex flex-col'>
                        <Card height="full">
                            <Box className='flex flex-row justify-between items-center px-2'>
                                <CardHeader className='text-lg font-semibold text-gray-800'>Total Users</CardHeader>
                                <Image src="../../../assets/Users.png" className='w-10 h-15' />
                            </Box>
                            <CardBody className='flex flex-row justify-center items-center'>
                                <PieChart width={400} height={250} className='m-auto'>
                                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" label />
                                </PieChart>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
                <Grid templateColumns="3fr 4fr" gap={5} mt={5}>
                    <GridItem className='flex flex-col'>
                        <Card height="full">
                            <Box className='flex flex-row justify-between items-center px-2'>
                                <CardHeader className='text-lg font-semibold text-gray-800'>Health Cart</CardHeader>
                                <Image src="../../../assets/Cart.png" className='w-10 h-15' />
                            </Box>
                            <CardBody>
                               <Text className='text-xl px-2'>Health Cart is a revolutionary full-stack platform that aggregates the best online essentials delivery services in India, including Zepto, Blinkit, Instamart, and Minutes, all in one place. With our powerful search bar, users can instantly find their desired products across these top apps, compare prices, and easily choose the most affordable option for purchase. Whether you're looking for groceries, personal care, or other essentials, Health Cart helps you save time and money by offering the convenience of shopping from multiple delivery apps at once, ensuring you get the best deals in just a few clicks.</Text>
                            </CardBody>
                        </Card>
                    </GridItem>
                    <GridItem className='flex flex-col'>
                        <Card height="full">
                            <Box className='flex flex-row justify-between items-center px-2'>
                                <CardHeader className='text-lg font-semibold text-gray-800'>Gym Week</CardHeader>
                                <Image src="../../../assets/Gym.png" className='w-10 h-15' />
                            </Box>
                            <CardBody>
                               <Text className='text-xl px-2'>Health Cart also offers a seamless gym routine planner where users can create and customize their 7-day workout schedule for the week. Through a simple drag-and-drop interface, users can easily plan and adjust their exercises for each day, ensuring flexibility in their fitness journey. Whether you're looking to switch up your workout routine or try something new, this feature allows you to modify your plan effortlessly every week of the month. With Health Cart, managing and personalizing your fitness schedule has never been easier, empowering you to stay on track with your health goals.</Text>
                            </CardBody>
                        </Card>
                    </GridItem>
                </Grid>
            </Box>
        </div>
    )
}

export default Dashboard