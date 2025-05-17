import { Card, CardBody, CardHeader, Stack, Text } from '@chakra-ui/react'
import { useDraggable } from '@dnd-kit/core';
import { DayWorkout } from './types'

const GymCard = ({ dayData }: { dayData: DayWorkout }) => {
    // Use the dayData.id as the draggable ID
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: dayData.id || `workout-${dayData.day}`,
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging ? 1000 : 1,
        position: 'relative' as const,
        opacity: isDragging ? 0.8 : 1,
        boxShadow: isDragging ? '0 5px 10px rgba(0,0,0,0.2)' : 'none',
    };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className="cursor-grab rounded-lg p-4 bg-white shadow hover:shadow-lg transition-shadow duration-300" style={style}>
            <Card className='border border-gray-200'>
                <CardHeader padding={3} className='text-lg font-semibold text-gray-800'>{dayData.day}</CardHeader>
                <CardBody p={3}>
                    {dayData.warm_up && (
                        <Stack mb={4}>
                            <Text fontWeight="bold" className='text-base text-gray-700'>Warm-Up:</Text>
                            <Text>{dayData.warm_up}</Text>
                        </Stack>
                    )}

                    {dayData.exercises && dayData.exercises.length > 0 && (
                        <Stack>
                            <Text fontWeight="bold" className='text-base text-gray-700'>Exercises:</Text>
                            {dayData.exercises.map((exercise: any, index: any) => (
                                <Text key={index}>{exercise}</Text>
                            ))}
                        </Stack>
                    )}

                    {dayData.activities && (
                        <Stack>
                            <Text fontWeight="bold" className='text-base text-gray-700'>Activities:</Text>
                            <Text>{dayData.activities}</Text>
                        </Stack>
                    )}
                </CardBody>
            </Card>
        </div>
    )
}

export default GymCard