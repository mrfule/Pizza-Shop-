
import './App.css';
import Axios from 'axios'
import React , { useState ,useEffect  } from 'react';

function App() {

  
  const [name , setName] = useState('');
  const [desc , setDesc] = useState('');
  const [type , setType] = useState('');
  const [price , setPrice] = useState('');
  const [pizzaList , setPizzaList] = useState([]);
  const [newPrice , setNewPrice] = useState('')
  const [TotalPrice , setTotalPrice] = useState('')
  const [sum , setSum] = useState([]);
  const [address , setAddress] = useState('');
  const [number , setNumber] = useState('');
  const [addressList , setAddressList] = useState([]);
  


  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response) =>{
      setPizzaList(response.data);
      console.log(response.data);
    });

  },[]);

  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get/address").then((response) =>{
      setAddressList(response.data);
      console.log(response.data);
    });

  },[]);

  const total = () =>{
    console.log('in totel')
    Axios.get("http://localhost:3001/api/total").then((response) =>{
      const p=response.data;
      setSum(p);
      p.map((val) => {
        setTotalPrice(val.summ);
      })
    })
  }


  const submit = () =>{
    console.log('in button');
    Axios.post('http://localhost:3001/api/insert', {Name : name ,
       Desc : desc, Type : type, Price : price, 
      });
      setPizzaList([...pizzaList,{Name : name ,
        Desc : desc, Type : type, Price : price, 
       }]); 
       
      Axios.post('http://localhost:3001/api/insert/Address',{Name :name ,
      Address : address , Number : number
      });

      setAddress([...addressList , {Name :name ,
        Address : address , Number : number
      }])
  }; 



  const deleteRev =(name) =>{
    Axios.delete(`http://localhost:3001/api/delete/${name}`);
  }

  const update = (nname) =>{
    Axios.put('http://localhost:3001/api/update' , {Name : nname ,
    price : newPrice, 
   })
   setNewPrice('');
  }

  return (
    <div className="App">
      <h1>Pizza Ordering System</h1>
      <div className="form">
        <div className="row">

          <label>Pizza Name</label>
          <input type="text" name="name" onChange={(e)=>{
            setName(e.target.value);
          }}></input>
          <label>desc</label>
          <input type="text" name="desc" onChange={(e) =>{
            setDesc(e.target.value);
          }}></input>
          <label>type</label>
          <input type="text" name="type" onChange={(e) =>{
            setType(e.target.value);
          }}></input>
          <label>price</label>
          <input type="text" name="price" onChange={(e) =>{
            setPrice(e.target.value);
          }}></input>
          <label>address</label>
          <input type="text" name="price" onChange={(e) =>{
            setAddress(e.target.value);
          }}></input>
          <label>Number</label>
          <input type="text" name="price" onChange={(e) =>{
            setNumber(e.target.value);
          }}></input>
          <br/>
        </div>
        <div className='row'>
            <button onClick={submit}>Order</button>
        </div>
        
        {pizzaList.map((val) => {
          return <div className="cart">
            <h3>PizaaName : {val.name}</h3>
            <h3>Price : {val.price}</h3>
           {/* {setTotalPrice(val.price)} */}
            <button onClick={() => {deleteRev(val.name)}}>Delete</button>


            <input type="text" onChange={(e) => {
              setNewPrice(e.target.value)
            }}></input>
            <button onClick={() => {
              update(val.name)
            }}>Update</button>
          </div>
        })}


        <h1>Address List</h1>
        {addressList.map((val) =>{
          return <div>
              <h3>Name : {val.name}</h3>
              <p>Adress : {val.name} <br/>
                Number : {val.number}
              </p>
          </div>
        })}
        
          <div>
            <button onClick={total}>TotalPrice</button>
            <h4>TotalPrice : {TotalPrice}</h4>
          </div>
          
        

        
      </div>
    </div>
  );
}

export default App;
