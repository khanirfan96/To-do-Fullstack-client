import { Card, CardBody, CardHeader, Stack, Text } from '@chakra-ui/react'
import { DayWorkout } from './types'

const GymCard = ({ dayData }: { dayData: DayWorkout }) => {
    return (
        <>
            <Card>
                <CardHeader padding={3}>{dayData.day}</CardHeader>
                <CardBody p={3}>
                    {dayData.warm_up && (
                        <Stack mb={4}>
                            <Text fontWeight="bold">Warm-Up:</Text>
                            <Text>{dayData.warm_up}</Text>
                        </Stack>
                    )}

                    {dayData.exercises && dayData.exercises.length > 0 && (
                        <Stack>
                            <Text fontWeight="bold">Exercises:</Text>
                            {dayData.exercises.map((exercise: any, index: any) => (
                                <Text key={index}>{exercise}</Text>
                            ))}
                        </Stack>
                    )}

                    {dayData.activities && (
                        <Stack>
                            <Text fontWeight="bold">Activities:</Text>
                            <Text>{dayData.activities}</Text>
                        </Stack>
                    )}
                </CardBody>
            </Card>
        </>
    )
}

export default GymCard