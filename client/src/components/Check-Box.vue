<template>

  
    <div class="custom-check"> 
 
 <input type="checkbox" :id="id" v-model="check" :disabled="disabled == true ? 'disabled' : null" /> 
 
 <label class="checkbox" :for="id">{{ label }}
    Modo Tabela
</label> 
 
<slot></slot>
 
 </div>
 
 </template>
 
 <script>
 
 export default {
     name: 'Check-Box',
     components: {
     
     },
     
     
     data() { 
 
 return { 
 
   check: false, 
 
 }; 
 
 }, 
 
 watch: { 
 
 checked(v) { 
 
   this.check = v; 
 
 }, 
 
 indeterminate: { 
 
   handler(v) { 
 
     this.$nextTick(() => { 
 
       this.$el.querySelector("input").indeterminate = v; 
 
     }); 
 
   }, 
 
   immediate: true, 
 
 }, 
 
 }, 
 
 props: { 
 
 checked: { 
 
   type: Boolean, 
 
   required: true, 
 
 }, 
 
 label: { 
 
   type: String, 
 
   required: true, 
 
 }, 
 
 disabled: { 
 
   type: Boolean, 
 
   default: null, 
 
 }, 
 
 indeterminate: { 
 
   type: Boolean, 
 
   default: false, 
 
 }, 
 
 }, 
 
 computed: { 
 
 id() { 
 
   return `${Date.now()}-${Math.random().toString(36).substring(7)}`; 
 
 }, 
 
 }, 
 
 mounted() { 
 
 this.check = this.checked === true ? true : false; 
 
 this.$watch("check", (v) => this.$emit("on-change", v)); 
 
 }, 
 
 }; 
 </script>
 
 <style>
 
 
 
 
 
  
 
 .custom-check input { 
 
  
 
   border: none !important; 
 
   clip: rect(0, 0, 0, 0) !important; 
 
   height: 0.01em !important; 
 
   overflow: hidden !important; 
 
   padding: 0 !important; 
 
   position: absolute !important; 
  
   white-space: nowrap !important; 
 
   width: 0.01em !important; 
 
  
 
    padding: 0; 
 
    height: initial; 
 
    width: initial; 
 
    margin-bottom: 0; 
 
    display: none; 
 
    cursor: pointer; 
 
 } 
 
  
 
 .custom-check label { 
 
   position: relative; 
    /* top: 5rem; */
   cursor: pointer; 
   /* margin-left: 65rem; */
   
   
 
 } 
 
  
 
 .custom-check label:before { 
 
 
   transition: box-shadow 0.1s ease-in-out; 
 
   content: ""; 
 
   border-radius: 3px; 
 
 
   background-color: transparent; 
 
   border: 2px solid #0079bf; 
 
   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05); 
 
   padding: 10px; 
 
   display: inline-block; 
 
   position: relative; 
 
   vertical-align: middle; 
 
   cursor: pointer; 
 
   margin-right: 5px; 
 
 } 
 
  
 
 .custom-check input:checked + label:after { 
 
   content: ""; 
 
   display: block; 
 
   position: absolute; 
 
   top: 2px; 
 
   left: 9px; 
 
   width: 6px; 
 
   height: 14px; 
 
   border: solid #0079bf; 
 
   border-width: 0 2px 2px 0; 
 
   transform: rotate(45deg); 

   
 
 } 
 
  
 
 .custom-check input:disabled ~ label { 
 
   color: grey; 
 
   cursor: not-allowed; 
 
 } 
 
  
 
 .custom-check input:disabled ~ label:before, 
 
 .custom-check input:checked:disabled + label:after { 
 
   opacity: 0.5; 
 
   border-color: grey; 
 
 } 
 
  
 
 .custom-check input[type="checkbox"]:indeterminate + label:after { 
 
   content: ""; 
 
   display: block; 
 
   position: absolute; 
 
   top: 5px; 
 
   left: 11px; 
 
   width: 1px; 
 
   height: 14px; 
 
   border: solid #0079bf; 
 
   border-width: 0 2px 2px 0; 
 
   transform: rotate(90deg); 
 
 } 
 
 .custom-check input[type="checkbox"]:focus + label:before { 
 
   box-shadow: 0 0 0 4px rgba(153, 202, 235, 1) !important; 
 
 } 
 
 .custom-check input[type="checkbox"]:active + label:before { 
 
   box-shadow: 0 0 0 2px white, 0 0 0 6px rgba(153, 202, 235, 1) !important; 
 
   border-radius: 20%; 
 
 } 
 
 
 
  
 
 </style>
 
 