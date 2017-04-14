import fetch from 'isomorphic-fetch';

export default function(longUrl){
  const API_KEY = `AIzaSyDqi8LMI6octRjoogtKCRZ8gC3EfCpz91g`;
  return fetch(`https://www.googleapis.com/urlshortener/v1/url?key=${API_KEY}`, {
    method : 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      longUrl
    })
  })
  .then(r=>r.json())
  .then(res => res.id)
  .catch(console.log)
}
