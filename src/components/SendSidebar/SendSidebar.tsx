import React from "react";
import styles from "@/assets/css/forSidebar/forSidebar.module.css";

function SendSidebar() {
  return (
    <section className={`${styles.sidebar_section}`}>
      <form className={styles.form_section}>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Create Date</label>
          <input type="date" /> 
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Title</label>
          <input type="text" placeholder="Enter"/>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Travel Type</label>
          <select>
          <option>Select</option>
        </select>
        </div>
      <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
        <label>Price</label>
      <div className="!grid !grid-cols-2">
          
          <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
            <label>Min Price</label>
            <select>
          <option>Min price</option>
        </select>
          </div>
          <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
            <label>Max Price</label>
            <select>
          <option>Max price</option>
        </select>
          </div>
        </div>
      </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>Category</label>
        <select>
          <option>Select</option>
        </select>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>From Place</label>
          <input type="text" placeholder="Enter"/>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>To Place</label>
          <input type="text" placeholder="Enter"/>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>From Trip Date</label>
          <input type="text" placeholder="Enter"/>
        </div>
        <div className={`flex flex-col !gap-2 ${styles.input_group}`}>
          <label>To Trip Date</label>
          <input type="text" placeholder="Enter"/>
        </div>
      </form>
    </section>
  );
}

export default SendSidebar;
