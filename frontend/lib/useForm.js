import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  // the initial value if someone give a inital value and not
  const [inputs, setInputs] = useState(initial);
  // when initial data changes just update it with useEffect and all
  // goes from nothing to anything
  // gives us array of object and join them with ,
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    // we have used initalValues it will complete a infinite loop and all
    setInputs(initial);
  }, [initialValues]);

  function handleChange(event) {
    // because html elements always give a string if its number also
    let { value, name, type } = event.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = event.target.files;
    }
    // we dont just say event.target.value to setState because we are dealing with many inputs
    // {
    //   name: 'pranav',
    //   description: 'nice shoes',
    //   price: 1000
    // }
    // so we basically set the entire state to be a object copy the inital state and
    // below just update the peice of state
    setInputs({
      // copy the inital state and
      ...inputs,
      [name]: value,
    });
  }
  // also if you want to reset the form to the inital state you can do this
  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return the things you want to send to the component
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
