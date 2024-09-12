import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styles from '../../../styles/modal.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import getCategory from '../../../lib/services/getCategories';
import { setAdminCategories } from '../../../redux/features/admin/categoriesSlice';
import { Category, Instructor } from '@prisma/client';
import { setAdminInstructors } from '../../../redux/features/admin/instructorSlice';
import getInstructor from '../../../lib/services/getInstructors';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  addAdminActivity,
  updateAdminActivity,
} from '../../../redux/features/admin/activitySlice';

const ModalAddActivityComponent = ({ activity, open, handleClose }) => {
  const [name, setName] = useState(activity ? activity.name : '');

  const [description, setDescription] = useState(
    activity ? activity.description : ''
  );
  const [categoryId, setCategoryId] = useState(
    activity ? activity.categoryId : ''
  );
  const [instructorId, setInstructorId] = useState(
    activity ? activity.instructorId : ''
  );
  const categories = useAppSelector((state) => state.categoryAdmin.categories);
  const instructors = useAppSelector(
    (state) => state.instructorAdmin.instructors
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const initializeCategories = async () => {
      dispatch(setAdminCategories(await getCategory()));
    };
    const initializeInstructors = async () => {
      dispatch(setAdminInstructors(await getInstructor()));
    };
    initializeCategories();
    initializeInstructors();
  }, []);
  const handleSubmit = async () => {
    if (activity) {
      const result = await fetch('/api/activity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: activity.id,
          name,
          description,
          categoryId,
          instructorId,
        }),
      });
      const { data } = await result.json();
      dispatch(updateAdminActivity(data));
    } else {
      const result = await fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          categoryId,
          instructorId,
        }),
      });
      const { data } = await result.json();
      dispatch(addAdminActivity(data));
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalBox}>
        <p className="text-center">
          {activity ? 'Actualizar' : 'Agregar'} actividad
        </p>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="nombre"
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="descripción"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="category-label">Categoría</InputLabel>
            <Select
              labelId="category-label"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              label="Categoría"
            >
              {categories.map((category: Category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="instructor-label">Instructor</InputLabel>
            <Select
              labelId="instructor-label"
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              label="Instructor"
            >
              {instructors.map((instructor: Instructor) => (
                <MenuItem key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div className="flex justify-between">
          <button
            onClick={() => handleClose()}
            className="bg-blue-400 rounded-lg p-2 text-white my-5 mr-2"
          >
            Cerrar
          </button>
          <button
            onClick={() => handleSubmit()}
            className="bg-blue-600 rounded-lg p-2 text-white my-5 mr-2"
          >
            {activity ? 'Actualizar' : 'Agregar'}
          </button>
        </div>
      </Box>
    </Modal>
  );
};
export default ModalAddActivityComponent;
