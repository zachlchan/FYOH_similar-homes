const axios = require('axios');
const fs = require('fs');
const getImages = () => {
  let search_terms = ['hobbit,house'];
  for (let i = 1; i <= 1000; i++) {
    search_term = search_terms[i % 1];
    axios({
      method: 'get',
      url: `https://source.unsplash.com/320x180/?${search_term}`,
      responseType: 'stream',
    }).then((res) => {
      res.data.pipe(fs.createWriteStream(`/Users/zach/Hack Reactor/HRSF131/SDC/home_pictures/${i}.jpg`));
    });
  }
}
getImages();