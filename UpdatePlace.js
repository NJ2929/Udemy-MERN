import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './PlaceForm.css';
import { useForm } from '../../shared/hooks/form-hook';

const DUMMY_PLACES= [
    {
        id: 'p1',
        title: 'Landscapes',
        description:'Beautiful landscape of the Earth',
        imageURL: 'https://www.istockphoto.com/photo/arambol-beach-goa-gm469852152-61815842?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fbeach%2F&utm_term=beach',
        address:'abc addrress 38',
        location: {
            lat: 30.23343,
            lng: -73.93434
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Car',
        description:'Beautiful Carsh',
        imageURL: 'https://www.pexels.com/photo/blue-bmw-sedan-near-green-lawn-grass-170811/',
        address:'abc addrress 38',
        location: {
            lat: 32.23343,
            lng: -73.93434
        },
        creator: 'u2'
    }
    ];


const UpdatePlace=(props)=>{

const params= useParams();
const placeId=params.placeId;
 
const identifiedPlace= DUMMY_PLACES.find(p => p.id === placeId);
 
 const[formState,inputHandler] =  useForm(
        {
            title: {
                value: identifiedPlace.title,
                isValid: true
            },
            description: 
            {
                value: identifiedPlace.description,
                isValid: true
            }
        }
        ,true
    )

    const placeUpdateSubmitHandler=(event)=> {
        event.preventDefault();
        console.log(formState.inputs);
    }

    if(!identifiedPlace){
        return (
             <div className="center">
            <h2> Could not find a place</h2>
        </div>
        );
    }

return (
<form className="place-form" onSubmit={placeUpdateSubmitHandler}>
    <Input id="title"
    element="input"
    type="text"
    label="Title"
    validators={[VALIDATOR_REQUIRE()]}
    errorText="Please enter a valid title"
    //onInput={inputHandler}
    onInput={()=>{}}
    initialValue={formState.inputs.title.value}
     initialValid={formState.inputs.title.isValid}
    // value={identifiedPlace.title}
    // valid={true}
    />

<Input 
    id="description"
    element="textarea"
    label="Description"
    validators={[VALIDATOR_MINLENGTH(5)]}
    errorText="Please enter a valid description, MIN 5 CHARACTERS"
    //onInput={inputHandler}
    onInput={()=>{}}
     initialValue={formState.inputs.description.value}
     initialValid={formState.inputs.description.isValid}
   //value={identifiedPlace.description}
    //valid={true}
    />
    <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE 
    </Button>
</form>
)
};

export default UpdatePlace;
