import React from 'react'
import Header from './Header';
import { Route, Link, } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

export default function MenuEdit() {
  
    const [selectedOptions, setSelectedOptions] = useState([]);
    function onChange(value, event) {
      if (event.action === "select-option" && event.option.value === "*") {
        this.setState(this.options);
      } 
      else if (event.action === "deselect-option" && event.option.value === "*") {
        this.setState([]);
      } 
      else if (event.action === "deselect-option") {
        this.setState(value.filter((o) => o.value !== "*"));
      } 
      else if (value.length === this.options.length - 1) {
        this.setState(this.options);
      } 
      else {
        this.setState(value);
      }
    }
    const AllergenSelect = () => {   
      const allergenOptions = [
        {
          value: "celery",
          label: "Cellery"
        },
        {
          value: "crustaceans",
          label: "Crustaceans"
        },
        {
          value: "eggs",
          label: "Eggs"
        },
        {
          value: "fish",
          label: "Fish"
        },
        {
          value: "gluten",
          label: "Gluten"
        },
        {
          value: "lupin",
          label: "Lupin"
        },
        {
          value: "milk",
          label: "Milk"
        },
        {
          value: "molluscs",
          label: "Molluscs"
        },
        {
          value: "mustard",
          label: "Mustard"
        },
        {
          value: "peanuts",
          label: "Peanuts"
        },
        {
          value: "sesame",
          label: "Sesame seeds"
        },
        {
          value: "soybeans",
          label: "Soybeans"
        },
        {
          value: "sulphur_dioxide_and_sulphates",
          label: "Sulfur dioxide and sulphites"
        },
        {
          value: "tree_nuts",
          label: "Tree nuts"
        }
      ];
      return (
        <div>
          <ReactMultiSelectCheckboxes
            getDropdownButtonLabel={ getDropdownButtonLabel }
            placeholderButtonLabel="Allergens"
            options={ allergenOptions }
            value={ selectedOptions }
            onChange={ onChange }
            setState={ setSelectedOptions }
          />
        </div>
      );
    }
    function getDropdownButtonLabel({ value }) {
      return `${ value.length } selected`;
    }
  
    const [file, setFile] = useState(null);
    function handleFileChange(event) {
      setFile(event.target.files[0])
    }
  
    function onPictureUpload() {
      let formData = new FormData();
      formData.append("file", file);
      axios.post('http://localhost:8080/kuvatesti', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (response) {
        console.log(response)
      });
    }  
    
  
    const onProductAddition = (event) => {
      event.preventDefault();
      let formData = new FormData();
      let allergens = [];
      selectedOptions.map((item) => {
        allergens.push(item.value)
      });
      formData.append("productName", event.target.productName.value);
      formData.append("price", event.target.price.value);
      formData.append("allergens", allergens);
      formData.append("ingredients", event.target.ingredients.value);
      formData.append("energyContent", event.target.energyContent.value);
      formData.append("description", event.target.description.value);
      formData.append("type", event.target.type.value);
      formData.append("file", file);
      axios.post('http://localhost:8080/addproductcontentsandpicture', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (response) {
        console.log(response);
      })
    }
  
    const CreateProductTypeOptions = () => {
      const options = [
        'appetizer',
        'main dish',
        'dessert',
        'drink',
        'extras',
        'other'
      ];
      return(
        options.map((item) => {
          return <option value={item}> {item} </option>;
        })
      )
    }
  
    const userLoggedIn = 'peksi';
    const CreateRestaurantTypeOptions = () => {
      const options = [
        'Fastfood',
        'Fine dining',
        'Buffet',
        'Fast casual',
        'Casual dining'
      ];
      return(
        options.map((item) => {
          return <option value={item}> {item} </option>;
        })
      )
    }
  
    const onResturantAddition = (event) => {
      event.preventDefault();
      let formData = new FormData();
      formData.append("restaurantName", event.target.restaurantName.value);
      formData.append("restaurantAddress", event.target.restaurantAddress.value);
      formData.append("restaurantUserName", userLoggedIn);
      formData.append("restaurantEmail", event.target.restaurantEmail.value);
      formData.append("restaurantPhoneNumber", event.target.restaurantPhoneNumber.value);
      formData.append("restaurantStyle", event.target.restaurantStyle.value);
      formData.append("restaurantPriceRange", event.target.restaurantPriceRange.value);
      formData.append("restaurantCity", event.target.restaurantCity.value);
      formData.append("openinghours", event.target.openinghours.value);
      formData.append("file", file);
      axios.post('http://localhost:8080/addrestaurantandpicture', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(function (response) {
        console.log(response);
      })
    }
  
    return (
        <div className='Main2'>
        <h1>Ravintolan profiili</h1>
    
    <div className='form'>
      
      <div className='formbuttons'>
      <button>Muokkaa tietoja</button>
      <Link to="/menuedit"><button>Ruokalistan muokkaus</button></Link>
      <button>Tilaushistoria</button>
      <button><b>Takaisin</b></button>
      </div>
        <div className='forminner'>
        <div className='restaurantprofileEdit'>
        
        
        <h2>Add new product</h2>
        <form onSubmit={ onProductAddition }>
          <div className=""><div className=''>Product name: </div> <input type="text" name="productName"/></div>
          <div className=""><div className=''>Price: </div> <input type="text" name="price"/></div>
          <div className=""><div className=''>Allergens: </div> <AllergenSelect /></div>
          <div className=""><div className=''>Product ingredients: </div> <input type="text" name="ingredients"/></div>
          <div className=""><div className=''>Energy content: </div> <input type="number" name="energyContent"/></div>
          <div className=" "><div className=''>Product description: </div> <input type="text" name="description"/></div>
          <div className="">
            <div className=''>Product type: </div>
            <select className="" name="type" >
              <CreateProductTypeOptions /> 
            </select>
          </div>
          <div className="">
            <div className=''>Product picture: </div>
            <input type="file"
              name="productPicture"
              accept=".jpg, .jpeg, .png"
              onChange={ handleFileChange }>
            </input>
            <div className=''>Picture must be in jpg or png format </div>
          </div>
          <button className=''>Add product</button>
        </form>
       
        
      </div>
           <div>Product name: </div> <input type="text" name="productName"/>
           <label>Osoite:</label><input></input>
           <label>Tyyli:</label><input></input>
           <label>Hintataso:</label><input></input>
           <label>Käyttäjänimi:</label><input></input>
           <label>Salasana:</label><input></input>
        
       <div className='vaihdabutton'> 
         <button>Vaihda tiedot</button> <br></br>
         
         
             
        
</div>
    </div>
    </div>
  )

      </div> 
    )
  }