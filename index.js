let button = document.getElementById("button");
let input = document.getElementById("input");

button.addEventListener("click", () => {
  fetch(
    "http://api.weatherapi.com/v1/current.json?key=95aff579fb9c4b07bc104341240501&q=" +
      `${input.value}` +
      "&aqi=no"
  )
    .then((response) => {
      response.json();
      if (response.status === 400) {
        throw new Error(false);
      }
    })
    .then((response) => showLocation(response))
    .catch(() => undefinedLocation());
});

function showLocation(response) {
  let infoCuacaSection = document.getElementById("infoCuacaSection");
  let wrapper = document.createElement("div");

  infoCuacaSection.innerHTML = "";

  wrapper.setAttribute(
    "class",
    "relative overflow-x-auto shadow-md sm:rounded-lg"
  );

  let tableCuaca = document.createElement("div");

  tableCuaca.innerHTML = `<table class="w-[800px] md:w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Kota
                </th>
                <th scope="col" class="px-6 py-3">
                    Provinsi
                </th>
                <th scope="col" class="px-6 py-3">
                    Negara
                </th>
                <th scope="col" class="px-6 py-3">
                    Temperatur
                </th>
                <th scope="col" class="px-6 py-3">
                    Kondisi
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${response.location.name}
                </th>
                <td class="px-6 py-4">
                    ${response.location.region}
                </td>
                <td class="px-6 py-4">
                    ${response.location.country}
                </td>
                <td class="px-6 py-4">
                    ${response.current.temp_c}&degC
                </td>
                <td class="px-6 py-4">
                    <img src="${response.current.condition.icon}"/>
                </td>
            </tr>
        </tbody>
    </table>`;

  wrapper.appendChild(tableCuaca);
  infoCuacaSection.appendChild(wrapper);
}

function undefinedLocation() {
  let infoCuacaSection = document.getElementById("infoCuacaSection");
  let wrapper = document.createElement("div");

  infoCuacaSection.innerHTML = "";

  wrapper.setAttribute(
    "class",
    "relative overflow-x-auto shadow-md sm:rounded-lg"
  );

  let tableCuaca = document.createElement("div");

  tableCuaca.innerHTML = `<h1 class="text-white text-center text-md md:text-2xl font-bold">404, Maaf daerah yang anda cari tidak ditemukan :(</h1>`;

  wrapper.appendChild(tableCuaca);
  infoCuacaSection.appendChild(wrapper);
}
