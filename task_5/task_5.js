const listInput = document.querySelector('.list_input');
const listBtn = document.querySelector('.list_btn');
const userList = document.querySelector('.userList');
const errorMessage = document.querySelector('.message');

const userRequest = () => {
	return fetch(`https://jsonplaceholder.typicode.com/users/${listInput.value}/todos`)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			return json;
		})
		.catch(() => {console.log('error')});
}

function tasksList (tasks) {
	let list = '';
	for (var key in tasks) {
		const task = tasks[key]["title"];
		const finished = tasks[key]["completed"];
		let writeTask;
		if (finished) {
			writeTask = `<li style="text-decoration: line-through">${task}</li>`;
		} else {
			writeTask = `<li>${task}</li>`;
		}
		list = list + writeTask;
	}
	userList.innerHTML = list;
}

listBtn.addEventListener('click', async () => {
	const result = await userRequest();
	if (result.length > 0) {
		tasksList(result);
	} else {
		errorMessage.innerHTML = 'Пользователь с указанным id не найден!';
		tasksList(null);
	}
});