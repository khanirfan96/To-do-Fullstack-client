import { Card, CardBody, Text } from '@chakra-ui/react';
import { DndContext, DragEndEvent, PointerSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { daysOrder } from '../../utils/const';
import { getCall } from '../apimethods';
import GymCard from './gymcard';
import { WorkoutSchedule } from './types';

const GymShow = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutSchedule>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const fetchWorkoutData = async () => {
    try {
      setIsLoading(true);
      const result = await getCall({ url: 'schedule' });

      let processedData: WorkoutSchedule = {};

      if (Array.isArray(result) && result.length > 0 && typeof result[0] === 'object') {
        processedData = result[0];
      }
      else if (typeof result === 'object' && result !== null) {
        processedData = result;
      }
      console.log(processedData, 'data')
      setWorkoutData(processedData || {});
    } catch (err) {
      setError('Failed to load workout schedule. Please try again later.'); alert('Failed to load workout schedule. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutData();
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log(event, 'eveee')

    if (!over) return;

    const taskId = active.id.toString();
    const newStatus = over.id.toString();

    let sourceDay = '';
    for (const day in workoutData) {
      if (workoutData[day] && workoutData[day].id === taskId) {
        sourceDay = day;
        break;
      }
    }

    console.log('Source day:', sourceDay, 'Target day:', newStatus);

    if (!sourceDay || sourceDay === newStatus) return;

    // Create a new workout data object
    const newWorkoutData = { ...workoutData };
    const workoutToMove = { ...newWorkoutData[sourceDay] };
    
    // Check if the target day already has a workout
    const targetDayData = newWorkoutData[newStatus];
    
    // Handle swapping workouts if the target day already has a workout
    if (targetDayData) {
      // Swap the workouts between the days
      newWorkoutData[sourceDay] = targetDayData;
      newWorkoutData[newStatus] = workoutToMove;
    } else {
      // Just move the workout to the new day
      newWorkoutData[newStatus] = workoutToMove;
      delete newWorkoutData[sourceDay];
    }

    console.log('New workout data:', newWorkoutData);
    setWorkoutData(newWorkoutData);
  }

  if (isLoading) return <Text className='flex flex-row justify-center items-center'>Loading workout schedule...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!workoutData || Object.keys(workoutData).length === 0) {
    return <Text className='text-sm text-gray-700'>No workout data available</Text>;
  }

  // The key change is here - we need to wrap everything in a single DndContext
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {daysOrder.map((day) => {
          const dayData = workoutData[day];
          
          // Create a Droppable component for each day
          return <DroppableDay key={day} day={day} dayData={dayData} />;
        })}
      </div>
    </DndContext>
  );
}

// New component to handle the droppable functionality for each day
const DroppableDay = ({ day, dayData }: { day: string, dayData: any }) => {
  // Use the day as the droppable ID
  const { setNodeRef } = useDroppable({
    id: day,
  });
  
  return (
    <div ref={setNodeRef} className="p-4 border-2 border-solid">
      <Text className='text-2xl font-bold capitalize'>{day}</Text>
      
      {!dayData ? (
        <Card className='bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300'>
          <CardBody className='p-4'>
            <Text className='text-sm text-gray-700'>No schedule available</Text>
          </CardBody>
        </Card>
      ) : (
        <GymCard dayData={dayData} />
      )}
    </div>
  );
};

export default GymShow;