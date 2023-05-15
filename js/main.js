'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');
  const timeout = 300;

  /*OPEN FORM NEW STUDENT*/
  const wrapperNewStudent = document.querySelector('.wrapper-new-student');
  const openFormNewStudentBtn = document.querySelector(
    '.students__new-student-btn'
  );
  const closeFormNewStudentBtn = document.querySelector(
    '.new-student-form__close'
  );

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'; // разница между шириной всего viewport и шириной объекта, который находится внутри viewport. Т.е., получаем ширину скролла, который убирается при открытии popup. Это делается для того, чтобы при исчезновании/появлении скролла контент не двигался в стороны на ширину скролла.
    /*проверка наличие объектов lockPadding*/
    if (lockPadding.lenght > 0) {
      /*цикл для фиксированных объектов, чтобы не двигались при исчезновании/появлении скролла*/
      for (let index = 0; index < lockPadding.lenght; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
  }
  function bodyUnLock() {
    setTimeout(function () {
      /*проверка наличие объектов lockPadding*/
      if (lockPadding.lenght > 0) {
        for (let index = 0; index < lockPadding.lenght; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);
  }
  function openFormNewStudent() {
    bodyLock();
    if (!wrapperNewStudent.classList.contains('show')) {
      wrapperNewStudent.classList.add('show');
    }
    newStudentFormBtn.disabled = !checkInputs();
  }
  function closeFormNewStudent() {
    bodyUnLock();
    if (wrapperNewStudent.classList.contains('show')) {
      wrapperNewStudent.classList.remove('show');
    }
    allInputs.forEach(function (el) {
      el.value = '';
    });
    newStudentFormBtn.disabled = !checkInputs();
  }

  openFormNewStudentBtn.addEventListener('click', () => {
    openFormNewStudent();
  });
  closeFormNewStudentBtn.addEventListener('click', () => {
    closeFormNewStudent();
  });
  document.addEventListener('click', (element) => {
    if (!element.target.closest('.new-student-form, .students__new-student-btn')) {
      if (wrapperNewStudent.classList.contains('show')) {
        closeFormNewStudent();
      }
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      // код клавиши 27 (Esc)
      if (wrapperNewStudent.classList.contains('show')) {
        closeFormNewStudent();
      }
    }
  });

  // Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны). - ВЫПОЛНЕНО

  // Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

  /*TABLE*/
  const studentsListHTML = document.getElementById('students-list');
  const newStudentForm = document.getElementById("new-student");
  const allInputs = newStudentForm.querySelectorAll(".new-student-form-input");
  const today = new Date();
  const newStudentFormBtn = newStudentForm.querySelector('[type="submit"]');

  function checkInputs() {
    for (let i = 0; i < allInputs.length; i++) {
      if (!allInputs[i].value) {
        return false;
      }
    }
    return true;
  }

  newStudentFormBtn.disabled = !checkInputs();
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener("input", function () {
      newStudentFormBtn.disabled = !checkInputs();
    });
  }


  const studentsList = [
    {
      fullname: 'Хабиров Радий Фаритович',
      birthday: '1964-03-20',
      startstudy: '2019-09-01',
      faculty: 'Глава РБ',
    },
    {
      fullname: 'Иванов Заурбек Баклажанович',
      birthday: '1980-01-01',
      startstudy: '2018-09-01',
      faculty: 'Супергеройство',
    },
    {
      fullname: 'Кац Сигизмунд Абрамович',
      birthday: '1908-04-04',
      startstudy: '2019-09-01',
      faculty: 'Музыка',
    },
    {
      fullname: "Кадырова Анна Рамзановна",
      birthday: "1995-04-05",
      startstudy: "2020-09-01",
      faculty: "Астрономия",
    },
    {
      fullname: "Сигизмунд Екатерина Петровна",
      birthday: "1985-12-05",
      startstudy: "2019-09-01",
      faculty: "Проктология",
    },
    {
      fullname: "Иванова Анна Петровна",
      birthday: "2002-01-01",
      startstudy: "2022-09-01",
      faculty: "Юриспруденция",
    },
    {
      fullname: "John Smith Johnson",
      birthday: "1989-08-07",
      startstudy: "2021-09-01",
      faculty: "Developer",
    },
    {
      fullname: "Слепаков Семён Вахтангович",
      birthday: "1990-10-27",
      startstudy: "2020-09-01",
      faculty: "Юморист",
    },
    {
      fullname: "Садриев Салават Расильевич",
      birthday: "1989-03-18",
      startstudy: "2021-09-01",
      faculty: "Веб-разработчик",
    },
  ];

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

  function getStudentItem(studentObj) {
    const studentBitrhday = new Date(studentObj.birthday);
    const startStudyObj = new Date(studentObj.startstudy);

    let studAge = today.getFullYear() - studentBitrhday.getFullYear();

    if (
      today.getMonth() < studentBitrhday.getMonth() ||
      (today.getMonth() === studentBitrhday.getMonth() &&
        today.getDate() < studentBitrhday.getDate())
    ) {
      studAge--;
    }

    function formatDate(dateStr) {
      const day = dateStr.split('-')[2];
      const month = dateStr.split('-')[1];
      const year = dateStr.split('-')[0];
      return `${day}.${month}.${year}`;
    }

    const studentString = document.createElement("li");
    studentString.classList.add("students-list__string", "students-list-string");

    const fullname = document.createElement("span");
    fullname.classList.add("students-list-string__item", "students-list-item", "students-fullname");

    const faculty = document.createElement("span");
    faculty.classList.add("students-list-string__item", "students-list-item", "students-faculty");

    const birthdayStudent = document.createElement("span");
    birthdayStudent.classList.add("students-list-string__item", "students-list-item", "students-birthday");

    const period = document.createElement("span");
    period.classList.add("students-list-string__item", "students-list-item", "students-period");

    studentString.append(fullname);
    studentString.append(faculty);
    studentString.append(birthdayStudent);
    studentString.append(period);

    studentsListHTML.append(studentString);

    fullname.textContent = studentObj.fullname;
    faculty.textContent = studentObj.faculty;
    birthdayStudent.textContent = `${formatDate(studentObj.birthday)} (${studAge}лет)`;

    const yearsOfStudy = today.getFullYear() - startStudyObj.getFullYear();
    const monthsOfStudy = today.getMonth() - startStudyObj.getMonth();
    const daysOfStudy = today.getDate() - startStudyObj.getDate();

    let periodText = "";
    if (yearsOfStudy < 0) {
      periodText = "Дата начала обучения в будущем";
    }
    else if (yearsOfStudy <= 4 && (yearsOfStudy < 4 || monthsOfStudy <= 0 && daysOfStudy <= 0)) {
      periodText = `${startStudyObj.getFullYear()}-${startStudyObj.getFullYear() + 4} (${yearsOfStudy + 1} курс)`;
    }
    else {
      periodText = "(закончил)";
    }
    period.textContent = periodText;
  }

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
  function renderStudentsTable(studentsArray) {
    studentsListHTML.innerHTML = "";

    const filterFullname = document.getElementById("filter-fullname").value;
    const filterFaculty = document.getElementById("filter-faculty").value;
    const filterStartStudy = document.getElementById("filter-startstudy").value;
    const filterEndStudy = document.getElementById("filter-endstudy").value;
    const filterInputs = document.querySelectorAll(".students-filter-form__input");

    let newArr = [...studentsArray];

    if (filterFullname !== "") {
      newArr = filter(newArr, "fullname", filterFullname);
    }
    if (filterFaculty !== "") {
      newArr = filter(newArr, "faculty", filterFaculty);
    }
    if (filterStartStudy !== "") {
      newArr = filter(newArr, "startstudy", filterStartStudy);
    }
    if (filterEndStudy !== "") {
      for (let i = 0; i < newArr.length; i++) {
        let endstudy = new Date(newArr[i].startstudy);
        endstudy.setFullYear(endstudy.getFullYear() + 4);
        newArr[i].endstudy = endstudy;
      }
      // newArr = studentsArray.map(item => {
      //   let endstudy = new Date(item.startstudy);
      //   endstudy.setFullYear(endstudy.getFullYear() + 4);
      //   item.endstudy = endstudy;
      //   return item;
      // });
      newArr = filter(newArr, "endstudy", filterEndStudy);
    }

    for (const item of newArr) {
      getStudentItem(item);
    }
    filterInputs.forEach((e) => {
      e.value = "";
    });
  }

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
  newStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    for (let i = 0; i < allInputs.length; i++) {
      if (!allInputs[i].value) {
        return;
      }
    }

    const studentObj = new Object();

    studentObj.fullname = `${document.querySelector('.new-student-form-input--lastname').value.trim()} ${document.querySelector('.new-student-form-input--firstname').value.trim()} ${document.querySelector('.new-student-form-input--middlename').value.trim()}`;
    studentObj.birthday = document.querySelector('.new-student-form-input--birthday').value;
    studentObj.startstudy = document.querySelector('.new-student-form-input--start').value;
    studentObj.faculty = document.querySelector('.new-student-form-input--faculty').value;

    studentsList.push(studentObj);

    renderStudentsTable(studentsList);

    allInputs.forEach(function (el) {
      el.value = '';
    });
    closeFormNewStudent();
  });

  /*validation-form*/
  new JustValidate("#new-student", {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      lastname: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      middlename: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
      faculty: {
        required: true,
        minLength: 2,
        maxLength: 30
      },
    },
    messages: {
      name: {
        required: 'Введите имя',
        minLength: 'Минимальное значение 2 символа',
        maxLength: 'Максимальное значение 30 символов'
      },
      lastname: {
        required: 'Введите фамилию',
        minLength: 'Минимальное значение 2 символа',
        maxLength: 'Максимальное значение 30 символов'
      },
      middlename: {
        required: 'Введите отчество',
        minLength: 'Минимальное значение 2 символа',
        maxLength: 'Максимальное значение 30 символов'
      },
      faculty: {
        required: 'Введите факультет',
        minLength: 'Минимальное значение 2 символа',
        maxLength: 'Максимальное значение 30 символов'
      },
    }
  });

  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
  const sortStudents = (arr, prop, dir = false) => arr.sort((a, b) => ((!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 1));

  const studentsTitle = document.querySelectorAll(".students-captions-title");

  Array.from(studentsTitle).forEach((element) => {
    element.addEventListener("click", (elem) => {

      let datasetTitle = elem.currentTarget.dataset.property;

      element.classList.toggle("up");

      if (element.classList.contains("up")) {
        sortStudents(studentsList, datasetTitle, true);
      } else {
        sortStudents(studentsList, datasetTitle, false);
      }

      renderStudentsTable(studentsList);
    });
  });
  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
  document.getElementById("filter-form").addEventListener("submit", function (elem) {
    elem.preventDefault();

    renderStudentsTable(studentsList);
  });
  renderStudentsTable(studentsList);

  function filter(arr, prop, value) {
    let result = [];
    let copy = [...arr];
    for (const item of copy) {
      if (String(item[prop]).includes(value) == true) {
        result.push(item);
      }
    }
    return result;
  }
});
