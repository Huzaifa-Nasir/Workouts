
import useAuthContext from "./useAuthContext";
import useWorkoutContext from './useWorkoutContext'

export default function useLogout() {
    const {dispatch} = useAuthContext();
    const {dispatch:WorkoutDispatch} = useWorkoutContext();

    const LogoutUser=()=>
    {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        WorkoutDispatch({type:'SET_WORKOUTS', payload:null})
    }
    return {LogoutUser};
 
}
