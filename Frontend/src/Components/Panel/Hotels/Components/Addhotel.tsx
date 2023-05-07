import { Card, Checkbox, FormLayout, Page, RadioButton, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";

function Addhotel() {
    const history = useNavigate();
    const [hotelname, sethotelname] = useState();
    // const [Single, setSingle] = useState();
    const [Double, setDouble] = useState();
    const [Loaction, setLoaction] = useState();
    const [rating, setRating] = useState();
    const [description, setdescription] = useState();


    const addhotel = () => {
        const config = {
            method: "post",
            url: "http://localhost:3001/api/addhotel",
            withCredentials: true,
            data: {
                hotel_name: hotelname,
                description: description,
                single: Double === "single" ? true : false,
                double: Double === "double" ? true : false,
                location: Loaction,
                rating: Number(rating)
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            if (res.data.message) {
                AlertPop("Added", res.data.message, "success");
            }
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    return (
        <Page
            title="Add Hotel">
            <Card
                sectioned
                primaryFooterAction={
                    {
                        content: "save",
                        onAction: () => addhotel()
                    }
                }
                secondaryFooterActions={[
                    {
                        content: "Cancel",
                        onAction: () => history(-1)
                    }
                ]}>
                <FormLayout>
                    <TextField
                        requiredIndicator
                        label="Hotel Name"
                        autoComplete="off"
                        placeholder="Enter Hotel Name"
                        value={hotelname}
                        onChange={(e: any) => { sethotelname(e) }} />
                    <RadioButton
                        id="double"
                        checked={Double === "double"}
                        label="Double"
                        onChange={(_: any, id: any) => setDouble(id)}
                    />
                    <RadioButton
                        id="single"
                        checked={Double === "single"}
                        label="Single"
                        value={Double}
                        onChange={(_: any, id: any) => setDouble(id)}
                    />
                    {/* <Checkbox
                        checked={Single}
                        id="active"
                        onChange={(check: any) => setSingle(check)}
                        label="Single" />
                    <Checkbox
                        checked={Double}
                        id="active"
                        onChange={(check: any) => setDouble(check)}
                        label="Double" /> */}
                    <TextField
                        requiredIndicator
                        label="Hotel Location"
                        autoComplete="off"
                        placeholder="Enter Hotel Location"
                        value={Loaction}
                        onChange={(e: any) => { setLoaction(e) }} />
                    <TextField
                        requiredIndicator
                        label="Hotel Rating"
                        autoComplete="off"
                        placeholder="Enter Hotel Rating"
                        // error={typeof (Number(rating)) !== "number" && "Kingly Enter value from 1 to 5"}
                        value={rating}
                        type="number"
                        max={5}
                        min={0}
                        inputMode="numeric"
                        onChange={(e: any) => { setRating(e) }} />
                    <TextField
                        label="Loaction Description"
                        autoComplete="off"
                        placeholder="Enter Loaction Description"
                        value={description}
                        multiline={true}
                        onChange={(e: any) => { setdescription(e) }} />
                </FormLayout>
            </Card>
        </Page>
    )
}

export default Addhotel;