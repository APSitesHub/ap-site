import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { useEffect, useState } from 'react';
import {
  AdminFormBtn,
  DatesEditBlock,
  UserDeleteButton,
  UserEditButton,
} from '../UserAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const UserVisitedEditForm = ({ userToEdit, updateUserVisits, closeEditForm }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editedVisited, setEditedVisited] = useState([]);

  function getTodayDate() {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();

    return `${day}.${month}.${year}`;
  }

  function formatDateToInput(dateStr) {
    let parts = dateStr.split('.');
    if (parts.length === 3) {
      let formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(
        2,
        '0'
      )}`;
      return formattedDate;
    }
    return '';
  }

  function formatInputToDate(dateStr) {
    let parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    }
    return '';
  }

  const addVisit = () => {
    setEditedVisited(prevState => {
      const newState = [getTodayDate(), ...prevState];
      console.log(newState);

      return newState;
    });

    editVisit(0, true);
  };

  const deleteVisit = index => {
    setEditedVisited(prevState => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const editVisit = (index, isAdd) => {
    const dateDiv = document.getElementById(`date-${index}`);
    const dateChangeDiv = document.getElementById(`change-${index}`);
    const dateInput = dateChangeDiv.querySelector('input');

    dateInput.value = formatDateToInput(editedVisited[index].split(' ')[0]);

    if (dateChangeDiv.style.display === 'none' || isAdd) {
      dateDiv.style.display = 'none';
      dateChangeDiv.style.display = 'flex';
    } else {
      dateDiv.style.display = 'flex';
      dateChangeDiv.style.display = 'none';
    }
  };

  const saveVisit = index => {
    const dateDiv = document.getElementById(`date-${index}`);
    const dateChangeDiv = document.getElementById(`change-${index}`);
    const dateInput = dateChangeDiv.querySelector('input');
    const date = formatInputToDate(dateInput.value);
    dateChangeDiv.style.display = 'none';
    dateDiv.style.display = 'flex';
    setEditedVisited(prevState => {
      const note = prevState[index].split(' ')[1];

      const newState = [...prevState];
      if (note) {
        newState[index] = date + ' ' + note;
      } else {
        newState[index] = date;
      }
      return newState;
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { _id, mail, password } = userToEdit;

      const response = await axios.put(`/uniusers/${_id}`, {
        mail,
        password,
        visited: [...editedVisited].reverse(),
      });
      console.log(response);
      setIsLoading(false);
      updateUserVisits(_id, [...editedVisited].reverse());
      closeEditForm();
    } catch (error) {
      console.error(error);
      alert(
        'Wystąpił problem - naciśnij F12, zrób zrzut ekranu konsoli, wyślij do Kirila'
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const reversedVisited = [...userToEdit.visited].reverse();
    setEditedVisited(reversedVisited);
  }, [userToEdit]);

  useEffect(() => {
    setIsLoading(!editedVisited);
  }, [editedVisited]);

  return (
    <>
      <DatesEditBlock>
        <div
          style={{
            maxHeight: '70dvh',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <button
                type="button"
                onClick={() => addVisit()}
                style={{
                  padding: '10px',
                  border: '1px solid var(--main-color)',
                  color: 'var(--main-color)',
                  borderRadius: '5px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
              {editedVisited.map((visit, index) => (
                <div
                  style={{
                    padding: '10px',
                    border: '1px solid black',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                  key={index}
                >
                  <div
                    id={`date-${index}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{visit}</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <UserEditButton type="button" onClick={() => editVisit(index)}>
                        Edit
                      </UserEditButton>
                      <UserDeleteButton type="button" onClick={() => deleteVisit(index)}>
                        Del
                      </UserDeleteButton>
                    </div>
                  </div>
                  <div
                    id={`change-${index}`}
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      display: 'none',
                    }}
                  >
                    <input
                      type="date"
                      style={{
                        padding: '4px',
                        border: '1px solid black',
                        borderRadius: '5px',
                        width: 'fit-content',
                      }}
                    />

                    <UserEditButton type="button" onClick={() => saveVisit(index)}>
                      Save
                    </UserEditButton>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <AdminFormBtn type="button" onClick={() => handleSubmit()}>
          Zatwierdź zmiany
        </AdminFormBtn>
      </DatesEditBlock>
      {isLoading && <Loader />}
    </>
  );
};
