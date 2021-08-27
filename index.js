const app = require('express')();
const express = require('express');
const cors = require('cors');
const Crawler = require('node-html-crawler');
const cheerio = require('cheerio');
const requests = require('requests');
app.use(cors());
app.use(express.json());
let MovieData = [];
let body = '';
app.get('/api/home',(req,res)=>{
requests('https://www1.dramacool.ai/').on('data',(data)=>{
        let $ = cheerio.load(data);  
      $('a.img').each(function(i,element){
    
          MovieData.push({
              url:$(this).attr('href'),
              title:$('h3.title').eq(i).text(),
              image_url:$('img.lazy').eq(i).attr('data-original'),
              ep_number:$('span.ep').eq(i).text(),
          })
      })
      res.send(MovieData);
})

})

app.post('/api/watch',(req,res)=>{
    let url = req.body.url;
    requests(url).on('data',(data)=>{
        let $ = cheerio.load(data);
      res.send($('iframe').attr('src'));
})

})

app.get('/api/search',(req,res)=>{
    requests('https://www1.dramacool.ai/search?type=movies&keyword='+req.query['q']).on('data',(data)=>{
        let $ = cheerio.load(data);  
      $('a.img').each(function(i,element){
    
          MovieData.push({
              url:$(this).attr('href'),
              title:$('h3.title').eq(i).text(),
              image_url:$('img.lazy').eq(i).attr('data-original'),
          })
      })
      res.send(MovieData);
})

})

app.listen(3003,()=>console.log('hello world'))