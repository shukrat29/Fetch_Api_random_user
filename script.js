let userList = [];
const api = 'https://randomuser.me/api/?results=6';

const userListElm = document.getElementById('list');

const fetchUers = async (url = api) => {
  //   const user = fetch(api);
  //   console.log(user);

  //promise method
  //   fetch(api)
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data.results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //async/await

  try {
    const response = await fetch(url);
    const data = await response.json();
    userList = data.results;

    dispaly(userList);
  } catch (error) {
    console.log(error);
  }
};

fetchUers();

const dispaly = (userList) => {
  let usrCard = '';

  userList.forEach((usr) => {
    usrCard += `
    <div class="card flex-grow-1" style="width: 18rem">
    <img
      src="${usr.picture.large}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title"> ${usr.name.title} ${usr.name.first} ${usr.name.last}</h5>
      <ul class="list-unstyled">
        <li>${usr.cell}</li>
        <li>emial@myemail.col-md</li>
        <li>
        ${usr.location.street.number}
        ${usr.location.street.name}
        ${usr.location.city}
        ${usr.location.country}
        </li>
      </ul>
    </div>
    </div>
    `;
  });
  userListElm.innerHTML = usrCard;
  document.getElementById('userCount').innerText = userList.length;
};

const handleOnGenderSelect = (e) => {
  const g = e.value;
  const urlWg = api + '&gender=' + g;
  fetchUers(urlWg);
};

document.getElementById('search').addEventListener('keyup', (e) => {
  const searchedname = e.target.value.toLowerCase();

  const filteredUser = userList.filter((usr) => {
    const fullName = (usr.name.first + ' ' + usr.name.last).toLowerCase();
    return fullName.includes(searchedname);
  });

  dispaly(filteredUser);
});
