import { useState } from "react";
import '../App.css';
import useWorkoutContext from '../hooks/useWorkoutContext';
import useAuthContext from "../hooks/useAuthContext";

export default function AddWorkout() {
  const {user}= useAuthContext();
  const {dispatch} = useWorkoutContext();
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);
  const [emptyField,setEmptyFileds] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
      if(!user)
      {
        setError('You must be signed in');
        console.log('You must be signed in')
        return;
      }
    const data = { title, reps, load };


    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' ,
               'Authorization':`Bearer ${user.token}`},
    });
    const res = await response.json();

    if (!response.ok) {
      setError(res.err);
      setEmptyFileds(res.emptyFields || []);
      console.log(res.emptyFields || []);
    }
    if (response.ok) {
      setTitle('');
      setReps('');
      setLoad('');
      setError(null);
      console.log("Items added", res);
      dispatch({type:'CREATE_WORKOUT',payload:res});
      setEmptyFileds([]);
    }
  };

  return (
    <>
    <div className="forum">
      
    <h1>Add your Workout Routine</h1>
      <form className="fill" onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} 
        className={emptyField.includes('title')? 'errorField' : 'notError'}
        
        />

        <label>Reps: </label>
        <input type="number" onChange={(e) => setReps(e.target.value)} value={reps}
        className={emptyField.includes('reps')?'errorField':'notError'}
         />

        <label>Load (in kg): </label>
        <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} 
        className={emptyField.includes('load')?'errorField':'notError'}
        />

        <button>Submit</button>
        {error && <div className="error">{error}</div>}
      </form>
      </div>
    </>
  );
}
