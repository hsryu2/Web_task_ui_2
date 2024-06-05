import React, { useEffect, useState } from 'react';
import CreateTask from '../modals/CreateTask';
import Card from './Card';
import styled from '@emotion/styled';
import { Typography, Button } from '@mui/material';

const Header = styled.div`
  height: 200px;
  width: 100%;
  background-color: #E9EEF6;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CreateButton = styled(Button)`
  margin-top: 20px;
`;

const TaskContainer = styled.div`
  height: 600px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #F6F7F8;
  padding: 40px 100px;
`;

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    
    useEffect(() => {
        const arr = localStorage.getItem("taskList");
        if(arr) {
            const obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = [...taskList];
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const updateListArray = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = [...taskList];
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <>
            <Header>
                <Typography variant="h3">Todo List</Typography>
                <CreateButton variant="contained" color="primary" onClick={() => setModal(true)}>Create Task</CreateButton>
            </Header>
            <TaskContainer>
                {taskList.map((obj, index) => (
                    <Card key={index} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />
                ))}
            </TaskContainer>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;
