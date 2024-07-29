
const Workout = require('../model/Workout');
module.exports.add_workout_get = (req,res)=>{
    res.status(200).json('ok ha');
}

module.exports.add_workout_post = async(req,res)=>{

   const {title,reps,load} = req.body;

   let emptyFields = [];
   if(!title)
   {
    emptyFields.push('title');
   }
   
   if(!reps)
   {
    emptyFields.push('reps');
   }
   
   if(!load)
   {
    emptyFields.push('load');
   }
   if(emptyFields.length > 0 )
   {
   return res.status(400).json({err:'Please fill in all the fields', emptyFields});
   }
     const user_id = req.user;
     
   try {
    console.log(user_id);
       const data = await Workout.create({title,reps,load,user_id});
       res.status(201).json(data)
   } catch (err) {
    res.status(400).json({err:err.message});
   }
}

module.exports.get_workouts = async(req,res)=>{

    try{
        const user_id = req.user;
        const data =  await Workout.find({user_id}).sort({createdAt:-1});
        res.status(200).json(data);
        
    }
    catch(err)
    {
        res.status(400).json({ error: err.message });
    }
}

module.exports.delete_workout = async (req, res) => {
    const { id } = req.params
  
   
  
    const workout = await Workout.findByIdAndDelete({_id: id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }