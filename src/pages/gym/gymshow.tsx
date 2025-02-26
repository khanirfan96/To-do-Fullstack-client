import { Card, CardBody, CardHeader, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const GymShow = () => {
    return (
        <div>
            <div className='flex flex-col grid-flow-col grid-col-7 gap-4 p-3'>
                <div className='p-6 border-2 border-solid border-neutral-600'><Text className='text-2xl font-bold'>Monday</Text>
                <Card>
                   <CardHeader padding={4}> Leg Day </CardHeader>
                   <CardBody p={4}>
                    <Stack>
                    <Text>Warm-Up:</Text>
                    <Text>5-10 minutes on the treadmill or cycling.</Text>
                    </Stack>
                    <Stack>
                    <Text>Exercises:</Text>
                    <Text>Squats (4 sets of 10-12 reps)</Text>
                    <Text>Leg Press (4 sets of 10-12 reps)</Text>
                    <Text>Lunges (3 sets of 12 reps per leg)</Text>
                    <Text>Leg Curls (3 sets of 12-15 reps)</Text>
                    <Text>Calf Raises (4 sets of 15-20 reps)</Text>
                    <Text>Squats (4 sets of 10-12 reps)</Text>
                    </Stack>
                   </CardBody>
                </Card>
                </div>
                <div className='p-6 border-2 border-solid border-neutral-600 bg-green-500'><Text>Tuesday</Text>
                <Card>
                   <CardHeader>
                    <Heading>Chest Day</Heading>
                   </CardHeader>
                   <CardBody>
                    <Stack>
                    <Text>Warm-Up:</Text>
                    <Text>5-10 minutes of light cardio (rowing or cycling).</Text>
                    </Stack>
                    <Stack>
                    <Text>Exercises:</Text>
                    <Text>Barbell Bench Press (4 sets of 8-12 reps)</Text>
                    <Text>Incline Dumbbell Press (4 sets of 8-12 reps)</Text>
                    <Text>Chest Dips (3 sets of 8-12 reps)</Text>
                    <Text>Cable Flys (3 sets of 12-15 reps)</Text>
                    <Text>Push-Ups (3 sets to failure)</Text>
                    </Stack>
                   </CardBody>
                </Card></div>
                <div className='p-6 border-2 border-solid border-neutral-600 bg-red-500'><Text>Wednesday</Text>
                <Card>
                   <CardHeader>
                    <Heading>Back Day</Heading>
                   </CardHeader>
                   <CardBody>
                    <Stack>
                    <Text>Warm-Up:</Text>
                    <Text>5-10 minutes of rowing machine.</Text>
                    </Stack>
                    <Stack>
                    <Text>Exercises:</Text>
                    <Text>Deadlifts (4 sets of 6-8 reps)</Text>
                    <Text>Pull-Ups/Assisted Pull-Ups (4 sets of 6-10 reps)</Text>
                    <Text>Bent-Over Rows (4 sets of 8-12 reps)</Text>
                    <Text>Lat Pulldown (3 sets of 12 reps)</Text>
                    <Text>Seated Rows (3 sets of 10-12 reps)</Text>
                    </Stack>
                   </CardBody>
                </Card></div>
                <div className='p-6 border-2 border-solid border-neutral-600 bg-stone-500'><Text>Thursday</Text>
                <Card>
                   <CardHeader>
                    <Heading>Shoulders Day</Heading>
                   </CardHeader>
                   <CardBody>
                    <Stack>
                    <Text>Warm-Up:</Text>
                    <Text>5-10 minutes of light cardio (rowing or cycling).</Text>
                    </Stack>
                    <Stack>
                    <Text>Exercises:</Text>
                    <Text>Barbell Shoulder Press (4 sets of 8-10 reps)</Text>
                    <Text>Lateral Raises (3 sets of 12-15 reps)</Text>
                    <Text>Front Dumbbell Raise (3 sets of 12 reps)</Text>
                    <Text>Arnold Press (3 sets of 8-12 reps)</Text>
                    <Text>Face Pulls (3 sets of 12-15 reps)</Text>
                    </Stack>
                   </CardBody>
                </Card></div>
                <div className='p-6 border-2 border-solid border-neutral-600 bg-blue-400'><Text>Friday</Text>
                <Card>
                   <CardHeader>
                    <Heading>Arm Day</Heading>
                   </CardHeader>
                   <CardBody>
                    <Stack>
                    <Text>Warm-Up:</Text>
                    <Text>5-10 minutes of light cardio or stretching.</Text>
                    </Stack>
                    <Stack>
                    <Text>Exercises:</Text>
                    <Text>Barbell Bicep Curl (4 sets of 8-12 reps)</Text>
                    <Text>Dumbbell Hammer Curl (3 sets of 12 reps)</Text>
                    <Text>Close-Grip Bench Press (4 sets of 8-12 reps)</Text>
                    <Text>Tricep Dips (3 sets of 8-12 reps)</Text>
                    <Text>Preacher Curl Machine (3 sets of 12 reps)</Text>
                    <Text>Overhead Tricep Extension (3 sets of 12-15 reps)</Text>
                    </Stack>
                   </CardBody>
                </Card></div>
                <div className='p-6 border-2 border-solid border-neutral-600 bg-blue-400'><Text>Saturday</Text>
                <Card>
                   <CardHeader>
                    <Heading>Full Body Workout</Heading>
                   </CardHeader>
                   <CardBody>
                    <Stack>
                    <Text>Warm-Up:</Text>
                    <Text>5-10 minutes of light cardio or dynamic stretches.</Text>
                    </Stack>
                    <Stack>
                    <Text>Exercises:</Text>
                    <Text>Squats (4 sets of 10-12 reps)</Text>
                    <Text>Pull-Ups (4 sets to failure)</Text>
                    <Text>Barbell Bench Press (4 sets of 8-10 reps)</Text>
                    <Text>Lunges (3 sets of 12 reps per leg)</Text>
                    <Text>Deadlifts (3 sets of 6-8 reps)</Text>
                    <Text>Overhead Press (3 sets of 8-10 reps)</Text>
                    </Stack>
                   </CardBody>
                </Card></div>
                <div className='p-6 border-2 border-solid border-neutral-600 bg-blue-400'><Text>Sunday</Text>
                <Card>
                   <CardHeader>
                    <Heading>Rest and recovery</Heading>
                   </CardHeader>
                   <CardBody>
                    <Stack>
                    <Text>Focus on stretching, foam rolling, or light yoga.</Text>
                    </Stack>
                   </CardBody>
                </Card></div>
            </div>
        </div>
    )
}

export default GymShow