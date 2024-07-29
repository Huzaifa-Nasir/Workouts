import { useEffect, useState } from 'react';
import '../App.css';
import WorkoutDetails from '../components/WorkoutDetails';
import AddWorkout from './AddWorkout';
import useWorkoutContext from '../hooks/useWorkoutContext';
import useAuthContext from '../hooks/useAuthContext';

export default function Home() {
  const [loading, setLoading] =useState(true);
  const {workouts,dispatch} = useWorkoutContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const getAllWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts',
          {
            headers: {'Authorization':`Bearer ${user.token}`}
          }
        );
        const result = await response.json();
        if (response.ok) {
            dispatch({type: 'SET_WORKOUTS' , payload: result});
        }
        
        
      } catch (error) { 
        console.error('Fetch error:', error);
      }
      finally{
        setLoading(false);
      }
    };
      if(user)
      {
        getAllWorkouts();
      }
   
  }, [dispatch,user]);

  return (
    <>
   
    <div className="home">
   
      <div className='workoutDetails'>
      <h1>Workout Routine</h1>
     
      {
        loading ? (<p>Loading....</p> ):
     ( workouts && workouts.length>0) ? (<WorkoutDetails key={workouts._id} workouts={workouts}/>):
     (<p>No workouts to be displayed</p>)}
     </div>
     <div className='addingWorkout'>
     <AddWorkout/>
     </div>
    
    </div>
    </>
  );
}
