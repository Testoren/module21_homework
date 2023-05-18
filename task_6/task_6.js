const inputNumber = document.querySelector(".pgNumb");
const inputLimit = document.querySelector(".limit");
const submit = document.querySelector(".btn");
const outText = document.querySelector(".text");
const photoBloke = document.querySelector(".photo");

function answer(text) {
  outText.innerHTML = text;
}

if (loadPhotosLocal())
  answer("Загружены последние просмотренные фото.");

function submitButtonHandle() {
  const page_Number = inputNumber.value;
  const limit = inputLimit.value;

  if (
    (page_Number < 1 || page_Number > 10 || isNaN(page_Number)) &&
    (limit < 1 || limit > 10 || isNaN(limit))
  ) {
    answer("Номер страницы и лимит вне диапазона от 1 до 10.");
    return;
  } else if (page_Number < 1 || page_Number > 10 || isNaN(page_Number)) {
    answer("Номер страницы вне диапазона от 1 до 10.");
    return;
  } else if (limit < 1 || limit > 10 || isNaN(limit)) {
    answer("Лимит вне диапазона от 1 до 10.");
    return;
  }

  answer("Загрузка фото");

  fetch(`https://picsum.photos/v2/list?page=${page_Number}&limit=${limit}`)
    .then((response) => response.json())
    .then((json) => {
      loadPhoto(json);
      savePhotosLocal();
      answer("Фото загружены.");
    })
    .catch((reason) => {
      answer(`Ошибка:  + ${reason}`);
    });
}

function loadPhoto(data) {
  let card = String();
  data.forEach((item) => {
    const blockCard = `
            <div>
                <img
                  src="${item.download_url}"
                  style="width: 150px; margin-right: 30px"
                  />
                  <div>${item.author}</div>
            </div>`;
    card += blockCard;
  });
  photoBloke.innerHTML = card;
}

function savePhotosLocal() {
  localStorage.setItem("last_photos", photoBloke.innerHTML);
}

function loadPhotosLocal() {
  photoBloke.innerHTML = localStorage.getItem("last_photos");
  return photoBloke.innerHTML.length > 0;
}

submit.addEventListener("click", submitButtonHandle);


