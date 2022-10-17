import React from 'react';
import './index.scss';
import {Collection} from "./Collection";

const cats =[
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function App() {
    const [page,setPage]= React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryID, setCategoryId] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState('');
    const [collections, setCollections] = React.useState([]);

    React.useEffect(() =>{
        setIsLoading(true);

        const category = categoryID ? `category=${categoryID}` : '';

        fetch(
            `https://634a76a15df952851412108d.mockapi.io/cooollections?page=${page}&limit=3&${category}`)

            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            })
            .catch((err) =>{
                console.warn(err);
                alert('Error from fetch');
            }).finally(() => setIsLoading(false));

    }, [categoryID, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {cats.map((obj, i) => (
                    <li onClick={()=> setCategoryId(i)} className={categoryID === i ? 'active' : ''} key={obj.name}>{obj.name}</li>
                ))}
        </ul>
        <input value={searchValue}
               onChange={e => setSearchValue(e.target.value)}
               className="search-input"
               placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {isLoading ? ( <h2>Loading...</h2>
          ) : (collections.filter(obj =>{
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
          }).map((obj, index)=>(
              <Collection
                  key = {index}
                  name={obj.name}
                  images={obj.photos}
              />
          )))}
      </div>
      <ul className="pagination">
          {
              [...Array(5)].map((_, i) => (
                  <li onClick={() => setPage(i + 1)} className={page === i +1  ? 'active' : ''}>{i +1 }</li>
              ))}
      </ul>
    </div>
  );
}

export default App;
