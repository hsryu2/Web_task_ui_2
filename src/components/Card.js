import React, { useState } from 'react';
import EditTask from '../modals/EditTask';
import { Card as MUICard, CardHeader, CardContent, Button, Typography, Checkbox } from '@mui/material';
import styled from '@emotion/styled';

const StyledMUICard = styled(MUICard)(({ categoryClass, completed }) => ({
    marginBottom: 20, // 카드 간의 간격 조정
    position: 'relative',
    backgroundColor: completed ? '#C1C1C1' : categoryClass.backgroundColor, // 완료된 경우 다른 색상 적용
    height: '200px',
    width: '270px',
    boxShadow: '0px 3px 50px #A5A5A5',
    display: 'flex',
    flexDirection: 'column',
}));

const StyledCardHeader = styled(CardHeader)(({ categoryClass, completed }) => ({
    backgroundColor: completed ? '#999' : categoryClass.color, // 완료된 경우 다른 색상 적용
    maxWidth: '80px',
    height: '30px',
    padding: '1px 1px',
    textAlign: 'center',
}));

const StyledButton = styled(Button)({
    margin: '0 5px',
});

const ContentWrapper = styled(CardContent)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
});

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);
    const [completed, setCompleted] = useState(false); // 완료 상태 추가

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    const handleCheckboxChange = () => {
        setCompleted(!completed); // 체크박스 상태 토글
    };

    const categoryColors = {
        Work: { backgroundColor: '#5D93E1', color: '#ECF3FC' },
        Personal: { backgroundColor: '#F9D288', color: '#FEFAF1' },
        Part_time: { backgroundColor: '#5DC250', color: '#F2FAF1' },
        Birthday: { backgroundColor: '#F48687', color: '#FDF1F1' },
        Other: { backgroundColor: '#B964F7', color: '#F3F0FD' },
    };

    const taskCategory = taskObj.Category;
    const categoryClass = categoryColors[taskCategory] || categoryColors.Other;

    return (
        <StyledMUICard categoryClass={categoryClass} completed={completed}>
            <ContentWrapper>
                <StyledCardHeader
                    title={<Typography variant="h6">{taskObj.Name}</Typography>}
                    categoryClass={categoryClass}
                    completed={completed}
                />
                <Typography variant="body1" gutterBottom>{taskObj.Description}</Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Checkbox checked={completed} onChange={handleCheckboxChange} />
                        <span>{completed ? '완료됨' : '미완료'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <StyledButton
                        variant="outlined"
                        onClick={() => setModal(true)}
                        sx={{ color: '#000', borderColor: categoryClass.color }}
                    >
                        수정
                    </StyledButton>
                    <StyledButton
                        variant="outlined"
                        onClick={handleDelete}
                        sx={{ color: '#000', borderColor: categoryClass.color }}
                    >
                        삭제
                    </StyledButton>
                    </div>
                </div>

                </div>
            </ContentWrapper>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </StyledMUICard>
    );
};

export default Card;
