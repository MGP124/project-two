import { useState } from "react";

const RegistrationForm = () => {
  let [itemname, setItemname] = useState();
  let [itemsize, setItemsize] = useState();
  let [itemquantity, setItemquantity] = useState();
  let [dateexpiry, setDateexpiry] = useState();
  let [dateposted, setDateposted] = useState();

  let [createError, setCreateError] = useState();

  async function onCreateClicked() {
    console.log("Create has been clicked!");
    let itemToCreate = {
      itemname,
      itemsize,
      itemquantity,
      dateexpiry,
      dateposted,
    };
    console.log("Creating Food Item with", itemToCreate);
    try {
      let createResponse = await fetch("/Item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemToCreate),
      });
      // the server didn't like the data for some reason
      console.log("Create response is", createResponse);
      if (createResponse.status !== 200) {
        let errorMessage = await createResponse.text();
        console.log("We had an error.  it was: ", errorMessage);
        setCreateError(errorMessage);
      } else {
        setCreateError(undefined);
      }
    } catch (error) {
      // the server cannot be reached
      console.error("Fetch failed to reach the server.");
    }
  }

  const onInputChange = (event, setFunction) => {
    console.log("Changing input to be ", event.target.value);
    setFunction(event.target.value);
  };

  let createItemInvalid = !itemname || itemname.trim().length === 0;

  return (
    <div>
      <div>
        <label htmlFor="itemname">Item Name</label>
        <input
          id="itemname"
          value={itemname}
          onChange={(event) => onInputChange(event, setItemname)}
        />
      </div>
      <div>
        <label htmlFor="itemsize">Item Size</label>
        <input
          id="itemsize"
          value={itemsize}
          onChange={(event) => onInputChange(event, setItemsize)}
        />
      </div>
      <div>
        <label htmlFor="itemquantity">Item Quantity</label>
        <input
          id="itemquantity"
          value={itemquantity}
          onChange={(event) => onInputChange(event, setItemquantity)}
        />
      </div>
      <div>
        <label htmlFor="dateexpiry">Expiry Date</label>
        <input
          id="dateexpiry"
          value={dateexpiry}
          onChange={(event) => onInputChange(event, setDateexpiry)}
        />
      </div>
      <div>
        <label htmlFor="dateposted">Posted Date</label>
        <input
          id="dateposted"
          value={dateexpiry}
          onChange={(event) => onInputChange(event, setDateposted)}
        />
      </div>
      <button disabled={createItemInvalid} onClick={onCreateClicked}>
        Create Item
      </button>
      {createError && <div>{createError}</div>}
    </div>
  );
};

export default RegistrationForm;
