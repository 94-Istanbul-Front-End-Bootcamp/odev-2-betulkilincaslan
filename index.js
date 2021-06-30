let data = [];
let formDOM = document.querySelector("#filterForm");
let cbAdult = document.querySelector("#cbAdult");
let cbActive = document.querySelector("#cbActive");

const fetchData = () => {
  fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      data = responseData;
      formDOM.classList.toggle("d-none");

      //verinin html içerisinde listelendiği fonksiyon
      listData(responseData);
    })
    .catch((err) => {
      //hata yönetimi
      console.log(err);
    });
};
//verinin ul tag'i içerisinde listelenmesini sağlayan fonksiyon
const listData = (data) => {
  let list = document.querySelector(".list");
  list.classList.add("fw-bold");
  list.innerHTML = data.map((element) => {
    return `
          <li class="d-flex flex-column" id=${element.id}>
          <span>Name : ${element.name} </span>
          <span>email : ${element.age}</span>
          <span>IsActive : ${element.isActive}</span>
          </li>
          `;
  });
};

const filterData = (filter) => {
  switch (filter) {
    case "isActive":
      let activeUsers = data.filter((item) => item.isActive == true);
      cbActive.checked == true ? listData(activeUsers) : listData(data);
      break;
    case "adult":
      let adultUsers = data.filter((item) => item.age >= 18);
      cbAdult.checked == true ? listData(adultUsers) : listData(data);
      break;
    //Burada her ikisi de check olunca ortak filtreleme yapsın istedim yemedi :)
    // case "activeAdult":
    //   let activeAdultUsers = data.filter(
    //     (item) => item.age >= 18 && item.isActive == true
    //   );
    //   listData(activeAdultUsers);
    //   break;
    case "nameFilter":
      let inputValue = document.querySelector("#inputValue").value;
      let matchUsers = data.filter(
        (item) => item.name.charAt(0) === inputValue.toUpperCase()
      );
      listData(matchUsers);
      break;
    default:
      break;
  }
};
filterData();

formDOM.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  console.log("asdj");
}
