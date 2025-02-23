import { Button, TextField, Tooltip } from '@mui/material';
import './AddForm.scss';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { HandleAddFormFunctionProps } from '../../types/functions.types';
import { AddFormComponentProps } from '../../types/component.types';
import logo from '../../assets/icons/cross.png';

const AddForm = (props: AddFormComponentProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const yupValidationSchema = Yup.object({
      title: Yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
      description: Yup.string()
        .min(6, 'Description must be at least 6 characters')
        .required('Description is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: yupValidationSchema,
    onSubmit: async (values) => {
      console.log(values);
      handleAddForm(values);
      formik.resetForm();
    },
  });

  const handleAddForm = (values: HandleAddFormFunctionProps) => {
    console.log('Clicked' + values);
  }
    
  return (
    <div className='add-form-bg'>

      <Tooltip title="Logout" data-testid='tooltip-logout'>
        <div className="icon-container" onClick={props.handleVisibleForm}>
            <img src={logo} alt="logout-icon" className="icon" data-testid='logout'/>
        </div>
      </Tooltip>

      <form className="add-form">
        <h1 className="add-form-title">Add a Task</h1>

        <div className="inputs-container">
          <div className="text-input-container">
            <div className="error">
              <h6 className="error-texts" data-testid="title-validation">
                {formik.touched.title && formik.errors.title}
              </h6>
            </div>
            <TextField
              label="Title"
              id="outlined-size-small"
              size="small"
              className="text-field"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              data-testid='title'
            />
          </div>
          <div className="text-input-container">
            <div className="error">
              <h6 className="error-texts" data-testid="description-validation">
                {formik.touched.description && formik.errors.description}
              </h6>
            </div>
            <TextField
              label="Description"
              id="outlined-size-small"
              size="small"
              className="text-field"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              data-testid='description'
            />
          </div>
        </div>

        <Button data-testid='add-todo-button' type="button" variant="contained" size="small" className='control-button'>Add </Button>

      </form>
    </div>
  );

}

export default AddForm;