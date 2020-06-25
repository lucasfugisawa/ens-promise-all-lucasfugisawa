const BASE_URL = 'https://www.dnd5eapi.co/api';

const request = (url) => {
  return fetch(url).then((resp) => resp.json())
};

export const getMonster = (index) => {
  return request(`${BASE_URL}/monsters/${index}`).then(({name, type}) => `${name} - ${type}`);
};