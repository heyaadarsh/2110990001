const WINDOW_SIZE = 10;
const API_TIMEOUT = 500;
const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTA4NTQyLCJpYXQiOjE3MTc1MDgyNDIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE5YzBjNzkwLTAxOTUtNDYxMy04MjM5LTkwYWJhNjIxYjcxOSIsInN1YiI6ImFhZGFyc2gwMDAxLmJlMjFAY2hpdGthcmEuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkTWVkIiwiY2xpZW50SUQiOiJhOWMwYzc5MC0wMTk1LTQ2MTMtODIzOS05MGFiYTYyMWI3MTkiLCJjbGllbnRTZWNyZXQiOiJDYlJobWdwTlV5emRKTnhZIiwib3duZXJOYW1lIjoiQWFkYXJzaCBLdW1hciIsIm93bmVyRW1haWwiOiJhYWRhcnNoMDAwMS5iZTIxQGNoaXRrYXJhLmVkdS5pbiIsInJvbGxObyI6IjIxMTA5OTAwMDEifQ.syB3GiG-NHNI82khS9RSvP-0GERVAmOHowj6bbwiKWM";

const API_URLS = {
  p: "http://20.244.56.144/test/primes",
  f: "http://20.244.56.144/test/fibo",
  e: "http://20.244.56.144/test/even",
  r: "http://20.244.56.144/test/rand",
};

let numbersWindow = [];

function fetchNumbers() {
  const identifier = document.getElementById("identifier").value;
  const url = API_URLS[identifier];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  fetch(url, {
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      clearTimeout(timeoutId);
      const newNumbers = data.numbers || [];
      updateWindow(newNumbers);
    })
    .catch((error) => console.error("Error fetching numbers:", error));
}

function updateWindow(newNumbers) {
  const prevState = [...numbersWindow];
  const uniqueNumbers = [...new Set([...numbersWindow, ...newNumbers])];
  if (uniqueNumbers.length > WINDOW_SIZE) {
    numbersWindow = uniqueNumbers.slice(uniqueNumbers.length - WINDOW_SIZE);
  } else {
    numbersWindow = uniqueNumbers;
  }
  const currState = [...numbersWindow];
  const average =
    currState.length > 0
      ? currState.reduce((a, b) => a + b, 0) / currState.length
      : 0;

  document.getElementById("prevState").innerText = prevState.join(", ");
  document.getElementById("currState").innerText = currState.join(", ");
  document.getElementById("newNumbers").innerText = newNumbers.join(", ");
  document.getElementById("average").innerText = average.toFixed(2);
}
