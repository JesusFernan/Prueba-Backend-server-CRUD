const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());


const courses = [
    {id: 1, name: 'course JavaScript'},
    {id: 2, name: 'course Node.js'},
    {id: 3, name: 'course React Native'},
    {id: 4, name: 'course Ruby On Rails'},
    {id: 5, name: 'course Python'},
     
];

app.get('/', (req, res) => {
    res.send('hello world since Node.js!!');
});

app.get('/api/courses', (req, res) => {
    res.send( courses);
});



app.post('/api/courses', (req, res) => {
    //Con joi podemos validar la informacion que lleva los imputs
     
    const { error } = validateCourse(req.body); // result.error
    
    if(error) return res.status(400).send(error.details[0].message); //400 bad request
     
    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});

 
 
app.get('/api/courses/:id', (req, res) =>{
    let course = courses.find(c => c.id ===  parseInt(req.params.id));
    if (!course)  return res.status(404).send('The course with the given ID was not found') // 404 object not found
    res.send(course);

});

app.put('/api/courses/:id', (req, res) =>{
    //Look up the course
    let course = courses.find(c => c.id ===  parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found') // 404 object not found
    //if not existing, return 404
     
    const { error } = validateCourse(req.body); // result.error
    
    if(error) return res.status(400).send(error.details[0].message); //400 bad request
      
    //Update course
    course.name = req.body.name;
    res.send(course);

    //Return the updated course

});

app.delete('/api/courses/:id', (req, res) =>{
    //Look up the course
    //Not existing, return 404
    let course = courses.find(c => c.id ===  parseInt(req.params.id));
    if (!course)  return res.status(404).send('The course with the given ID was not found') // 404 object not found
    
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);

    //Return the same course

});

 
function validateCourse(course){
    const schema = {
        name: Joi.string().min(8).required() //Ejemplo el nombre string solamente usando como minimo 8 caracteres y requerido =true

    };
    return Joi.validate(course, schema); 
}















const port = process.env.PORT || 4000
app.listen(port, () =>  {
    const colorOnline = '\x1b[32m%s\x1b[0m'
    console.log(`app running in port ${port}: ${colorOnline}`,'online');
  
});
