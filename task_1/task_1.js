const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlResult = parser.parseFromString(xmlString, "text/xml");
let student = xmlResult.querySelectorAll('student');
let result = [];

student.forEach(item => {
    let studResult = {
      name: `${item.querySelector('first').textContent} ${item.querySelector('second').textContent}`,
      year: `${item.querySelector('age').textContent}`,
      prof: `${item.querySelector('prof').textContent}`,
      lang: `${item.querySelector('name').getAttribute('lang')}`
    }

    result.push(studResult);
})

let end = {};
end['list']=result;
console.log(end)