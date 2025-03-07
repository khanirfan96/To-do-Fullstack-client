import { Card, CardBody, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { daysOrder } from '../../utils/utils';
import { getCall } from '../apimethods';
import GymCard from './gymcard';
import { WorkoutSchedule } from './types';
import {DndContext} from '@dnd-kit/core';
// import {SortableContext} from '@dnd-kit/sortable';

const GymShow = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutSchedule>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
      setWorkoutData(processedData || {});
    } catch (err) {
      setError('Failed to load workout schedule. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkoutData();
  }, []);

  if (isLoading) return <Text className='flex flex-row justify-center items-center'>Loading workout schedule...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;
  if (!workoutData || Object.keys(workoutData).length === 0) {
    return <Text>No workout data available</Text>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {daysOrder.map((day) => {
        const dayData = workoutData[day];

        if (!dayData) {
          return (
            <div key={day} className="p-4 border-2 border-solid border-neutral-600">
              <Text className='text-2xl font-bold capitalize'>{day}</Text>
              <Card>
                <CardBody>
                  <Text>No schedule available</Text>
                </CardBody>
              </Card>
            </div>
          );
        }

        return (
          <div key={day} className='p-2 border-2 border-solid border-neutral-600'>
            <Text className='text-2xl font-bold capitalize'>{day}</Text>
            <DndContext>
            {/* <SortableContext dayData={dayData}> */}
            <GymCard dayData={dayData} />
            {/* </SortableContext> */}
            </DndContext>
          </div>
        );
      })}
    </div>
  );
}

export default GymShow