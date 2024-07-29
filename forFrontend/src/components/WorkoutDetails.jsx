
import useWorkoutContext from '../hooks/useWorkoutContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useAuthContext from '../hooks/useAuthContext';

import { DeleteIcon } from '@chakra-ui/icons'


// The default icon size is 1em (16px)

export default function WorkoutDetails({workouts}) {
  const{user} = useAuthContext();
  const {dispatch} = useWorkoutContext();
  const deleteWorkout = async (workoutID)=>{
    
        if(!user)
        {
          return ;
        }
      const res = await fetch(`api/workouts/${workoutID}`,{
        method:'DELETE',
        headers:{'Authorization':`Bearer ${user.token}`}
        }
      );
      const result = await res.json();
      if(res.ok)
      {
        dispatch({type: 'DELETE_WORKOUT',payload: result})
  
      }  
   

  }
  return (
         <div className="workouts">
        {workouts.map((workout) => (
          <div key={workout._id} className="workout-card">
            <div>
            <h1>{workout.title}</h1>
            <p>Reps: {workout.reps}</p>
            <p>Load: {workout.load}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
            </div>
            <div>
           <span className='delete-icon' onClick={()=> deleteWorkout(workout._id)}><DeleteIcon /></span>
           </div>
          
          </div>
         
        ))}
      </div>
      
   
  )
}
