import {
  AppointmentModal,
  AppointmentSpan,
  HeaderCellBody,
  StudentAppointmentBody,
  StudentAppointmentBox,
  StudentAppointmentList,
  StudentAppointmentListItem,
  StudentCoursePurchased,
  StudentInfo,
  StudentInfoText,
  StudentInfoTextHighlight,
} from './AppointmentsAdminPanel.styled';

export const AppointmentStudentModal = ({
  studentAppointments,
  closeStudentAppointments,
  teachers,
  chosenTeacher,
  showTrialsOnly,
}) => {
  const getStatusLabel = status => {
    switch (status) {
      case '0':
        return 'Очікує';
      case '1':
        return 'Проведено';
      case '-1':
        return "Не з'явився";
      default:
        return '';
    }
  };

  return (
    <AppointmentModal>
      <StudentInfo>
        <StudentInfoText>
          Ім'я студента:{' '}
          <StudentInfoTextHighlight>
            {studentAppointments[0].leadName}
          </StudentInfoTextHighlight>
        </StudentInfoText>
        <StudentInfoText>
          CRM:{' '}
          <StudentInfoTextHighlight>
            <a
              href={`https://apeducation.kommo.com/leads/detail/${studentAppointments[0].leadId}`}
              target="_blank"
              rel="noreferrer"
            >
              {studentAppointments[0].leadId}
            </a>
          </StudentInfoTextHighlight>
        </StudentInfoText>
        <StudentInfoText>
          Записів за цей період:{' '}
          <StudentInfoTextHighlight>
            {studentAppointments.length}
          </StudentInfoTextHighlight>
        </StudentInfoText>
        <StudentInfoText>
          У викладача{' '}
          <StudentInfoTextHighlight>{chosenTeacher.name}</StudentInfoTextHighlight>:{' '}
          <StudentInfoTextHighlight>
            {
              studentAppointments.filter(
                studentAppointment =>
                  studentAppointment.teacherId === String(chosenTeacher.altegioId)
              ).length
            }
          </StudentInfoTextHighlight>
        </StudentInfoText>
        <StudentInfoText>
          З них проведено:{' '}
          <StudentInfoTextHighlight>
            {
              studentAppointments.filter(
                studentAppointment =>
                  studentAppointment.teacherId === String(chosenTeacher.altegioId) &&
                  studentAppointment.status === '1' &&
                  !studentAppointment.isDeleted
              ).length
            }
          </StudentInfoTextHighlight>
        </StudentInfoText>
        <StudentInfoText>
          Не проведено:{' '}
          <StudentInfoTextHighlight>
            {
              studentAppointments.filter(
                studentAppointment =>
                  studentAppointment.teacherId === String(chosenTeacher.altegioId) &&
                  studentAppointment.status === '-1' &&
                  !studentAppointment.isDeleted
              ).length
            }
          </StudentInfoTextHighlight>
        </StudentInfoText>
        <StudentInfoText>
          Очікуються:{' '}
          <StudentInfoTextHighlight>
            {
              studentAppointments.filter(
                studentAppointment =>
                  studentAppointment.teacherId === String(chosenTeacher.altegioId) &&
                  studentAppointment.status !== '1' &&
                  studentAppointment.status !== '-1' &&
                  !studentAppointment.isDeleted
              ).length
            }
          </StudentInfoTextHighlight>
        </StudentInfoText>
        <StudentInfoText>
          Видалено:{' '}
          <StudentInfoTextHighlight>
            {
              studentAppointments.filter(
                studentAppointment => studentAppointment.isDeleted
              ).length
            }
          </StudentInfoTextHighlight>
        </StudentInfoText>
        {showTrialsOnly && (
          <>
            <StudentInfoText>
              Курс придбав(-ла):{' '}
              <StudentInfoTextHighlight>
                {studentAppointments.some(
                  studentAppointment => studentAppointment.courseePurchaseDate
                ) ? (
                  <StudentCoursePurchased className="yes">Так</StudentCoursePurchased>
                ) : (
                  <StudentCoursePurchased className="no">Ні</StudentCoursePurchased>
                )}
              </StudentInfoTextHighlight>
            </StudentInfoText>

            {(() => {
              const purchasedCourses = studentAppointments.filter(
                studentAppointment => studentAppointment.leadPurchasedCourse
              );

              return purchasedCourses.length > 0 ? (
                <>
                  <StudentInfoText>
                    Дата придбання:{' '}
                    {purchasedCourses.map(appointment => (
                      <StudentInfoTextHighlight>
                        {new Date(appointment.courseePurchaseDate).toLocaleString(
                          'uk-UA',
                          {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </StudentInfoTextHighlight>
                    ))}
                  </StudentInfoText>
                  <StudentInfoText>
                    У викладача(-ів):{' '}
                    {teachers
                      .filter(teacher =>
                        purchasedCourses
                          .map(appointment => appointment.teacherId)
                          .includes(String(teacher.altegioId))
                      )
                      .map(teacher => (
                        <StudentInfoTextHighlight>
                          {teacher.name}
                        </StudentInfoTextHighlight>
                      ))}
                  </StudentInfoText>
                </>
              ) : null;
            })()}
          </>
        )}
      </StudentInfo>
      <StudentAppointmentBox>
        <HeaderCellBody>
          <AppointmentSpan componentWidth="6em">ID Запису</AppointmentSpan>
          <AppointmentSpan componentWidth="8em">Тип</AppointmentSpan>
          <AppointmentSpan componentWidth="15em">Дата і час запису</AppointmentSpan>
          <AppointmentSpan componentWidth="15em">Тічер</AppointmentSpan>
          <AppointmentSpan componentWidth="8em">Статус запису</AppointmentSpan>
        </HeaderCellBody>
        <StudentAppointmentList>
          {studentAppointments
            .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))
            .map(appointment => (
              <StudentAppointmentListItem key={appointment._id}>
                <StudentAppointmentBody
                  dataStatus={appointment.status}
                  deleted={appointment.isDeleted}
                >
                  <AppointmentSpan componentWidth="6em">
                    <a
                      href={`https://app.alteg.io/timetable/761978#open_modal_by_record_id=${appointment.appointmentId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {appointment.appointmentId}
                    </a>
                  </AppointmentSpan>
                  <AppointmentSpan componentWidth="8em">
                    {appointment.IsTrial ? 'Пробне' : 'Індивідуальне'}
                  </AppointmentSpan>
                  <AppointmentSpan componentWidth="15em">
                    {(() => {
                      const str = new Date(appointment.startDateTime).toLocaleString(
                        'uk-UA',
                        {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      );
                      return str[0].toUpperCase() + str.slice(1);
                    })()}{' '}
                    -{' '}
                    {new Date(appointment.endDateTime).toLocaleTimeString('uk-UA', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </AppointmentSpan>
                  <AppointmentSpan componentWidth="15em">
                    {teachers.find(
                      teacher => appointment.teacherId === String(teacher.altegioId)
                    )?.name || 'Не вказано'}
                  </AppointmentSpan>
                  <AppointmentSpan componentWidth="8em">
                    {getStatusLabel(appointment.status)}
                  </AppointmentSpan>
                </StudentAppointmentBody>
              </StudentAppointmentListItem>
            ))}
        </StudentAppointmentList>
      </StudentAppointmentBox>
    </AppointmentModal>
  );
};
