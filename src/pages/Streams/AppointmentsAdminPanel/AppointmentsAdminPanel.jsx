import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { StyledDatePicker } from 'pages/TeacherPage/TeacherPageSpeakingEditForm/TeacherPageSpeakingEditForm.styled';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import * as yup from 'yup';
import { AdminInput, LoginForm } from '../ToursAdminPanel/ToursAdminPanel.styled';
import {
  AdminFormBtn,
  AdminInputNote,
  AdminPanelSection,
  UserDBRow,
  UserHeadCell,
} from '../UserAdminPanel/UserAdminPanel.styled';
import {
  AppointmentBody,
  AppointmentCaption,
  AppointmentCell,
  AppointmentDBTable,
  AppointmentHead,
  AppointmentSpan,
  BodyCell,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
  HeaderCellBody,
  TeacherFilterInput,
} from './AppointmentsAdminPanel.styled';
import { AppointmentStudentModal } from './AppointmentStudentModal';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const AppointmentsAdminPanel = () => {
  const [teachers, setTeachers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [startOfRange, setStartOfRange] = useState(
    new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1))
  );
  const [endOfRange, setEndOfRange] = useState(
    new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth() + 1, 0, -3, 59, 59, 999)
    )
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [showTeachersWithoutAppointments, setShowTeachersWithoutAppointments] =
    useState(false);
  const [teacherFilter, setTeacherFilter] = useState('');
  const [studentAppointments, setStudentAppointments] = useState([]);
  const [isStudentAppointmentsShown, setIsStudentAppointmentsShown] = useState(false);
  const [chosenTeacher, setChosenTeacher] = useState({});

  useEffect(() => {
    document.title = 'Altegio Appointments Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/teachers', {});
          setIsUserAdmin(true);
          setAuthToken(res.data.newToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, []);

  useEffect(() => {
    const getTeachers = async () => {
      setIsLoading(true);
      try {
        if (isUserAdmin) {
          const { data } = await axios.get('/teachers/basic');

          setTeachers(tours => (tours = data.filter(teacher => teacher.altegioId)));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTeachers();
  }, [isUserAdmin]);

  useEffect(() => {
    const getAppointments = async () => {
      setIsLoading(isLoading => (isLoading = true));

      try {
        if (isUserAdmin) {
          const endOfDay = new Date(endOfRange);
          endOfDay.setHours(26, 59, 59, 999);

          const { data } = await axios.get('/appointments', {
            params: {
              start: startOfRange,
              end: endOfDay,
            },
          });

          setAppointments(appointments => (appointments = data));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getAppointments();
  }, [isUserAdmin, startOfRange, endOfRange]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/teachers', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(isAdmin => (isAdmin = true));
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const openStudentAppointments = async (leadId, teacherId) => {
    const endOfDay = new Date(endOfRange);
    endOfDay.setHours(26, 59, 59, 999);

    const studentAppointments = await axios.get('/appointments/student', {
      params: {
        leadId: leadId,
        start: startOfRange,
        end: endOfDay,
      },
    });

    setChosenTeacher(
      chosenTeacher =>
        (chosenTeacher = teachers.find(teacher => teacherId === teacher.altegioId))
    );
    setStudentAppointments(appointments => (appointments = studentAppointments.data));
    setIsStudentAppointmentsShown(true);
  };

  const closeStudentAppointments = e => {
    setIsStudentAppointmentsShown(false);
  };

  const closeStudentAppointmentsOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsStudentAppointmentsShown(false);
    }
  };

  return (
    <>
      <AdminPanelSection>
        {!isUserAdmin && (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <Label>
                <AdminInput type="text" name="login" placeholder="Login" />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput type="password" name="password" placeholder="Password" />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && teachers.length > 0 && (
          <AppointmentDBTable>
            <AppointmentCaption>
              Записи на заняття в Altegio за період{' '}
              <StyledDatePicker
                selected={startOfRange}
                startDate={startOfRange}
                endDate={endOfRange}
                dateFormat="dd.MM.yyyy"
                onChange={([start, end]) => {
                  setStartOfRange(start);
                  setEndOfRange(end);
                }}
                selectsRange
                calendarStartDay={1}
                shouldCloseOnSelect={true}
              />
              <CheckboxContainer>
                <CheckboxLabel>
                  Показати видалені записи
                  <CheckboxInput
                    type="checkbox"
                    name="showDeleted"
                    id="showDeleted"
                    checked={showDeleted}
                    onChange={() => setShowDeleted(showDeleted => !showDeleted)}
                  />
                </CheckboxLabel>
                <CheckboxLabel>
                  Показати тічерів без актуальних записів
                  <CheckboxInput
                    type="checkbox"
                    name="showTeachersWithoutAppointments"
                    id="showTeachersWithoutAppointments"
                    checked={showTeachersWithoutAppointments}
                    onChange={() =>
                      setShowTeachersWithoutAppointments(showTeachers => !showTeachers)
                    }
                  />
                </CheckboxLabel>
                <CheckboxLabel>
                  <TeacherFilterInput
                    type="text"
                    name="teacherFilter"
                    value={teacherFilter}
                    onChange={e => setTeacherFilter(e.target.value)}
                    placeholder="Почніть вводити прізвище викладача..."
                  />
                </CheckboxLabel>
              </CheckboxContainer>
            </AppointmentCaption>
            <AppointmentHead>
              <UserDBRow>
                <UserHeadCell>Ім'я</UserHeadCell>
                <UserHeadCell>Altegio ID</UserHeadCell>
                <UserHeadCell>CRM ID</UserHeadCell>
                <UserHeadCell>Сума записів</UserHeadCell>
                <UserHeadCell>Очікує</UserHeadCell>
                <UserHeadCell>Проведено</UserHeadCell>
                <UserHeadCell>Не проведено</UserHeadCell>
                <UserHeadCell>Сума студентів</UserHeadCell>
                <UserHeadCell>Записані студенти</UserHeadCell>
              </UserDBRow>
            </AppointmentHead>
            <tbody>
              {(() => {
                const foundTeachers = teacherFilter
                  ? teachers.filter(teacher =>
                      teacher.name
                        .toLowerCase()
                        .includes(teacherFilter.toLowerCase().trim())
                    )
                  : [...teachers];

                return foundTeachers
                  .filter(teacher =>
                    showTeachersWithoutAppointments
                      ? teacher
                      : appointments.some(
                          appointment =>
                            Number(appointment.teacherId) === teacher.altegioId &&
                            !appointment.isDeleted
                        )
                  )
                  .map(teacher => (
                    <UserDBRow key={teacher._id}>
                      <BodyCell componentWidth="12em">{teacher.name}</BodyCell>
                      <BodyCell componentWidth="6em">
                        <a
                          href={`https://apeducation.kommo.com/leads/detail/${teacher.crmId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {teacher.crmId}
                        </a>
                      </BodyCell>
                      <BodyCell componentWidth="6em">
                        <a
                          href={`https://app.alteg.io/timetable/761978#master_id=${teacher.altegioId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {teacher.altegioId}
                        </a>
                      </BodyCell>
                      {(() => {
                        const filteredAppointments = appointments
                          .filter(appointment =>
                            showDeleted
                              ? appointment.teacherId === String(teacher.altegioId)
                              : appointment.teacherId === String(teacher.altegioId) &&
                                !appointment.isDeleted
                          )
                          .sort((a, b) => {
                            const nameA = a.leadName ?? '';
                            const nameB = b.leadName ?? '';
                            const nameCompare = nameA.localeCompare(nameB, undefined, {
                              sensitivity: 'base',
                            });

                            return nameCompare !== 0
                              ? nameCompare
                              : new Date(a.startDateTime) - new Date(b.startDateTime);
                          });

                        const pendingAppointments = filteredAppointments.filter(
                          appointment =>
                            appointment.status === '0' || appointment.status === '2'
                        );
                        const completedAppointments = filteredAppointments.filter(
                          appointment => appointment.status === '1'
                        );
                        const noShowAppointments = filteredAppointments.filter(
                          appointment => appointment.status === '-1'
                        );

                        return (
                          <>
                            <BodyCell componentWidth="7em">
                              {filteredAppointments.length}
                            </BodyCell>
                            <BodyCell componentWidth="7em">
                              {pendingAppointments.length}
                            </BodyCell>
                            <BodyCell componentWidth="7em">
                              {completedAppointments.length}
                            </BodyCell>
                            <BodyCell componentWidth="7em">
                              {noShowAppointments.length}
                            </BodyCell>
                            <BodyCell componentWidth="6em">
                              {
                                [
                                  ...new Set(
                                    filteredAppointments.map(
                                      appointment => appointment.leadName
                                    )
                                  ),
                                ].length
                              }
                            </BodyCell>
                            <AppointmentCell>
                              <HeaderCellBody>
                                <AppointmentSpan componentWidth="15em">
                                  Ім'я студента
                                </AppointmentSpan>
                                <AppointmentSpan componentWidth="6em">
                                  CRM ID
                                </AppointmentSpan>
                                <AppointmentSpan componentWidth="6em">
                                  Записів
                                </AppointmentSpan>
                              </HeaderCellBody>
                              {[
                                ...new Map(
                                  filteredAppointments.map(appointment => [
                                    appointment.leadId,
                                    appointment,
                                  ])
                                ).values(),
                              ].map(appointment => (
                                <AppointmentBody
                                  gradient={[
                                    (pendingAppointments.filter(
                                      studentAppointment =>
                                        appointment.leadId === studentAppointment.leadId
                                    ).length /
                                      filteredAppointments.filter(
                                        studentAppointment =>
                                          appointment.leadId === studentAppointment.leadId
                                      ).length) *
                                      100,
                                    (completedAppointments.filter(
                                      studentAppointment =>
                                        appointment.leadId === studentAppointment.leadId
                                    ).length /
                                      filteredAppointments.filter(
                                        studentAppointment =>
                                          appointment.leadId === studentAppointment.leadId
                                      ).length) *
                                      100,
                                    (noShowAppointments.filter(
                                      studentAppointment =>
                                        appointment.leadId === studentAppointment.leadId
                                    ).length /
                                      filteredAppointments.filter(
                                        studentAppointment =>
                                          appointment.leadId === studentAppointment.leadId
                                      ).length) *
                                      100,
                                  ]}
                                  deleted={appointment.isDeleted}
                                  key={appointment._id}
                                  onClick={() =>
                                    openStudentAppointments(
                                      appointment.leadId,
                                      teacher.altegioId
                                    )
                                  }
                                >
                                  <AppointmentSpan componentWidth="15em">
                                    {appointment.leadName}
                                  </AppointmentSpan>

                                  <AppointmentSpan componentWidth="6em">
                                    <a
                                      href={`https://apeducation.kommo.com/leads/detail/${appointment.leadId}`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {appointment.leadId}
                                    </a>
                                  </AppointmentSpan>
                                  <AppointmentSpan componentWidth="6em">
                                    {
                                      filteredAppointments.filter(
                                        studentAppointment =>
                                          appointment.leadId === studentAppointment.leadId
                                      ).length
                                    }
                                  </AppointmentSpan>
                                </AppointmentBody>
                              ))}
                            </AppointmentCell>
                          </>
                        );
                      })()}
                    </UserDBRow>
                  ));
              })()}
            </tbody>
          </AppointmentDBTable>
        )}
        {isStudentAppointmentsShown && (
          <Backdrop onMouseDown={closeStudentAppointmentsOnClick} id="close-on-click">
            <AppointmentStudentModal
              studentAppointments={studentAppointments}
              closeStudentAppointments={closeStudentAppointments}
              teachers={teachers}
              chosenTeacher={chosenTeacher}
            />
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default AppointmentsAdminPanel;
