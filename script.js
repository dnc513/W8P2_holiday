function getBankHolidays() {
  fetch('https://www.gov.uk/bank-holidays.json')

    .then(function(response) {
      return response.json();
    })

    .then(function(data) {
      const holidays = data['england-and-wales'].events;
      const today = new Date();
      console.log(data);

      // find next holiday
      const next = holidays.find(function(h) {
        return new Date(h.date) > today;
      });

      // calculate days left
      const eventDate = new Date(next.date);
      const msPerDay = 24 * 60 * 60 * 1000;
      const daysLeft = Math.ceil(
        (eventDate.getTime() - today.getTime()) / msPerDay
      );

      // date formatting
      const dateStr = eventDate.toLocaleDateString('en-EN', {
        year: 'numeric', month: 'long', day: 'numeric'
      });

      // results display
      document.getElementById('result').innerHTML = `
        <h2>${daysLeft} days from now</h2>
        <p>${next.title}</p>
        <p>${dateStr}</p>
      `;
    });
}

getBankHolidays();
