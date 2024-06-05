    import React, { useState } from 'react';
    import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';


    const CreateTaskPopup = ({ modal, toggle, save }) => {
        const [taskName, setTaskName] = useState('');
        const [description, setDescription] = useState('');
        const [category, setCategory] = useState('');

        const handleChange = (e) => {
            const { name, value } = e.target;
            if (name === "taskName") {
                setTaskName(value);
            } else if (name === "description") {
                setDescription(value);
            } else if (name === "category") {
                setCategory(value);
            }
        };

        const handleSave = (e) => {
            e.preventDefault();
            let taskObj = {};
            taskObj["Name"] = taskName;
            taskObj["Description"] = description;
            taskObj["Category"] = category;
            save(taskObj);
        };

        return (
            <Dialog open={modal} onClose={toggle}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div className="form-group">
                            <TextField
                                label="Task Name"
                                variant="outlined"
                                fullWidth
                                value={taskName}
                                onChange={handleChange}
                                name="taskName"
                                margin="dense"
                            />
                        </div>
                        <div className="form-group">
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                value={description}
                                onChange={handleChange}
                                name="description"
                                margin="dense"
                            />
                        </div>
                        <div className="form-group">
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={category}
                                    onChange={handleChange}
                                    name="category"
                                    label="Category"
                                >
                                    <MenuItem value="Work">일</MenuItem>
                                    <MenuItem value="Personal">사생활</MenuItem>
                                    <MenuItem value="Part_time">아르바이트</MenuItem>
                                    <MenuItem value="Birthday">특별한 날</MenuItem>
                                    <MenuItem value="Other">그 외</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleSave}>Create</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </DialogActions>
            </Dialog>
        );
    };

    export default CreateTaskPopup;